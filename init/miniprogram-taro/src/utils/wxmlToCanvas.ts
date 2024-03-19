import Taro, {
  CanvasContext,
  createCanvasContext,
  createSelectorQuery,
  getImageInfo,
  canvasToTempFilePath,
} from '@tarojs/taro'

const PROPERTIES = ['src']
const COMPUTED_STYLE = [
  'color',
  'font-size',
  'font-weight',
  'font-family',
  'backgroundColor',
  'border-bottom',
  'text-align',
]
export interface IData {
  left: number
  top: number
  width: number
  height: number
  color: string
  'font-size': string
  'font-weight': string
  'font-family'?: string
  backgroundColor: string
  shadowOffsetX?: number
  shadowOffsetY?: number
  shadowBlur?: number
  shadowColor?: string
  'border-bottom': string
  'text-align': string
  bottom: number
  dataset: { value: string }
  rank: number
  src: string
  type: 'image' | 'text' | 'view'
  fontFamily?: string
}

const hasBorder = (border: string) => parseFloat(border.split(/\s/)[0]) > 0

const drawBorder = (context: CanvasContext, data: IData) => {
  const { left, top, width, height, type, 'font-size': fontSize, 'border-bottom': borderBottom } = data
  const borderWidth = parseFloat(borderBottom.split(/\s/)[0])
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const borderColor = borderBottom.match(/(rgb).*/gi)![0]
  const lineTop = type === 'text' ? top + (height + parseFloat(fontSize)) / 2 : top + height
  context.beginPath()
  context.moveTo(left, lineTop)
  context.lineTo(left + width, lineTop)
  context.closePath()
  context.setLineWidth(borderWidth)
  context.setStrokeStyle(borderColor)
  context.stroke()
}

const drawText = (context: CanvasContext, data: IData) => {
  const {
    dataset: { value },
    width,
    left,
    top,
    color,
    fontFamily = 'sans-serif',
    'text-align': textAlign,
    'border-bottom': borderBottom,
    'font-weight': fontWeight,
    'font-size': fontSize,
    // 'font-family': fontFamily,
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowColor,
  } = data
  context.font = `normal ${fontWeight ?? 400} ${parseFloat(fontSize)}px ${fontFamily}`

  shadowOffsetX && (context.shadowOffsetX = shadowOffsetX)
  shadowOffsetY && (context.shadowOffsetY = shadowOffsetY)
  shadowColor && (context.shadowColor = shadowColor)
  shadowBlur && (context.shadowBlur = shadowBlur)

  const textWidth = context.measureText(value).width
  const fillLeft =
    textAlign === 'center' ? left + width / 2 - textWidth / 2 : textAlign === 'right' ? left + width - textWidth : left
  context.setFillStyle(color)
  context.fillText(value, fillLeft, top)

  context.restore()
  if (hasBorder(borderBottom)) {
    drawBorder(context, data)
  }
}

const getImgInfo = (src: string) =>
  new Promise<any>((resolve) => {
    getImageInfo({
      src,
    }).then((res) => {
      resolve(res)
    })
  })

const drawRectImage = (context: CanvasContext, data: IData) => {
  const { src, left, top, width, height } = data

  return getImgInfo(src).then((res) => {
    const { width: naturalWidth, height: naturalHeight, path } = res
    context.drawImage(src.includes('https') ? path : src, 0, 0, naturalWidth, naturalHeight, left, top, width, height)
    context.restore()
  })
}

const drawImage = (context: CanvasContext, data: IData) => {
  const drawImagePromise = drawRectImage(context, data)

  return drawImagePromise.then(() => {
    return Promise.resolve()
  })
}

const drawView = (context: CanvasContext, data: IData) => {
  const { left, top, width, height, backgroundColor, 'border-bottom': borderBottom } = data
  context.save()
  context.setStrokeStyle(backgroundColor)
  context.rect(left, top, width, height)
  context.stroke()
  context.restore()
  if (hasBorder(borderBottom)) {
    drawBorder(context, data)
  }
}

const drawElements = (context: CanvasContext, storeItems: IData[]) =>
  storeItems.map((item) => {
    if (item.type === 'text') {
      return drawText(context, item)
    } else if (item.type === 'image') {
      return drawImage(context, item)
    } else {
      return drawView(context, item)
    }
  })

const drawElementBaseOnIndex = (
  context: CanvasContext,
  storeObject: { [key in number]: IData[] },
  key = 0,
  drawPromise?,
) => {
  if (typeof drawPromise === 'undefined') {
    drawPromise = Promise.resolve()
  }
  const objectKey = key
  const chainPromise = drawPromise.then(() => {
    return storeObject[objectKey] ? Promise.all(drawElements(context, storeObject[objectKey])) : Promise.resolve()
  })

  if (key >= Object.keys(storeObject).length) {
    return chainPromise
  } else {
    return drawElementBaseOnIndex(context, storeObject, key + 1, chainPromise)
  }
}

export const drawCanvas = (
  canvasId: string,
  innerData: IData[],
): Promise<{
  canvasToTempFilePath: (
    option: Taro.canvasToTempFilePath.Option,
  ) => Promise<Taro.canvasToTempFilePath.SuccessCallbackResult>
}> => {
  const context = createCanvasContext(canvasId, this)
  context.setTextBaseline('top')
  const storeObject: { [key in number]: IData[] } = {
    0: [],
  }

  innerData.forEach((item) => {
    if (!storeObject[item.rank]) {
      storeObject[item.rank] = []
    }
    if (!item.rank) storeObject[0].push(item)
    else storeObject[item.rank].push(item)
  })

  return drawElementBaseOnIndex(context, storeObject).then(
    () =>
      new Promise<void>((resolve) => {
        context.draw(true, () => {
          resolve({
            canvasToTempFilePath: async (option: Taro.canvasToTempFilePath.Option) =>
              canvasToTempFilePath({
                canvasId,
                ...option,
              }),
          } as any)
        })
      }),
  )
}

export const selectorQuery = (element: string, self) =>
  new Promise<IData[]>((resolve, reject) => {
    try {
      createSelectorQuery()
        .in(self.$scope)
        .selectAll(element)
        .fields(
          {
            dataset: true,
            size: true,
            rect: true,
            properties: PROPERTIES,
            computedStyle: COMPUTED_STYLE,
          },
          (res) => {
            resolve(res as IData[])
          },
        )
        .exec()
    } catch (error) {
      reject(error)
    }
  })

export default (canvasId, selectorPromises: Array<Promise<IData[]>>) => {
  return Promise.all(selectorPromises).then((selectors) => {
    const dataList: IData[] = []
    selectors.map((data) => dataList.push(...data))
    return drawCanvas(canvasId, dataList)
  })
}

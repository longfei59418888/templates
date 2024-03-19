import {
  RealtimeLogManager,
  getRealtimeLogManager,
  canIUse,
} from '@tarojs/taro'

type LEVEL = 'warn' | 'error' | 'info'

interface IMessage {
  message: string
  filter?: string
  level?: LEVEL
  timestamp?: number
}

class Logger {
  private LoggerType: string
  private logger: RealtimeLogManager | null
  private store: Record<string, IMessage[]> = {}
  private RealtimeLogManager = canIUse('getRealtimeLogManager')
  private setFilterMsg = canIUse('RealtimeLogManager.setFilterMsg')
  private addFilterMsg = canIUse('RealtimeLogManager.addFilterMsg')

  constructor(name: string) {
    this.LoggerType = name
    this.logger = (this.RealtimeLogManager && getRealtimeLogManager()) || null
    this.setFilterMsg && this.logger?.setFilterMsg(name)
  }
  cache(name: string, message: IMessage) {
    if (!this.store[name]) this.store[name] = [message]
    else this.store[name].push(message)
  }
  clearCache(name?: string) {
    if (name) delete this.store[name]
    else this.store = {}
  }
  upload(name?: string, message?: IMessage, level: LEVEL = 'info') {
    const { store, logger, LoggerType } = this
    let messages: string[] = []
    if (message) messages = [JSON.stringify(message)]
    else if (!name) {
      messages = Object.keys(store).reduce(
        (preview: string[], currentValue: string) => {
          preview.push(currentValue)
          return preview.concat(
            Object[currentValue].map((item: IMessage) => JSON.stringify(item))
          )
        },
        []
      )
    } else if (store[name]) {
      messages = store[name].map((item: IMessage) => JSON.stringify(item))
      delete this.store[name]
    }
    if (Number(messages) === 0) return
    logger && logger[level]([LoggerType, name, ...messages])
  }
  addFilter(filter: string) {
    this.addFilterMsg && this.logger?.addFilterMsg(filter)
  }
}

export default Logger

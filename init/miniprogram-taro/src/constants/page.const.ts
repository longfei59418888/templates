export const MAIN_PAGES = {
  Home: 'pages/home/index',
  VideoTranslate: 'pages/video/translate/index',
  Landing: 'pages/landing/index',
}

export const DEMO_PAGES = {
  Home: 'pkg-demo/pages/home/index',
}

export const page = (pages: Record<string, string>, name?: string) => {
  const values = Object.values(pages)
  if (name) return values.map((path) => path.replace(name, ''))
  return values
}

export const pages = page(MAIN_PAGES)
export const demoPages = page(DEMO_PAGES, 'pkg-demo/')

/// <reference types="@tarojs/taro" />

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp'
  }
}

declare const EVN: 'TEST' | 'PROD' | 'DEV'

declare const CONFIG: {
  URL: string
  MOCK_URL?: string
  CDN_URL: string
}

declare const PREFIX: string

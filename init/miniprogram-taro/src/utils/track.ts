import sensors from 'sa-sdk-miniprogram'

export const init = () => sensors.init()
export const login = (id: string) => sensors.login(id)

export const registerApp = (params: Record<string, unknown>) => sensors.registerApp(params)

export const track = (name: string, params: Record<string, unknown>) => sensors.track(name, params)
// ;(() => {
//   sensors.setPara({
//     name: 'sensors',
//     server_url: '您的数据接收地址',
//     // show_log: EVN !== 'PROD',
//     autoTrack: {
//       appLaunch: true,
//       appShow: true,
//       appHide: true,
//       pageShow: true,
//       pageShare: true,
//       mpClick: false,
//       pageLeave: false,
//     },
//     source_channel: ['utm_source', 'utm_content', 'utm_campaign', 'utm_medium', 'utm_term'],
//   })
// })()

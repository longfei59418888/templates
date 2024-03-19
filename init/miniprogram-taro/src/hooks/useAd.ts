import { useCallback, useRef } from 'react'

import Taro, { createRewardedVideoAd as createRewardedVideoAdBase, createInterstitialAd } from '@tarojs/taro'

export const useRewardedVideo = (option: Taro.createRewardedVideoAd.Option) => {
  const rewardedVideo = useRef(createRewardedVideoAdBase(option))
  return useCallback(() => {
    const result = new Promise((resolve, reject) => {
      rewardedVideo.current.onError(reject)
      rewardedVideo.current.onClose(resolve)
    })
    rewardedVideo.current.load().then(rewardedVideo.current.show)
    return result
  }, [])
}

export const useInterstitial = (option: Taro.createInterstitialAd.Option) => {
  const interstitial = useRef(createInterstitialAd(option))
  return useCallback(() => {
    const result = new Promise((resolve, reject) => {
      interstitial.current.onError(reject)
      interstitial.current.onClose(resolve)
    })
    interstitial.current.load().then(interstitial.current.show)
    return result
  }, [])
}

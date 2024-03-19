import { checkSubscriptionWithId, UpdateSubscriptionWithId } from '@/api/wechat'
import { requestSubscribeMessage } from '@tarojs/taro'
import { isBoolean } from '@tarojs/shared'
import { COMMON_SCENE_CODE } from '@/constants/wechat'
import { checkSubscriptionWithIdParam } from '@/api/types/wechat'
import { ERR_CODE_SUBSCRIBE, ERR_MESSAGE_SUBSCRIBE } from '@/constants/wechat/errno'
import { openSettingWithSubscription } from '@/utils/setting'
import { error } from '@/utils/toast'

export const checkSubscription = async (
  checkTemplateIds: checkSubscriptionWithIdParam['templateIds'],
  sceneCode?: checkSubscriptionWithIdParam['sceneCode'],
) => {
  const { templateIds } = await checkSubscriptionWithId({
    templateIds: checkTemplateIds,
    sceneCode: sceneCode ?? COMMON_SCENE_CODE,
  })
  if (!templateIds || templateIds.length === 0) return null
  return templateIds
}

export const requestSubscribe = async (option: {
  templateIds: checkSubscriptionWithIdParam['templateIds']
  sceneCode?: checkSubscriptionWithIdParam['sceneCode']
  before?: (
    templateIds: checkSubscriptionWithIdParam['templateIds'],
  ) => Promise<checkSubscriptionWithIdParam['templateIds']>
  after?: boolean | ((option: checkSubscriptionWithIdParam) => Promise<void>)
}) => {
  const { templateIds, sceneCode = COMMON_SCENE_CODE, before, after = true } = option
  let checkTemplateIds = await checkSubscription(templateIds, sceneCode)
  if (before) checkTemplateIds = await before(templateIds)
  if (!checkTemplateIds) return
  const result = await requestSubscribeMessage({
    tmplIds: checkTemplateIds,
  })
  // todo 错误处理
  if (result.errCode) {
    if (result.errCode === ERR_CODE_SUBSCRIBE.ERROR_USER_REJECT)
      return await openSettingWithSubscription(ERR_MESSAGE_SUBSCRIBE[result.errCode])
    return error(ERR_MESSAGE_SUBSCRIBE[result.errCode])
  }
  if (!after) return
  checkTemplateIds = checkTemplateIds.filter(
    (tmplId) => result[tmplId] === 'accept',
  ) as checkSubscriptionWithIdParam['templateIds']
  if (!isBoolean(after)) await after({ templateIds: checkTemplateIds, sceneCode })
  await UpdateSubscriptionWithId({ templateIds: checkTemplateIds, sceneCode })
}

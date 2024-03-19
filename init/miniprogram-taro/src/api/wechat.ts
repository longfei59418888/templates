import { get, post } from '@/utils/request'
import { GET_NOTIFICATION_SUBSCRIPTION_CHECK, POST_NOTIFICATION_SUBSCRIPTION_UPDATE } from '@/constants/api.const'
import { TemplateIds } from '@/types/wechat'
import { checkSubscriptionWithIdParam } from '@/api/types/wechat'

export const checkSubscriptionWithId = (param: checkSubscriptionWithIdParam) =>
  get<{ templateIds: TemplateIds | [] }>(GET_NOTIFICATION_SUBSCRIPTION_CHECK, param)

export const UpdateSubscriptionWithId = (param: checkSubscriptionWithIdParam) =>
  post(POST_NOTIFICATION_SUBSCRIPTION_UPDATE, param)

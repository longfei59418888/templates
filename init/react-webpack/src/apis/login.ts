import { request } from 'xl-story-book'
import { GET_THIRD_PARTIES } from '@src/constants/api'
import { IReturnData } from 'xl-story-book/types/components/request/propsType'
import { ThirdParties } from '@src/apis/types/login'

export const getThirdParties = () =>
  request
    .get<IReturnData<ThirdParties[]>>(GET_THIRD_PARTIES)
    .then<ThirdParties[]>(request.data, request.toastMessage)

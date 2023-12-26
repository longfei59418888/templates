import { request } from 'xl-story-book'
import { GET_MENU_LIST } from '@src/constants/api'
import { IReturnData } from 'xl-story-book/types/components/request/propsType'
import {MenuItem} from "@src/types/menu";

export const getMenus = () =>
  request
    .get<IReturnData<MenuItem[]>>(GET_MENU_LIST)
    .then<MenuItem[]>(request.data, request.toastMessage)

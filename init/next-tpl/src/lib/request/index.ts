import axios, { AxiosRequestConfig } from 'axios';
import jsonBig from 'json-bigint';
import { compile as compilePath } from 'path-to-regexp';

// import interceptors, { IAxiosResponse } from "./interceptors"
import { toast } from 'sonner';

export interface IReturnData<D> {
  code: number;
  msg: string;
  data: D;
}

export interface IPageData<D> {
  current: number;
  size: number;
  total: number;
  pages: number;
  records: D[];
}

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000,
  transformResponse: [
    function (data) {
      try {
        return jsonBig.parse(data);
      } catch (err) {
        return {
          data,
        };
      }
    },
  ],
});
// interceptors(axiosInstance)

export const compile = <D>(path: string, params?: D): string => {
  if (params) {
    path = compilePath(path)(params);
  }
  return path;
};

export const data = async <D = unknown>(res: {
  data: IReturnData<D>;
}): Promise<D> => res.data?.data;

export const toastMessage = async <D = any>(res: {
  data: IReturnData<D>;
}): Promise<D> => {
  const msg = typeof res.data === 'string' ? res.data : res.data?.msg;
  toast.error(msg);
  return Promise.reject(res.data?.data);
};

export const post = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<any>,
): Promise<{ data: IReturnData<T> }> => {
  return axiosInstance.post(url, data, config);
};

export const get = async <T, D = unknown>(
  url: string,
  params?: D,
  config?: AxiosRequestConfig<any>,
): Promise<{ data: IReturnData<T> }> => {
  return axiosInstance.get(url, {
    params,
    ...config,
  });
};

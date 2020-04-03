import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from '../index'
import { get } from 'lodash'
import {setToken, getToken} from '@/utils/auth'

export function requestSuccessFunc (axiosRequestConfig) {
  CONSOLE_REQUEST_ENABLE && console.info('requestInterceptorFunc', `url: ${axiosRequestConfig.url}`, axiosRequestConfig)
  // 处理权限，请求发送监控
  axiosRequestConfig.headers.Authorization = getToken()
  return axiosRequestConfig
}

export function requestFailFunc (axiosError) {
  // 发送请求失败处理

  return Promise.reject(axiosError)
}
/**
 export interface AxiosResponse<T = any>  {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}
 */
export function responseSuccessFunc (axiosResponse) {
  CONSOLE_RESPONSE_ENABLE && console.log('requestInterceptorFunc', 'data: ', axiosResponse.data)
  if (axiosResponse.headers.Authorization) {
    setToken(axiosResponse.headers.Authorization)
  }
  return axiosResponse.config.notOnlyData ? axiosResponse : axiosResponse.data // 如果配置了notOnlyData，那么就把所有的response都返回，否在只返回data
}

/**
export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}
 */
export function responseFailFunc (responseError) { // 这边的错误处理逻辑根据各个系统不一样可以单独修改
  if (responseError.response) {
    switch (responseError.response.status) {
      case 403:
        location.reload() // 403强制刷新
        break
      case 401:
        responseError.message = '未授权，请重新登录'
        break
      default:
        responseError.message = get(responseError, 'response.data.msg', '出错啦')
    }
  } else { // 无返回的默认提示
    responseError.message = '网络问题，请刷新重试'
  }

  // 超时提示
  if (responseError.message.includes('timeout')) {
    responseError.message = '请求超时，请刷新重试'
  }

  // 全局错误提示
  if (responseError.config && !responseError.config.noShowDefaultError) {
    global.vbus.$emit('global.$Message.show', responseError.message)
  }

  return Promise.reject(responseError)
}

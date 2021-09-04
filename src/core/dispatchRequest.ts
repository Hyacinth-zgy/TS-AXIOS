import { buildURL } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponseConfig } from '../types/index'
import { transformRequest, transformResponseData } from '../helpers/data'
import xhr from './xhr'
import { processHeaders, flattenHeaders } from '../helpers/headers'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 处理了url
  processConfig(config)
  // 处理headers
  transformHeaders(config)
  // 处理data
  transformRequstData(config)
  // xhr()函数返回的是一个AxiosPromise对象
  return xhr(config).then((res: AxiosResponseConfig) => {
    return transformResponse(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformRequstData(config: AxiosRequestConfig): any {
  config.data = transformRequest(config.data)
}

//
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  config.headers = processHeaders(headers, data)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 如果没有设置responseType,自动把JSON对象转换为普通对象输出
function transformResponse(res: AxiosResponseConfig) {
  res.data = transformResponseData(res.data)
  return res
}

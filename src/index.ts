import { buildURL } from './helpers/url';
import { AxiosRequestConfig, AxiosPromise } from './types/index';
import { transformRequest } from './helpers/data'
import xhr from './xhr';
import { processHeaders } from './helpers/headers'
function axios(config: AxiosRequestConfig): AxiosPromise {
  // 处理了url
  processConfig(config);
  // 处理headers
  transformHeaders(config);
  // 处理data
  transformRequstData(config);
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params)
}

function transformRequstData(config: AxiosRequestConfig): any {
  config.data = transformRequest(config.data)
}


function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config;
  config.headers = processHeaders(headers, data);
}

export default axios
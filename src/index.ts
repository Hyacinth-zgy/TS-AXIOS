import { buildURL } from './helpers/url';
import { AxiosRequestConfig } from './types/index';
import { transformRequest } from './helpers/data'
import xhr from './xhr';
function axios(config: AxiosRequestConfig): void {
  // 处理了url
  console.log(config);

  processConfig(config);
  transformRequstData(config);
  console.log(config)
  xhr(config)
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
export default axios
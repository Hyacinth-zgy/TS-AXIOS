import { buildURL } from './helpers/url';
import { AxiosRequestConfig } from './types/index';
import xhr from './xhr';
function axios(config: AxiosRequestConfig): void {
  // 处理了url
  processConfig(config);
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params)
}
export default axios
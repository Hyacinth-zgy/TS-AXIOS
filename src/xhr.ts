import { AxiosRequestConfig, AxiosPromise, AxiosResponseConfig } from './types';
import { parseHeaders } from './helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = 'get', url, headers, responseType } = config;
    const requst = new XMLHttpRequest();
    // 如果设置了响应的格式,requst会按照对应的响应格式做转换,如json
    if (responseType) {
      requst.responseType = responseType;
    }
    requst.open(method.toUpperCase(), url, true);
    requst.onreadystatechange = () => {
      if (requst.readyState !== 4) {
        return
      }
      // 拿到返回值之后把返回值以promise返回出去
      const responseHeaders = parseHeaders(requst.getAllResponseHeaders());
      const responseData = responseType !== 'text' ? requst.response : requst.responseText;
      const response: AxiosResponseConfig = {
        data: responseData,
        status: requst.status,
        statusText: requst.statusText,
        headers: responseHeaders,
        config: config,
        request: requst
      }
      // 返回一个AxiosPromise对象
      resolve(response)
    }
    // 假如data不是一个对象就不需要设置requstHeader
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        requst.setRequestHeader(name, headers[name]);
      }
    })
    requst.send(data);
  })
}

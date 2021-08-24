import { AxiosRequestConfig, AxiosPromise, AxiosResponseConfig } from '../types';
import { parseHeaders } from '../helpers/util';
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = 'get', url, headers, responseType, timeout } = config;
    const requst = new XMLHttpRequest();

    // 如果设置了响应的格式,requst会按照对应的响应格式做转换,如json
    if (responseType) {
      requst.responseType = responseType;
    }

    // 设置超时时间
    if (timeout) {
      requst.timeout = timeout
    }
    requst.open(method.toUpperCase(), url!, true);

    requst.onreadystatechange = () => {
      if (requst.readyState !== 4) {
        return
      }

      // 当超时和网络错误status会直接等于0
      if (requst.status === 0) return

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
      // 返回一个AxiosPromise对象,并且检查返回的状态码
      handleResponseStatus(response)
    }

    // 当网络异常时(比如不通)的时候,发送请求会触发XMLHttpRequest的error事件,于是我们可以在onerror的事件回调中捕获此类错误
    requst.onerror = () => {
      // reject(new Error('Network Error'))
      // 网络错误时获取不到response
      reject(createError('Network Error', config, null, requst))
    }

    // 处理超时错误
    requst.ontimeout = () => {
      // reject(new Error('Timeout of ${timeout}ms exceeded'))
      // 超时也获取不到response  ECONNABORTED代表请求被终止;
      reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', requst))
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

    // 处理状态码一场
    function handleResponseStatus(response: AxiosResponseConfig): void {
      if (response.status >= 200 && response.status <= 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed with status code ${response.status}`))
        // 正常错误下可以拿到response
        reject(createError(`Request failed with status code ${response.status}`, config, status, requst, response))
      }
    }
  })
}

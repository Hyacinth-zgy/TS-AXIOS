import { url } from "inspector";
import { AxiosPromise, AxiosRequestConfig, Method } from "../types";
import dispatchRequest from "./dispatchRequest";

export default class Axios {
  // requst 函数实现
  request(url: any, config?: any): AxiosPromise {
    // 函数重载兼容
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  // 暴露get方法，实际内部调用的是requst
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requsetMetholdWidthoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requsetMetholdWidthoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requsetMetholdWidthoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requsetMetholdWidthoutData('options', url, config)
  }
  _requsetMetholdWidthoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requsetMetholdWidthData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requsetMetholdWidthData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requsetMetholdWidthData('patch', url, data, config)
  }

  _requsetMetholdWidthData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))
  }
}
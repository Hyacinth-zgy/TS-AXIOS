import { promises } from 'dns'
import { url } from 'inspector'
import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponseConfig,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponseConfig>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}
export default class Axios {
  // 初始化config配置
  defaults: AxiosRequestConfig
  // 拦截器属性
  interceptors: Interceptors
  constructor(initConfig: AxiosRequestConfig) {
    // 在Axios构造时传入默认配置对象
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponseConfig>()
    }
  }
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
    config = mergeConfig(this.defaults, config)
    config.method = config.method.toLowerCase()
    // // requst 函数实现
    // 链式调用中的一堆拦截器和初始值
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // 后添加先执行 数据调用
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    let promise = Promise.resolve(config)
    while (chain.length) {
      // ! 断言，表示部不为空
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    // return dispatchRequest(config)
    return promise
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
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
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
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}

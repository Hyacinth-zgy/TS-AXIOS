export type MethodLo = 'get' | 'delete' | 'post' | 'put' | 'options' | 'head' | 'patch'
export type MethodUp = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'OPTIONS' | 'HEAD' | 'PATCH'
export type Method = MethodLo | MethodUp

// 请求参数
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType //设置响应类型
  timeout?: number
  transformRequest?: AxiosTransformer | Array<AxiosTransformer>
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  [propName: string]: any
}

// 响应参数类型
export interface AxiosResponseConfig<T = any> {
  data: T
  status: number
  statusText: string
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置
  request: any // XMLHttpReques 小黄人对象
}

// 响应参数Promise类型
export interface AxiosPromise<T = any> extends Promise<AxiosResponseConfig<T>> {}

// 错误类接口
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: number | string | null
  request?: any
  response?: AxiosResponseConfig
  isAxiosError: boolean
}

// Axios扩展接口
export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosIntercepterManager<AxiosRequestConfig>
    response: AxiosIntercepterManager<AxiosResponseConfig>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// AxiosIncetance是个混合对象，本身是个函数，但是也具有Axios定义的一些方法
export interface AxiosIncetance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  // 函数重载
  <T = any>(url: string, config: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosIncetance {
  create(config?: AxiosRequestConfig): AxiosIncetance
}

// 拦截器接口定义
export interface AxiosIntercepterManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

// T 有可能是AxiosRequestConfig / AxiosResponseConfig,所以需要泛型
export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (err: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

// 本身会被人会是个函数定义
export interface add {
  add(data: string): string
  age: string
}

const a: add = {
  add(data) {
    return '111'
  },
  age: '12'
}

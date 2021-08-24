export type MethodLo = 'get' | 'delete' | 'post' | 'put' | 'options' | 'head' | 'patch';
export type MethodUp = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'OPTIONS' | 'HEAD' | 'PATCH';
export type Method = MethodLo | MethodUp

// 请求参数
export interface AxiosRequestConfig {
    url?: string,
    method?: Method,
    data?: any
    params?: any,
    headers?: any,
    responseType?: XMLHttpRequestResponseType, //设置响应类型
    timeout?: number
}

// 响应参数类型
export interface AxiosResponseConfig {
    data: any,
    status: number,
    statusText: string,
    headers: any,// 响应头
    config: AxiosRequestConfig, // 请求配置
    request: any // XMLHttpReques 小黄人对象
}

// 响应参数Promise类型
export interface AxiosPromise extends Promise<AxiosResponseConfig> { }

// 错误类接口
export interface AxiosError extends Error {
    config: AxiosRequestConfig,
    code?: number | string | null,
    request?: any,
    response?: AxiosResponseConfig,
    isAxiosError: boolean
}

// Axios扩展接口
export interface Axios {
    request(config: AxiosRequestConfig): AxiosPromise;
    get(url: string, config?: AxiosRequestConfig): AxiosPromise;
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
    head(url: string, config?: AxiosRequestConfig): AxiosPromise;
    options(url: string, config?: AxiosRequestConfig): AxiosPromise;
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
}

// AxiosIncetance是个混合对象，本身是个函数，但是也具有Axios定义的一些方法
export interface AxiosIncetance extends Axios {
    (config: AxiosRequestConfig): AxiosPromise
    // 函数重载
    (url: string, config: AxiosRequestConfig): AxiosPromise
}
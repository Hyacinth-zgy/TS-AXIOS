export type MethodLo = 'get' | 'delete' | 'post' | 'put' | 'option';
export type MethodUp = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'OPTION';
export type Method = MethodLo | MethodUp

// 请求参数
export interface AxiosRequestConfig {
    url: string,
    method?: Method,
    data?: any
    params?: any,
    headers?: any,
    responseType?: XMLHttpRequestResponseType //设置响应类型
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
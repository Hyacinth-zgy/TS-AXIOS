export type MethodLo = 'get' | 'delete' | 'post' | 'put' | 'option';
export type MethodUp = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'OPTION';
export type Method = MethodLo | MethodUp

export interface AxiosRequestConfig {
    url: string,
    method?: Method,
    data?: any
    params?: any,
    headers?: any
}
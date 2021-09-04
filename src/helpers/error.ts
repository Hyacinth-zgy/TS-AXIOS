import { AxiosRequestConfig, AxiosResponseConfig } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: number | string | null
  request?: any
  response?: AxiosResponseConfig
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: number | string | null,
    request?: any,
    response?: AxiosResponseConfig
  ) {
    super(message)

    this.config = config
    this.isAxiosError = true
    this.code = code
    this.request = request
    this.response = response

    // Object.setPrototypeOf 解决TS中继承 内部类如Map Array,Date等时,无法调用到内部定义方法
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: number | string | null,
  request?: any,
  response?: AxiosResponseConfig
) {
  console.log(message, config, code, request, response)
  return new AxiosError(message, config, code, request, response)
}

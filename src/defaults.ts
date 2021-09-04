// 默认配置
import { AxiosRequestConfig } from './types'
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  }
}

const metholdsNoData = ['delete', 'get', 'head', 'options']
metholdsNoData.forEach(methold => {
  defaults.headers[methold] = {}
})

const metholdsWidthData = ['post', 'put', 'path']
metholdsWidthData.forEach(methold => {
  defaults.headers[methold] = {
    'Content-Type': 'application/x-www-form-urlencode'
  }
})

export default defaults

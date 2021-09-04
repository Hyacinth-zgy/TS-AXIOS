// 默认配置
import { AxiosRequestConfig } from './types'
import { transcode } from 'buffer'
import { transformRequest, transformResponseData } from './helpers/data'
import { processHeaders } from './helpers/headers'
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(data, headers)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any) {
      return transformResponseData(data)
    }
  ]
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

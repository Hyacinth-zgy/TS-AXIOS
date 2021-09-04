import Axios from './core/Axios'
import { AxiosIncetance, AxiosRequestConfig, AxiosStatic } from './types'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import { config } from 'shelljs'

// 使用工厂模式函数创建axios实例
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const inctance = Axios.prototype.request.bind(context)
  // 混合
  extend(inctance, context)
  return inctance as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = function create() {
  return createInstance(mergeConfig(defaults, config))
}
export default axios

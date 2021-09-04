import Axios from './core/Axios'
import { AxiosIncetance, AxiosRequestConfig } from './types'
import { extend } from './helpers/util'
import defaults from './defaults'

// 使用工厂模式函数创建axios实例
function createInstance(config: AxiosRequestConfig): AxiosIncetance {
  const context = new Axios(config)
  const inctance = Axios.prototype.request.bind(context)
  // 混合
  extend(inctance, context)
  return inctance as AxiosIncetance
}
console.log('6', defaults)
const axios = createInstance(defaults)
export default axios

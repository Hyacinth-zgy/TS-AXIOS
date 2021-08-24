import Axios from './core/Axios';
import { AxiosIncetance } from './types';
import { extend } from './helpers/util'

// 使用工厂模式函数创建axios实例
function createInstance(): AxiosIncetance {
  const context = new Axios();
  const inctance = Axios.prototype.request.bind(context);
  // 混合
  extend(inctance, context);
  return inctance as AxiosIncetance
}

const axios = createInstance();
export default axios
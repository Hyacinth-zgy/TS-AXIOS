import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig) {
    const { data = null, method = 'get', url, headers } = config;
    const requst = new XMLHttpRequest();
    requst.open(method.toUpperCase(), url, true);
    // 假如data不是一个对象就不需要设置requstHeader
    Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
            delete headers[name];
        } else {
            requst.setRequestHeader(name, headers[name]);
        }
    })
    requst.setRequestHeader
    requst.send(data)
}

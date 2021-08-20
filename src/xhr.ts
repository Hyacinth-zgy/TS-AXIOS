import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig) {
    const { data = null, method = 'get', url } = config;
    const requst = new XMLHttpRequest();
    requst.open(method.toUpperCase(), url, true);
    requst.send(data)
}

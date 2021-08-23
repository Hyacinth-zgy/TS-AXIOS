import { isPlainObject } from './util'

// 把普通对象转换为JSON对象
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data;
}

// 把普通对象转换为JSON对象
export function transformResponseData(data: any): any {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data)
        } catch { }
    }
    return data
}
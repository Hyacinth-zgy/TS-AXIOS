import { isPlainObject } from './util'

// 把普通对象转换为JSON对象
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data;
}
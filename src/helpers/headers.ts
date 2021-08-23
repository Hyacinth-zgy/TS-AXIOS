import { isPlainObject } from './util';

// 假使header中已经存在content-type这种属性，要处理下
function normalizeHeaderName(headers: any, normalizeHeaderName: string): void {
  if (!headers) return;
  Object.keys(headers).forEach(name => {
    if (name !== normalizeHeaderName && name.toLowerCase() === normalizeHeaderName.toLowerCase()) {
      headers[normalizeHeaderName] = headers[name];
      delete headers[name]
    }
  })
}



// 如果是普通对象，headers要设置上headers['Content-Type'] = 'application/json;charset=utf-8'
export function processHeaders(headers: any, data: any) {
  normalizeHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
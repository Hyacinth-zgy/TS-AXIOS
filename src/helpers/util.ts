const toString = Object.prototype.toString;
// 类型谓词 目的是 假若我们一旦检查过类型，就能在之后的每个分支里清楚地知道val的类型
export function isDate(val: Date): val is Date {
  return toString.call(val) === '[object Date]';
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
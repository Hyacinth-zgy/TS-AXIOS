const toString = Object.prototype.toString;
// 类型谓词 目的是 假若我们一旦检查过类型，就能在之后的每个分支里清楚地知道val的类型
export function isDate(val: Date): val is Date {
  return toString.call(val) === '[object Date]';
}

// 是个对象,不保证是个普通对象
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// 是个普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 把参数编码
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


// 将header字符串解析为对象
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null);
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':');
    key = key.trim().toLowerCase();
    if (!key) return;
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  })
  return parsed
}
export const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000'

export function isArray (value) {
  return Array.isArray(value)
}

export function isPlainObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

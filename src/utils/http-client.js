import axios from 'axios'
import { apiUrl, isArray, isPlainObject } from '@/utils/tools'

const baseUrl = apiUrl

function isApiUrl (url) {
  if (url.charAt(0) === '/') {
    return true
  }
  return url.indexOf(baseUrl) === 0
}

function normalizeRequest (data) {
  if (isPlainObject(data)) {
    for (const key of Object.keys(data)) {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim()
      } else {
        normalizeRequest(data[key])
      }
    }
  } else if (isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (typeof data[i] === 'string') {
        data[i] = data[i].trim()
      } else {
        normalizeRequest(data[i])
      }
    }
  }
}

const httpClient = axios.create({
  baseURL: baseUrl
})

httpClient.interceptors.request.use(function (config) {
  if (isApiUrl(config.url)) {
    if (config.data) {
      normalizeRequest(config.data)
    }

    if (config.method === 'get') {
      if (!config.params) {
        config.params = {}
      }
      config.params.t = new Date().getTime()
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

httpClient.interceptors.response.use(function (response) {
  if (isApiUrl(response.config.url) && !response.data.success) {
    const message = response.data.message || 'RESPONSE_FAILED'
    const error = new Error(message)
    error.isFailed = true

    return Promise.reject(error)
  } else {
    return response
  }
}, function (error) {
  return Promise.reject(error)
})

export default httpClient

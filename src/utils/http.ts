import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { showLoading, hideLoading } from '/@/utils/loading'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '../router/index'

// 声明一个Map 用于存储每个请求的标识和取消函数
const pending = new Map()

/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    // qs.stringify(config.params),
    // qs.stringify(config.data)
    JSON.stringify(config.params),
    JSON.stringify(config.data)
    // config.params,
    // config.data
  ].join('&')

  config.cancelToken =
    config.cancelToken ||
    new Axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}

/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    // qs.stringify(config.params),
    // qs.stringify(config.data)
    JSON.stringify(config.params),
    JSON.stringify(config.data)
    // config.params,
    // config.data
  ].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

const showStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message},请检查网络或联系管理员！`
}

const baseURL = import.meta.env.VITE_BASE_URL as string
console.log('url', baseURL)
const axios = Axios.create({
  // 根据 process.env.NODE_ENV 区分状态，切换不同的 baseURL
  // baseURL: process.env.NODE_ENV === 'production' ? '/url' : '/api',
  baseURL: baseURL,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  // 跨域请求时是否需要使用凭证
  withCredentials: true,
  // 根据 process.env.NODE_ENV 区分状态，切换不同的 timeout 请求 30s 超时 : 请求 10s 超时
  timeout: process.env.NODE_ENV === 'development' ? 30 * 1000 : 10 * 1000,
  validateStatus: function () {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true
  },
  // 在向服务器发送请求前，序列化请求数据
  transformRequest: [
    function (data) {
      data = JSON.stringify(data)
      return data
    }
  ],
  // 在传递给 then/catch 前，修改响应数据
  transformResponse: [
    function (data) {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    }
  ]
})

const toLogin = () => {
  router.push({
    path: '/login',
    query: {
      // 把当前的路由传递过去 登录成功后从哪来返回哪去
      backRouter: router.currentRoute.value.fullPath
    }
  })
}

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // ElLoading.service({
    //   text: '加载中',
    //   background: 'rgba(0, 0, 0, 0.3)'
    // })
    // 请求拦截进来调用显示loading效果
    showLoading()
    removePending(config) //在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    NProgress.start()
    // 获取token,并将其添加到请求头中
    let token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.message = '服务器异常，请联系管理员！'
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
    setTimeout(() => {
      hideLoading()
    }, 200)
    NProgress.done()
    removePending(response) // 在请求结束后，移除本次请求
    const status = response.status
    let msg = ''
    if (status < 200 || status >= 300) {
      // 处理http错误，抛到业务代码
      msg = showStatus(status)
      if (typeof response.data === 'string') {
        response.data = { msg }
      } else {
        response.data.message = msg
      }
      ElMessage({
        message: response.data.message || '未知错误！',
        type: 'error'
      })
    }
    if (response.data.code === 0) {
      ElMessage({
        message: response.data.message || '请求失败！',
        type: 'error'
      })
      return Promise.reject()
    }
    return response.data
  },
  (error) => {
    // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
    setTimeout(() => {
      hideLoading()
    }, 200)
    if (Axios.isCancel(error)) {
      console.log('repeated request:' + error.message)
    } else {
      // 错误抛到业务代码
      error.data = {}
      if (error.data.msg === '未授权，请重新登录(401)') {
        toLogin()
      }
      error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
      ElMessage.error(error.data.msg)
    }
    return Promise.reject(error)
  }
)

export default axios

// export interface HttpResponce{
//   status:number
//   statusText:string
//   data:{
//     code:number
//     desc:string
//     [key:string]:any
//   }
// }

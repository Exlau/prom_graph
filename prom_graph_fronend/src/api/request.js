import { Axios } from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from './config'

const req = new Axios({
  baseURL: BASE_URL,
})

// 请求拦截器
req.interceptors.request.use(
  (config) => {
    if (config.url !== '/login') {
    // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${Cookies.get('token') ?? window.location.replace('/login')}`
    }
    // eslint-disable-next-line no-param-reassign
    config.headers['Content-Type'] = 'application/json'
    return config
  },
)

// 响应拦截器
req.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      window.location.replace('/login')
    }
    return res
  },
)

export default req

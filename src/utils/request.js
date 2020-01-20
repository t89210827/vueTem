// 请求器实例，挂载于window._request
import axios from 'axios'
import qs from 'qs'
import {
  prodApi
} from '../../my-config'
import Vue from 'vue';
import { Toast } from 'vant';
import router from '../router/index.js'

Vue.use(Toast);


const token = localStorage.getItem('token'),
  userId = localStorage.getItem('user_id') || ''


var config = {
  timeout: 7000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Bear' + ' ' + token
  },

  transformRequest: qs.stringify
}

var axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? prodApi : '/api',
  ...config
})

axiosInstance.interceptors.request.use(requestDataHandler)
axiosInstance.interceptors.response.use(responseDataHandler)

// 拦截器的写法请参考 @see https://www.kancloud.cn/yunye/axios/234845#_395

// 请求拦截器
function requestDataHandler(req) {
  // console.log("---->拦截器" + JSON.stringify(req));
  // req.params.user_id = userId
  req.data.user_id = userId
  return req
}

// 响应拦截器
function responseDataHandler(res) {
  if (res.data.code === 200) {
    return res.data
  }
  if (res.data.code === 601) {
    Toast('金额不足请充值');
    return
  }
  if (res.data.code === 401 || res.data.code === 402) {
    Toast('请重新登陆');
    router.push({
      path: '/login'
    })
    return
  }
}

export default axiosInstance

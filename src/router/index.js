import Vue from 'vue'
import Router from 'vue-router'
import guard from './guard'

import Index from '@v/index'

Vue.use(Router)

// 用于放在meta中的标记
const keepAlive = true, // 带缓存路由
  fromUrlStop = true // 直接从url进入时，将被导航至home

// 设置路由path和name
// 为什么使用这种模式：合并路由的path和name，确保每个路由必有name。因为从url直接访问一个页面它的route.name必然为null，
// 以此判断是否从url直接进入
function p(name, path) {
  return {
    path: `/${path ? path : name}`,
    name,
    meta: {} // 防止未设置meta造成取到undefined的情况
  }
}

var routes = [{
  path: '/',
  name: 'index',
  component: Index,
  meta: {
    keepAlive,
    requireAuth: true
  },
},
{
  ...p('invest'), // 充值页
  component: () => import('@v/invest/invest') // 路由懒加载
},
{
  ...p('income'), // 收入明细
  component: () => import('@v/details/income') // 路由懒加载
},
{
  ...p('presentation'), // 提现明细
  component: () => import('@v/details/presentation') // 路由懒加载
},
{
  ...p('recharge'), // 充值明细
  component: () => import('@v/details/recharge') // 路由懒加载
},
{
  ...p('login'), // 登录 这个就相当于同时设置 path: '/login', name: 'login'
  component: () => import('@v/login/login') // 路由懒加载
},
]

// guard为路由实例添加全局守卫
export default guard(new Router({
  mode: 'history',
  base: '/vue/h5/home',
  routes
}))

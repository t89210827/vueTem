// 全局路由守卫

export default function (router) {
  // 带有meta.fromUrlStop的路由，若从url进入(name为null)则跳到home(防止用户从url直接进入需要特殊参数数据的页面)
  router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限

      console.log('----->' + localStorage.getItem('token'));

      if (localStorage.getItem('token')) { // 判断是否登录
        next()
      } else { // 没登录则跳转到登录界面
        next({
          path: '/login',
        })
      }
    } else {
      next()
    }
  })
  return router
}

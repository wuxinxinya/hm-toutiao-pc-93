import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 登录
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: '/',
        component: Welcome
      }]
    },
    // 通配规则 以上规则不符合的时候，走这个规则
    {
      path: '*',
      component: NotFound
    }
  ] // 路由规则
})
export default router

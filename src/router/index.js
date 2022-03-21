import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/Login')
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const Article = () => import('@/views/Article')
const Publish = () => import('@/views/Publish')
import { getItem } from '@/utils/auth'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout',
    children: [
      {
        path: '/',
        // alias: 别名
        // alias: '/layout',
        component: Home
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/publish',
        component: Publish
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 导航前置守卫
router.beforeEach((to, from, next) => {
  Nprogress.start()
  if (getItem()) {
    if (to.path.toLowerCase() === '/' || to.path.toLowerCase() === '/login') {
      next('/layout')
    } else {
      next()
    }
  } else {
    if (to.path.toLowerCase() === '/' || to.path.toLowerCase() === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  Nprogress.done()
})
// 导航后置守卫
router.afterEach((to, from) => {
  // console.log(to, from)
  Nprogress.done()
})
export default router

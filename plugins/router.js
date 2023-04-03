import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils/utils'
//指数竞猜路由
import index from "@/pages/index";
Vue.use(Router)

const routes = [
  //指数竞猜路由
  { path: '/', name: 'index', component: index },
]

export function createRouter () {
  return new Router({
    mode: 'history',
    routes,
    scrollBehavior
  })
}

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (!process.client) {
      next()
      return
    }
    next();
  })
}

import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils/utils'
//指数竞猜路由
import index from "@/pages/index";
import detail from '@/pages/index/detail'
import question from '~/pages/index/question'
import rules from '~/pages/index/rules'
import myPicker from '~/pages/myPicker'
import idxRank from '~/pages/idxRank'
Vue.use(Router)

const routes = [
  //指数竞猜路由
  { path: '/', name: 'index', component: index },
  { path: '/myPicker', name: 'myPicker', component: myPicker },
  { path: '/index/question', name: 'question', component: question },
  { path: '/index/detail', name: 'detail', component: detail },
  { path: '/index/rules', name: 'rules', component: rules },
  { path: '/idxRank', name: 'idxRank', component: idxRank }
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
    const item = JSON.parse(localStorage.getItem('fpfp'));

    if (to.name !== 'login' && item === null) {
      next({
        path: `/login?redirect=${to.fullPath}`,
        replace: true
      })

    } else {
      next();
    }
  })
}

import Vue from 'vue'
import VueRouter from 'vue-router'

import { authGuard } from '../auth/authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: () => import('../views/Accounts.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/incomes',
    name: 'Incomes',
    component: () => import('../views/Incomes.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: () => import('../views/expenses/Expenses.vue'),
    beforeEnter: authGuard,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router

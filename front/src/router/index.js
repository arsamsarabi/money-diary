import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import('../views/Transactions.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router

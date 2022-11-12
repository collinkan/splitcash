import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Bills from '../views/Bills.vue'
import Friends from '../views/Friends.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/bills',
    name: 'Bills',
    component: Bills
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends
  },
  {
    path: '/create',
    name: 'NewBill',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewBill.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router


import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'


import Login from './views/Login.vue'
import Register from './views/Register.vue'
import { Dashboard } from './views/Dashboard'
import { Home } from './views/Home'
import { Shops } from './views/Shops'
import { ShopDetails } from './views/ShopDetails'
import { Categories } from './views/Categories'
import { Users } from './views/Users'
import { Settings } from './views/Settings'


Vue.use(Router)
Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  linkActiveClass: 'active bg-c-blue',
  routes: [
    { path: '*', redirect: '/login'},
    { name: 'Login', path: '/login', component: Login, meta: { auth: false } },
    { name: 'Register', path: '/register', component: Register, meta: { auth: false } },
    {
      path: '/',
      name: 'Dashboard',
      redirect: '/home',
      component: Dashboard,
      meta: { auth: true },
      children: [
        { name: 'Home', path: '/home', component: Home },
        { name: 'Shops', path: '/shops', component: Shops },
        { name: 'ShopDetails', path: '/shop-details/:id', component: ShopDetails },
        { name: 'Categories', path: '/categories', component: Categories },
        { name: 'Users', path: '/users', component: Users },
        { name: 'Settings', path: '/settings', component: Settings },
      ]
    },
    
  ]
})

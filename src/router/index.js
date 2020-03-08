import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Home,
    children : [
      {
          path: 'home',
          name: 'homePage',
          component: () => import('../components/homePage.vue')
      },
      {
        path: 'problemset',
        name: 'problemset',
        component: () => import('../components/Problemset.vue')
      },
      {
        path: 'problem/:Index',
        name: 'problem',
        component : () => import('../components/Problem.vue')
      },
      {
        path: 'submissions',
        name: 'submissions',
        component: () => import('../components/Submissions.vue')
      },
      {
        path: 'contestset',
        name: 'contestset',
        component: () => import('../components/Contestset.vue')
      },
      {
        path: 'contest',
        name: 'contest',
        component: () => import('../components/Contest.vue')
      },
      {
        path: 'FAQ',
        name: 'faq',
        component: () => import("../components/FAQ.vue")
      },
      {
        path: 'userinfo',
        name: 'userinfo',
        component: () => import("../components/Userinfo.vue")
      },
      {
        path: 'users',
        name: 'users',
        component: () => import("../components/Users.vue")
      },
    ]
  },
  {
    path: '/contest/contestProblem',
    name: 'cproblem',
    component : () => import("../components/contestComp/CproblemPage.vue")
  },
  {
    path: '/code/:id',
    name: 'code',
    component : () => import('../views/showCode.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('../views/Update.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

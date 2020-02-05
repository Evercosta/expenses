import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { icon: 'home', title: 'Home' },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home')
  },
  {
    path: '/expenses-list',
    name: 'expenses-list',
    meta: { icon: 'list-ul', title: 'Lista Gastos' },
    component: () => import(/* webpackChunkName: "expenses-list" */ '../views/expenses-list/ExpensesList')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'login' },
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// impedir q acesse a rota home sem estar logado
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Expenses`

  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

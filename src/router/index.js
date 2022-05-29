import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/Cart.vue')
const Category = () => import('views/category/Category.vue')
const Profile = () => import('views/profile/Profile.vue')
const Detail = () => import('views/detail/Detail.vue')

// 1.安装插件
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/home',
    meta: {
      show: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      show: true
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      show: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      show: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      show: true
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      show: false
    }
  },
]

// 2.创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

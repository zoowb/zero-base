import CartView from '@/views/CartView.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'

const routes = [
  // { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetailView },
  { path: '/cart', component: CartView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import DetailView from '../views/DetailView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Highlights',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductsView,
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: DetailView,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartView,
    },
  ],
})

router.beforeEach((to, from) => {
  document.title = `${to.name} | bmazon` ?? 'Default Title'
})

export default router

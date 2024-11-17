import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routePaths = {
  home: {
    name: 'home',
    path: '/',
    component: HomeView,
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [routePaths.home],
})

export default router

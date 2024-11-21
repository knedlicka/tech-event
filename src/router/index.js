import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProgramView from '../views/ProgramView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

export const routePaths = {
  home: {
    name: 'home',
    path: '/',
    component: HomeView,
  },
  program: {
    name: 'program',
    path: '/program',
    component: ProgramView,
  },
  login: {
    name: 'login',
    path: '/login',
    component: LoginView,
  },
  register: {
    name: 'register',
    path: '/register',
    component: RegisterView,
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routePaths),
})

export default router

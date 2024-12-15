import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProgramView from '../views/ProgramView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SpeakersView from '@/views/SpeakersView.vue'
import SpeakerDetailView from '@/views/SpeakerDetailView.vue'
import TalkDetailView from '@/views/TalkDetailView.vue'
import ProfileView from '@/views/ProfileView.vue'
import OrganizersAdminView from '@/views/OrganizersAdminView.vue'
import ParticipantsAdminView from '@/views/ParticipantsAdminView.vue'
import NotificationsAdminView from '@/views/NotificationsAdminView.vue'
import TicketsAdminView from '@/views/TicketsAdminView.vue'
import { useUserStore } from '@/stores/user'

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
    meta: {
      requiresAuth: true,
    },
  },
  talkDetails: {
    name: 'talkDetail',
    path: '/talks/:id',
    component: TalkDetailView,
    meta: {
      requiresAuth: true,
    },
  },
  speakers: {
    name: 'speakers',
    path: '/speakers',
    component: SpeakersView,
    meta: {
      requiresAuth: true,
    },
  },
  speakerDetail: {
    name: 'speakerDetail',
    path: '/speakers/:id',
    component: SpeakerDetailView,
    meta: {
      requiresAuth: true,
    },
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
  profile: {
    name: 'profile',
    path: '/profile',
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
  organizersAdmin: {
    name: 'organizersAdmin',
    path: '/admin/organizers',
    component: OrganizersAdminView,
    meta: {
      requiresAuth: true,
    },
  },
  participantsAdmin: {
    name: 'participantsAdmin',
    path: '/admin/participants',
    component: ParticipantsAdminView,
    meta: {
      requiresAuth: true,
    },
  },
  notificationsAdmin: {
    name: 'notificationsAdmin',
    path: '/admin/notifications',
    component: NotificationsAdminView,
    meta: {
      requiresAuth: true,
    },
  },
  ticketsAdmin: {
    name: 'ticketsAdmin',
    path: '/admin/tickets',
    component: TicketsAdminView,
    meta: {
      requiresAuth: true,
    },
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routePaths),
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (userStore.isLoggedIn && [routePaths.register.path, routePaths.login.path].includes(to.path)) {
    next(routePaths.home.path)
  } else if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next(routePaths.login.path)
  } else {
    next()
  }
})

export default router

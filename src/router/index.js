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
import NotificationsView from '@/views/NotificationsView.vue'

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
  talkDetails: {
    name: 'talkDetail',
    path: '/talks/:title',
    component: TalkDetailView,
    meta: {
      requiresAuth: true,
    },
  },
  speakers: {
    name: 'speakers',
    path: '/speakers',
    component: SpeakersView,
  },
  speakerDetail: {
    name: 'speakerDetail',
    path: '/speakers/:name',
    component: SpeakerDetailView,
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
  notifications: {
    name: 'notifications',
    path: '/notifications',
    component: NotificationsView,
    meta: {
      requiresAuth: true,
    },
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
    name: 'organizers',
    path: '/admin/organizers',
    component: OrganizersAdminView,
    meta: {
      requiresAuth: true,
      requiresOrganizer: true,
    },
  },
  participantsAdmin: {
    name: 'participants',
    path: '/admin/participants',
    component: ParticipantsAdminView,
    meta: {
      requiresAuth: true,
      requiresOrganizer: true,
    },
  },
  notificationsAdmin: {
    name: 'notifications-admin',
    path: '/admin/notifications',
    component: NotificationsAdminView,
    meta: {
      requiresAuth: true,
      requiresOrganizer: true,
    },
  },
  ticketsAdmin: {
    name: 'tickets',
    path: '/admin/tickets',
    component: TicketsAdminView,
    meta: {
      requiresAuth: true,
      requiresOrganizer: true,
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
  } else if (to.meta.requiresOrganizer && userStore?.currentUser?.role !== 'organizer') {
    next(routePaths.login.path)
  } else if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next(routePaths.login.path)
  } else {
    next()
  }
})

export default router

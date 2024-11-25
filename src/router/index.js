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
    path: '/talks/:id',
    component: TalkDetailView,
  },
  speakers: {
    name: 'speakers',
    path: '/speakers',
    component: SpeakersView,
  },
  speakerDetail: {
    name: 'speakerDetail',
    path: '/speakers/:id',
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
  profile: {
    name: 'profile',
    path: '/profile',
    component: ProfileView,
  },
  organizersAdmin: {
    name: 'organizersAdmin',
    path: '/admin/organizers',
    component: OrganizersAdminView,
  },
  participantsAdmin: {
    name: 'participantsAdmin',
    path: '/admin/participants',
    component: ParticipantsAdminView,
  },
  notificationsAdmin: {
    name: 'notificationsAdmin',
    path: '/admin/notifications',
    component: NotificationsAdminView,
  },
  ticketsAdmin: {
    name: 'ticketsAdmin',
    path: '/admin/tickets',
    component: TicketsAdminView,
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routePaths),
})

router.beforeEach(async (to, from) => {
  const isLoggedIn = localStorage.getItem('email') !== null
  const protectedNames = [
    'profile',
    'organizersAdmin',
    'participantsAdmin',
    'notificationsAdmin',
    'ticketsAdmin',
  ]
  if (!isLoggedIn && protectedNames.includes(to.name)) {
    return { name: 'login' }
  }
  if (isLoggedIn && ['login', 'register'].includes(to.name)) {
    return { name: 'home' }
  }
})

export default router

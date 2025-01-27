import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileView from '@/views/ProfileView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useProgramStore } from '@/stores/program'
import MainButton from '@/components/buttons/MainButton.vue'

describe('ProfileView', () => {
  let userStore
  let programStore

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    userStore = useUserStore()
    programStore = useProgramStore()

    programStore.getTalk = vi.fn((title) => ({ title }))
  })

  it('performs registration, login, and displays user profile information', async () => {
    const userCredentials = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      talkTitles: [],
    }

    userStore.register(
      userCredentials.email,
      userCredentials.password,
      userCredentials.name,
      'participant',
    )

    const registeredUser = userStore.getByEmail(userCredentials.email)
    userStore.currentUser = {
      ...registeredUser,
      pointsClaimedOn: [],
    }

    expect(userStore.currentUser).not.toBeUndefined()
    expect(userStore.isLoggedIn).toBe(true)

    const wrapper = mount(ProfileView)

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Name: John Doe')
    expect(wrapper.text()).toContain('Email: john.doe@example.com')
    expect(wrapper.text()).toContain('Ticket: no_ticket')

    const returnButton = wrapper.findComponent(MainButton)
    expect(returnButton.exists()).toBe(false)
  })
})

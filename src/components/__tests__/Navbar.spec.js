import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Navbar from '@/components/navbar/NavBar.vue';
import { routePaths } from '@/router';
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('@/stores/user', () => {
  return {
    useUserStore: vi.fn(() => ({
      isLoggedIn: false,
      currentUser: null,
      logout: vi.fn(),
    })),
  };
});

const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: routePaths.program.path, name: 'Program' },
    { path: routePaths.speakers.path, name: 'Speakers' },
    { path: routePaths.home.path, name: 'Home' },
    { path: routePaths.login.path, name: 'Login' },
    { path: routePaths.profile.path, name: 'Profile' },
  ],
});

describe('Navbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Navbar, {
      global: {
        plugins: [mockRouter],
      }
    });
  });

  it('renders the logo', () => {
    expect(wrapper.find('.logo').text()).toBe('LOGO');
  });

  it('shows menu items based on login status (logged out)', async () => {
    const menuItems = wrapper.findAll('.menu-link-container a');
    expect(menuItems.length).toBe(4);
    expect(menuItems[0].text()).toBe('home');
    expect(menuItems[1].text()).toBe('program');
    expect(menuItems[2].text()).toBe('speakers');
    expect(menuItems[3].text()).toBe('login');
  });

  it('toggles menu visibility on mobile', async () => {
    wrapper.setData({ isMobile: true });
    await wrapper.vm.$nextTick();

    const hamburgerButton = wrapper.find('.hamburger-menu button');
    expect(hamburgerButton.exists()).toBe(true);

    await hamburgerButton.trigger('click');
    expect(wrapper.vm.showMenu).toBe(true);

    const dropdownMenu = wrapper.find('.dropdown-menu');
    expect(dropdownMenu.exists()).toBe(true);
  });

  it('hides dropdown menu when a menu item is clicked', async () => {
    wrapper.setData({ isMobile: true, showMenu: true });
    await wrapper.vm.$nextTick();

    const menuItems = wrapper.findAll('.expanded-menu-link-container a');
    await menuItems[0].trigger('click');

    expect(wrapper.vm.showMenu).toBe(false);
  });
});

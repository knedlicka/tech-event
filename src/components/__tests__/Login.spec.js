import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginView from '@/views/LoginView.vue';

describe('LoginView', () => {
  it('renders properly with default elements', async () => {
    const wrapper = mount(LoginView);

    expect(wrapper.find('.heading-section').text()).toBe('Log in');

    const registerLink = wrapper.find('.white-link');
    expect(registerLink.text()).toBe('Register');
    expect(registerLink.attributes('to')).toBe('/register');

    expect(wrapper.find('input[name="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);

    expect(wrapper.findComponent({ name: 'MainButton' }).exists()).toBe(true);
  });

  it('displays an error message when login fails', async () => {
    const wrapper = mount(LoginView);

    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const button = wrapper.findComponent({ name: 'MainButton' });

    await emailInput.setValue('invalid@example.com');
    await passwordInput.setValue('wrongpassword');
    await button.trigger('click');

    expect(wrapper.vm.error).toBe('Invalid username or password');
    expect(wrapper.find('.error').text()).toBe('Invalid username or password');
  });
});


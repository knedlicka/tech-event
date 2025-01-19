import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import RegisterView from '@/views/RegisterView.vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';

describe('RegisterView', () => {
  it('registers a user and redirects to login', async () => {
    const wrapper = mount(RegisterView);

    const userStore = useUserStore();
    vi.spyOn(userStore, 'register').mockReturnValue(undefined);

    vi.spyOn(router, 'push').mockImplementation(() => {});

    const fullNameInput = wrapper.find('input[name="full-name"]');
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const button = wrapper.findComponent({ name: 'MainButton' });

    await fullNameInput.setValue('John Doe');
    await emailInput.setValue('john.doe@example.com');
    await passwordInput.setValue('password123');
    await button.trigger('click');

    expect(userStore.register).toHaveBeenCalledWith('john.doe@example.com', 'password123', 'John Doe', 'participant');

    expect(router.push).toHaveBeenCalledWith('/login');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import { routePaths } from '@/router';
import { createRouter, createWebHistory } from 'vue-router';

const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: routePaths.program.path, name: 'Program' },
    { path: routePaths.speakers.path, name: 'Speakers' },
  ],
});

describe('HomeView', () => {
  it('redirects to the correct path when a card is clicked', async () => {
    const routerPush = vi.spyOn(mockRouter, 'push').mockImplementation(() => {});

    const wrapper = mount(HomeView, {
      global: {
        plugins: [mockRouter],
      },
    });

    const programCard = wrapper.findAllComponents({ name: 'ClickableCard' }).at(0);
    await programCard.trigger('click');

    expect(routerPush).toHaveBeenCalledWith(routePaths.program.path);

    const speakersCard = wrapper.findAllComponents({ name: 'ClickableCard' }).at(1);
    await speakersCard.trigger('click');

    expect(routerPush).toHaveBeenCalledWith(routePaths.speakers.path);
  });
});

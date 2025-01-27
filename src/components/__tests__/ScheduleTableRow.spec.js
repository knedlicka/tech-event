import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ScheduleTableRow from '@/components/schedule-table/ScheduleTableRow.vue';

vi.mock('@/stores/user', () => {
  return {
    useUserStore: vi.fn(() => ({
      isLoggedIn: true,
      isRegisteredForTalk: vi.fn().mockReturnValue(false),
      registerForTalk: vi.fn(),
      unregisterFromTalk: vi.fn(),
    })),
  };
});

describe('ScheduleTableRow', () => {
  let wrapper;
  const time = '10:00 AM';
  const title = 'The Future of AI';
  const speaker = 'Alice Johnson';
  const room = 'Room A';
  const id = 'talk-1';

  beforeEach(() => {
    wrapper = mount(ScheduleTableRow, {
      props: { time, title, speaker, room, id },
    });
  });

  it('renders correctly with provided props', () => {
    expect(wrapper.find('.row-field').text()).toBe(time);
    expect(wrapper.findAll('.row-field')[1].text()).toBe(title);
    expect(wrapper.findAll('.row-field')[2].text()).toBe(speaker);
    expect(wrapper.findAll('.row-field')[3].text()).toBe(room);
  });

  it('displays "Register" button when user is not registered for the talk and "Unregister" otherwise', async () => {
    expect(wrapper.find('button').text()).toBe('Register');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('button').text()).toBe('Unregister');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('button').text()).toBe('Register');
  });
});

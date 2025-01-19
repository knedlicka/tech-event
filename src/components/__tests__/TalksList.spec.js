import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TalksList from '@/components/talks-list/TalksList.vue'
import { RouterLink } from 'vue-router'

describe('TalksList.vue', () => {
  const talks = [{ title: 'Talk 1' }, { title: 'Talk 2' }, { title: 'Talk 3' }]

  it('renders the talks list with the correct number of talks', () => {
    const wrapper = mount(TalksList, {
      props: {
        talks,
      },
    })

    const talksList = wrapper.findAll('.talk-info')
    expect(talksList.length).toBe(talks.length)
  })

  it('renders the correct title for each talk', () => {
    const wrapper = mount(TalksList, {
      props: {
        talks,
      },
    })

    const talksList = wrapper.findAll('.talk-info')
    talksList.forEach((talk, index) => {
      expect(talk.text()).toContain(talks[index].title)
    })
  })

  it('links to the correct route for each talk', () => {
    const wrapper = mount(TalksList, {
      props: {
        talks,
      },
    })

    const routerLinks = wrapper.findAllComponents(RouterLink)
    routerLinks.forEach((link, index) => {
      expect(link.props().to).toEqual({ name: 'talkDetail', params: { title: talks[index].title } })
    })
  })

  it('displays the "Talks:" heading', () => {
    const wrapper = mount(TalksList, {
      props: {
        talks,
      },
    })

    const heading = wrapper.find('.talks-heading')
    expect(heading.text()).toBe('Talks:')
  })
})

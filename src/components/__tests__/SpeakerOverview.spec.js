import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SpeakerOverview from '@/components/speaker-overview/SpeakerOverview.vue'

describe('SpeakerOverview.vue', () => {
  it('renders the speaker photo', () => {
    const photoPath = 'https://example.com/photo.jpg'
    const wrapper = mount(SpeakerOverview, {
      props: {
        name: 'John Doe',
        country: 'USA',
        photoPath: photoPath,
      },
    })

    const img = wrapper.find('.speaker-overview-photo')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(photoPath)
    expect(img.attributes('alt')).toBe('John Doe')
  })

  it('renders the speaker name and country', () => {
    const wrapper = mount(SpeakerOverview, {
      props: {
        name: 'John Doe',
        country: 'USA',
        photoPath: 'https://example.com/photo.jpg',
      },
    })

    const text = wrapper.text()
    expect(text).toContain('John Doe')
    expect(text).toContain('USA')
  })
})

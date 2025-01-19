import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TicketsBox from '@/components/tickets-box/TicketsBox.vue'
import MainButton from '@/components/buttons/MainButton.vue'
import { useTicketStore } from '@/stores/ticket'
import { useUserStore } from '@/stores/user'
import { getExchangeRates } from '@/services/exchange-rates.js'

vi.mock('@/stores/ticket', () => ({
  useTicketStore: vi.fn(),
}))

vi.mock('@/stores/user', () => ({
  useUserStore: vi.fn(),
}))

vi.mock('@/services/exchange-rates.js', () => ({
  getExchangeRates: vi.fn(),
}))

describe('TicketsBox.vue', () => {
  const ticketStore = {
    paidTypes: [
      { name: 'Standard', priceUsd: 100 },
      { name: 'VIP', priceUsd: 200 },
    ],
    types: [
      { name: 'Standard', extraFeatures: ['Extra drink', 'Priority seating'] },
      { name: 'VIP', extraFeatures: ['Exclusive lounge', 'Priority seating'] },
    ],
  }

  const userStore = {
    setTicket: vi.fn(),
  }

  beforeEach(() => {
    useTicketStore.mockReturnValue(ticketStore)
    useUserStore.mockReturnValue(userStore)
    getExchangeRates.mockResolvedValue({
      USD: 1,
      EUR: 0.9,
      GBP: 0.75,
      CAD: 1.3,
    })
  })

  it('renders the ticket types correctly', () => {
    const wrapper = mount(TicketsBox)
    const ticketTypeSelect = wrapper.find('select[name="ticket-type"]')
    const options = ticketTypeSelect.findAll('option')

    expect(options.length).toBe(ticketStore.paidTypes.length)
    expect(options.at(0).text()).toBe('Standard')
    expect(options.at(1).text()).toBe('VIP')
  })

  it('renders the currency options correctly', () => {
    const wrapper = mount(TicketsBox)
    const currencySelect = wrapper.find('select[name="currency"]')
    const options = currencySelect.findAll('option')

    expect(options.length).toBe(4)
    expect(options.at(0).text()).toBe('USD')
    expect(options.at(1).text()).toBe('EUR')
    expect(options.at(2).text()).toBe('GBP')
    expect(options.at(3).text()).toBe('CAD')
  })

  it('displays the price for the selected ticket and currency', async () => {
    const wrapper = mount(TicketsBox)

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('$100.00')

    await wrapper.setData({ currency: 'EUR' })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('€90.00')
  })

  it('displays extra features for the selected ticket', async () => {
    const wrapper = mount(TicketsBox)

    await wrapper.setData({ ticketType: 'Standard' })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Extra drink')
    expect(wrapper.text()).toContain('Priority seating')

    await wrapper.setData({ ticketType: 'VIP' })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Exclusive lounge')
    expect(wrapper.text()).toContain('Priority seating')
  })

  it('handles ticket purchase and calls userStore.setTicket', async () => {
    const wrapper = mount(TicketsBox)
    const buyButton = wrapper.findComponent(MainButton)
    await buyButton.trigger('click')
    expect(userStore.setTicket).toHaveBeenCalledWith('Standard')
  })

  it('displays loading message if exchange rates are not loaded', async () => {
    getExchangeRates.mockResolvedValueOnce(undefined)
    const wrapper = mount(TicketsBox)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('loading')
  })

  it('displays the total price with the correct formatting', async () => {
    const wrapper = mount(TicketsBox)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('$100.00')
    await wrapper.setData({ currency: 'EUR' })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('€90.00')
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
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
  let ticketStore, userStore

  beforeEach(() => {
    ticketStore = {
      paidTypes: [
        { name: 'Standard', priceUsd: 100 },
        { name: 'VIP', priceUsd: 200 },
      ],
      types: [
        { name: 'Standard', extraFeatures: ['Extra drink', 'Priority seating'] },
        { name: 'VIP', extraFeatures: ['Exclusive lounge', 'Priority seating'] },
      ],
    }

    userStore = {
      currentUser: { ticketName: 'no_ticket' },
      setTicket: vi.fn(),
      returnTicket: vi.fn(),
    }

    useTicketStore.mockReturnValue(ticketStore)
    useUserStore.mockReturnValue(userStore)
    getExchangeRates.mockResolvedValue({
      USD: 1,
      EUR: 0.9,
      GBP: 0.75,
      CAD: 1.3,
    })
  })

  it('renders correctly for a user with no ticket', () => {
    const wrapper = shallowMount(TicketsBox)
    expect(wrapper.find('.tickets-box').exists()).toBe(true)
    expect(wrapper.find('.tickets-title').text()).toBe('Buy a ticket')
    expect(wrapper.find('form.ticket-form').exists()).toBe(true)
  })

  it('renders ticket types correctly', () => {
    const wrapper = shallowMount(TicketsBox)
    const ticketTypeSelect = wrapper.find('select[name="ticket-type"]')
    const options = ticketTypeSelect.findAll('option')

    expect(options.length).toBe(ticketStore.paidTypes.length)
    expect(options.at(0).text()).toBe('Standard')
    expect(options.at(1).text()).toBe('VIP')
  })

  it('renders currency options correctly', () => {
    const wrapper = shallowMount(TicketsBox)
    const currencySelect = wrapper.find('select[name="currency"]')
    const options = currencySelect.findAll('option')

    expect(options.length).toBe(4)
    expect(options.at(0).text()).toBe('USD')
    expect(options.at(1).text()).toBe('EUR')
    expect(options.at(2).text()).toBe('GBP')
    expect(options.at(3).text()).toBe('CAD')
  })

  it('displays the price for the selected ticket and currency', async () => {
    const wrapper = shallowMount(TicketsBox)

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('$100.00')

    await wrapper.setData({ currency: 'EUR' })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('€90.00')
  })

  it('displays extra features for the selected ticket', async () => {
    const wrapper = shallowMount(TicketsBox)

    await wrapper.setData({ ticketType: 'Standard' })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Extra drink')
    expect(wrapper.text()).toContain('Priority seating')

    await wrapper.setData({ ticketType: 'VIP' })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Exclusive lounge')
    expect(wrapper.text()).toContain('Priority seating')
  })

  it('handles ticket purchase correctly', async () => {
    const wrapper = shallowMount(TicketsBox)
    const buyButton = wrapper.findComponent(MainButton)
    await buyButton.trigger('click')
    expect(userStore.setTicket).toHaveBeenCalledWith('Standard')
  })

  it('shows a loading message when exchange rates are not loaded', async () => {
    getExchangeRates.mockResolvedValueOnce(undefined)
    const wrapper = shallowMount(TicketsBox)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('loading')
  })

  it('renders return ticket section when user has a ticket', () => {
    userStore.currentUser.ticketName = 'VIP'
    const wrapper = shallowMount(TicketsBox)
    const returnSection = wrapper.find('.return-ticket-content')
    expect(returnSection.exists()).toBe(true)
    expect(returnSection.text()).toContain('Your ticket: VIP')
  })

  it('calls returnTicket when the return button is clicked', async () => {
    userStore.currentUser.ticketName = 'VIP'
    const wrapper = shallowMount(TicketsBox)
    const returnButton = wrapper.findComponent(MainButton)
    await returnButton.trigger('click')
    expect(userStore.returnTicket).toHaveBeenCalled()
  })
})

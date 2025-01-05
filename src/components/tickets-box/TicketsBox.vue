<script>
import { useTicketStore } from '@/stores/ticket';
import { useUserStore } from '@/stores/user';
import MainButton from '@/components/buttons/MainButton.vue';
import { getExchangeRates } from '@/services/exchange-rates.js';

export default {
    components: { MainButton },
    data() {
        const ticketStore = useTicketStore();
        return {
            userStore: useUserStore(),
            ticketStore: ticketStore,
            ticketType: ticketStore.paidTypes[0].name,
            currencies: ["USD", "EUR", "GBP", "CAD"],
            currency: "USD",
            exchangeRates: {},
        }
    },
    created() {
        getExchangeRates().then(rates => this.exchangeRates = rates)
    },
    methods: {
        handleBuy() {
            this.userStore.setTicket(this.ticketType);
            alert("You bought a ticket successfully");
        },
    },
    computed: {
        price() {
            const ticketData = this.ticketStore.paidTypes.find(ticketInfo => ticketInfo.name === this.ticketType);
            if (!ticketData || !Object.keys(this.exchangeRates).includes(this.currency)) {
                return "?";
            }
            const convertedPrice = ticketData.priceUsd * this.exchangeRates[this.currency];
            return convertedPrice.toLocaleString("en-US", { style: "currency", currency: this.currency, maximumFractionDigits: 2 })
        },
        extraFeatures() {
            return this.ticketStore.types.find(ticketInfo => ticketInfo.name === this.ticketType)?.extraFeatures ?? [];
        }
    }
}
</script>

<template>
    <div class="tickets-box">
        <div class="tickets-title">Buy a ticket</div>
        <form class="ticket-form">
            <label for="ticket-type">Ticket type:</label>
            <select name="ticket-type" required v-model="this.ticketType" class="select-input">
                <option v-for="knownTicketType of this.ticketStore.paidTypes" :value="knownTicketType.name">
                    {{ knownTicketType.name }}
                </option>
            </select>

            <label for="currency">Currency: </label>
            <select name="currency" required v-model="this.currency" class="select-input">
                <option v-for="currency of this.currencies">
                    {{ currency }}
                </option>
            </select>

            <div class="form-divider"></div>

            <div v-if="this.extraFeatures.length > 0">
                <b>Extra features of <i>{{ this.ticketType }}</i> ticket:</b>
                <ul>
                    <li v-for="feature of this.extraFeatures">
                        <span class="feature">{{ feature }}</span>
                    </li>
                </ul>
            </div>
            <div class="total-container">
                <span>Total:</span>
                <span>{{ this.price }}</span>
            </div>
            <MainButton @click.prevent="this.handleBuy" label="Buy ticket" />
        </form>
    </div>
</template>

<style>
.tickets-box {
    display: flex;
    flex-direction: column;
    width: 270px;
    border-radius: 10px;
    background: grey;
    color: white;
    opacity: 0.6;
    box-shadow: 3px 3px 4px rgb(145, 154, 163);
    padding: 20px;
    gap: 8px;
    margin-bottom: 20px;
}

.tickets-box:hover {
    opacity: 0.8;
    background: rgb(107, 106, 106);
}

.tickets-title {
    font-size: 24px;
    font-weight: 700;
}

.ticket-form {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.form-divider {
    border-bottom: 1px solid black;
    width: 100%;
    margin: 10px 0 10px 0;
}

.total-container {
    display: flex;
    justify-content: space-between;
}

.feature {
    text-transform: capitalize;
}
</style>
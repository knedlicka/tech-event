<script>
import MainButton from '@/components/buttons/MainButton.vue';
import TicketsTable from '@/components/tickets-table/TicketsTable.vue';
import { useTicketStore } from '@/stores/ticket';

export default {
    components: { MainButton, TicketsTable },
    data() {
        return {
            ticketStore: useTicketStore(),
            newTicketName: "",
            newTicketPriceUsd: "",
            newTicketExtraFeatures: "",
            error: undefined,
        }
    },
    methods: {
        handleAddTicketType() {
            const existingTicket = this.ticketStore.types.find(ticketInfo => ticketInfo.name === this.newTicketName);
            this.error = undefined;
            if (existingTicket) {
                this.error = `A ticket with name ${this.newTicketName} already exists`
            } else {
                this.ticketStore.addTicket({
                    name: this.newTicketName,
                    priceUsd: String(this.newTicketPriceUsd),
                    extraFeatures: this.newTicketExtraFeatures.split(','),
                })
                this.newTicketName = "";
                this.newTicketPriceUsd = "";
                this.newTicketExtraFeatures = "";
            }
        },
    }
}
</script>

<template>
    <main class="container">
        <div class="inner-container">
            <div class="heading-section">Tickets admin</div>
            <form class="add-ticket-form" @submit.prevent="this.handleAddTicketType">
                <div v-if="this.error !== undefined" class="error">{{ this.error }}</div>
                <input required class="text-input" type="text" v-model="this.newTicketName" placeholder="Ticket name" />
                <input required class="text-input" type="number" v-model="this.newTicketPriceUsd"
                    placeholder="Price in USD" />
                <input class="text-input" type="text" v-model="this.newTicketExtraFeatures"
                    placeholder="Extra features (comma-separated)" />
                <MainButton type="secondary" label="Add ticket" />
            </form>
            <TicketsTable />
        </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    background: rgb(2, 3, 21);
    color: white;
}

.inner-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    margin-top: 24px;
    max-width: 100%;
}

.add-ticket-form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 4px;
    width: 100%;
}

@media (max-width: 700px) {
    .inner-container {
        align-items: center;
    }
}
</style>
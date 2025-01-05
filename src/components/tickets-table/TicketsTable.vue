<script>
import { useTicketStore } from '@/stores/ticket';
import TicketsTableRow from '@/components/tickets-table/TicketsTableRow.vue';

export default {
    components: { TicketsTableRow },
    data() {
        return {
            ticketStore: useTicketStore(),
        };
    },
}
</script>

<template>
    <div class="table-container tickets-table-container">
        <div class="table-header tickets-table-header">
            <div></div>
            <div>Name</div>
            <div>Price</div>
            <div>Remove</div>
        </div>
        <TicketsTableRow v-for="ticket of this.ticketStore.types" :ticket="ticket" :key="ticket?.name" />
    </div>
</template>

<style scoped>
.tickets-table-container {
    margin-bottom: 20px;
}

.tickets-table-header {
    grid-template-columns: 40px 1fr 1fr 70px;
    min-width: 400px;
}
</style>
<script>
import { useTicketStore } from '@/stores/ticket';
import MinusIcon from '@/assets/images/svg/minus.svg';
import PlusIcon from '@/assets/images/svg/plus.svg';

export default {
    components: { PlusIcon, MinusIcon },
    props: ['ticket'],
    data() {
        return {
            ticketStore: useTicketStore(),
            isExpanded: false,
        };
    },
    methods: {
        handleDelete() {
            this.ticketStore.deleteByName(this.ticket.name);
        },
        toggleExpand() {
            this.isExpanded = !this.isExpanded;
        }
    }
}
</script>

<template>
    <div class="table-row-container tickets-table-row-container">
        <div class="table-row-content tickets-table-row-content">
            <div v-if="this.ticket.extraFeatures.length > 0" class="row-field expander" v-on:click="toggleExpand">
                <PlusIcon v-if="!this.isExpanded" />
                <MinusIcon v-if="this.isExpanded" />
            </div>
            <div v-if="this.ticket.extraFeatures.length === 0"></div>

            <div class="row-field">{{ this.ticket.name }}</div>
            <div class="row-field">{{ Number(this.ticket.priceUsd).toLocaleString("en-US", {
                style: "currency", currency: "USD",
                maximumFractionDigits: 2
            }) }}
            </div>
            <button v-on:click="handleDelete()" class="table-button button-remove">
                Delete
            </button>
        </div>
        <div v-if="this.isExpanded" class="extra-features-container">
            <b>Extra features:</b>
            <ul>
                <li v-for="feature of this.ticket.extraFeatures">
                    {{ feature }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.tickets-table-row-container {
    min-width: 600px;
    background: rgb(231, 231, 231);
}

.tickets-table-row-content {
    grid-template-columns: 40px 1fr 1fr 70px;
    cursor: default;
}

.button-remove {
    background: orange;
    width: auto;
    width: 90%;
}

.expander {
    cursor: pointer;
}

.expander>svg {
    width: 16px;
    height: 16px;
}

svg:hover {
    color: grey;
}

.extra-features-container {
    background: rgb(231, 231, 231);
    padding: 0 16px 8px 16px;
}
</style>
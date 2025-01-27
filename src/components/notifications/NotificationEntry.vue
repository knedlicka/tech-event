<script>
export default {
    props: ['type', 'text']
}
</script>

<template>
    <div :class="`notification-entry-container entry-${this.type}`">
        {{ this.text }}
    </div>
</template>

<style scoped>
.notification-entry-container {
    display: flex;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
}

.entry-error {
    background: #860505;
    color: white;
}

.entry-info {
    background: #002dc8;
    color: white;
}

.entry-success {
    background: #036403;
    color: white;
}
</style>

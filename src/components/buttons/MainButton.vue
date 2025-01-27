<script>
export default {
    props: ['label', 'type', 'disabled']
}
</script>

<template>
    <button
        :class="`main-button ${this.type === 'secondary' ? 'secondary-button' : ''} ${this.disabled ? 'button-disabled' : ''}`"
        :disabled="this.disabled">
        {{ this.label }}
    </button>
</template>

<style>
.main-button {
    height: 30px;
    border-radius: 5px;
    background: rgb(221, 73, 5);
    color: white;
    font-weight: 600;
    box-shadow: 1px 1px 2px rgb(58, 53, 53);
    cursor: pointer;
}

.main-button:hover:not(.button-disabled) {
    box-shadow: none;
    transform: translate(1px, 1px);
}

.secondary-button {
    background: rgb(0, 99, 230);
}

.button-disabled {
    background: #414150;
    box-shadow: none;
}
</style>

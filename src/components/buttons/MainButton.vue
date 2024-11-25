<script>
export default {
    props: ['label']
}
</script>

<template>
    <button class="main-button">
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

.main-button:hover {
    box-shadow: none;
    transform: translate(1px, 1px);
}
</style>
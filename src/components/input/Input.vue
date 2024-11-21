<script>
export default {
    props: ['width', 'placeholder'],
}
</script>

<template>
    <input type="text" style={{ width: this.width }} class="custom-input" placeholder="{{ this.placeholder }}" />
</template>

<style>
.custom-input {
    height: 35px;
    border-radius: 5px;
    padding: 2px;
}
</style>
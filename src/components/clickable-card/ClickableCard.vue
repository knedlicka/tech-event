<script>
export default {
    props: ['label'],
}
</script>

<template>
    <div class="clickable-card-container">
        {{ label }}
    </div>
</template>

<style>
.clickable-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 20px;
    width: 240px;
    height: 160px;
    border-radius: 10px;
    background: white;
    opacity: 0.3;
    cursor: pointer;
    box-shadow: 3px 3px 4px rgb(145, 154, 163);
}

.clickable-card-container:hover {
    transform: translate(1px, 1px);
    box-shadow: none;
}
</style>
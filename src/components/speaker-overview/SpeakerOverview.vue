<script>
export default {
    props: ['name', 'country', 'photoPath'],
}
</script>

<template>
    <div class="speaker-overview-container">
        <img class="speaker-overview-photo" :src="this.photoPath" :alt="this.name" />
        <div>{{ this.name }} {{ this.country }}</div>
    </div>
</template>

<style>
.speaker-overview-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 150px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 1px 1px 3px rgb(244, 241, 241);
    overflow: hidden;
    cursor: pointer;
}

.speaker-overview-container:hover {
    box-shadow: 1px 1px 2px black;
    transform: translate(1px, 1px);
}

.speaker-overview-photo {
    width: 150px;
    height: 150px;
}
</style>
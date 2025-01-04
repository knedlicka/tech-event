<script>
export default {
    props: ['talks'],
}
</script>

<template>
    <div class="talks-list-container">
        <div class="talks-heading">
            Talks:
        </div>
        <div v-for="talk in this.talks" :key="talk.title" class="talk-info">
            <span>{{ talk.title }}</span>
        </div>
    </div>
</template>

<style>
.talks-list-container {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
}

.talks-heading {
    font-weight: 700;
    font-size: 20px;
}

.talk-info {
    display: flex;
    padding: 12px;
    background: rgb(231, 231, 231);
    border-radius: 10px;
    color: rgb(2, 3, 21);
    opacity: 0.4;
}
</style>
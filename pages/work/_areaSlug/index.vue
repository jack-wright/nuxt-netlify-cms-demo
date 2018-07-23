<template>
    <div class="single-work-area">
        <div v-if="!isLoading" class="single-work-area__article">
        	<h1 class="single-work-area__title">
                {{ currentWorkArea.title }}
            </h1>
            <div class="single-work-area__content">
                {{ currentWorkArea.description }}
            </div>
        </div>
        <p v-else class="single-work-area__loading">
            Loading
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        currentWorkArea() {
            return this.$store.state.workArea.currentWorkArea
        },
        isLoading() {
            return this.$store.state.workArea.isLoading
        }
    },

    async fetch({ store, params }) {
        await store.dispatch('workArea/getWorkAreaBySlug', params.areaSlug)
    }
}
</script>

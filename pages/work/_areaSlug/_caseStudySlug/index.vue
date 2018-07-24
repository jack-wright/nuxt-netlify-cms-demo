<template>
    <div class="single-case-study">
        <div v-if="!isLoading" class="single-case-study__article">
        	<h1 class="single-case-study__title">
                {{ currentCaseStudy.title }}
            </h1>
            <div class="single-case-study__content">
                {{ currentCaseStudy.body }}
                <p>The work area for this category is: </p>
            </div>
        </div>
        <p v-else class="single-case-study__loading">
            Loading
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        currentCaseStudy() {
            return this.$store.state.caseStudy.currentCaseStudy
        },
        isLoading() {
            return this.$store.state.caseStudy.isLoading
        }
    },

    async fetch({ store, params }) {
        await store.dispatch('caseStudy/getCaseStudyBySlug', params.caseStudySlug)
    }
}
</script>

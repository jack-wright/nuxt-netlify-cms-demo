<template>
    <div class="single-work-area">
        <div v-if="!isLoading" class="single-work-area__article">
        	<h1 class="single-work-area__title">
                {{ currentWorkArea.title }}
            </h1>
            <div class="single-work-area__content">
                {{ currentWorkArea }}
                <li v-if="currentWorkArea.caseStudies" v-for="(caseStudy, index) in currentWorkArea.caseStudies" :key="index">
                    <nuxt-link :to="caseStudy.title">{{ caseStudy.title }}</nuxt-link>
                    <p>{{ caseStudy.body }}</p>
                </li>
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
    mounted() {
        let caseData = import('../content/case-study/case-study-1.json');
        console.log(caseData);
    },

    async fetch({ store, params }) {
        await store.dispatch('workArea/getWorkAreaBySlug', params.slug)
    }
}
</script>

<template>
    <div class="single-work-area">
        <div v-if="!isLoading" class="single-work-area__article">
        	<h1 class="single-work-area__title">
                {{ currentWorkArea.title }}
            </h1>
            <div class="single-work-area__content">
                {{ currentWorkArea.description }}
            </div>
            <ul>
                <li v-for="(caseStudy, key) in caseStudies" :key={key} className="">
                    <a :href="caseStudy.slug">{{caseStudy.title}}</a>
                    <p>{{ caseStudy.body }}</p>
                </li>
            </ul>
        </div>
        <p v-else class="single-work-area__loading">
            Loading
        </p>
    </div>
</template>

<script>
import { slugify } from '../../../utilities/utilities';

export default {
    computed: {
        currentWorkArea() {
            return this.$store.state.workArea.currentWorkArea
        },
        caseStudies() {
            return this.$store.state.caseStudies.collection
        },
        isLoading() {
            return this.$store.state.caseStudies.isLoading
        }
    },

    async fetch({ store, params }) {
        await store.dispatch('workArea/getWorkAreaBySlug', params.areaSlug)
        await store.dispatch('caseStudies/getByWorkArea', params.areaSlug)
    }
}
</script>

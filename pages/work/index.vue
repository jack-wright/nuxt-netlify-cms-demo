<template>
    <div class="container">
        <h2>Latest posts</h2>
        <ul>
            <li v-if="workAreas" v-for="(workArea, index) in workAreas" :key="index">
                <nuxt-link :to="'/work/' + workArea.slug">{{ workArea.title }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        workAreas() {
            return this.$store.state.workAreas.workAreas
        }
    },
    async fetch({ store, params }) {
        console.log(params);
        await store.dispatch('workAreas/getWorkAreas', params.slug)
    }
}
</script>

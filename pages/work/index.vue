<template>
    <div class="container">
        <h2>Latest posts</h2>
        <ul>
            <li v-if="workAreas" v-for="(workArea, index) in workAreas" :key="index">
                <a :href="workArea.slug">{{ workArea.title }}</a>
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

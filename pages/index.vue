<template>
    <div class="container">
        <h1>HOME</h1>
        <a href="work">Work</a>
        <video 
            src="https://player.vimeo.com/external/268036290.hd.mp4?s=ed62fd973b78c6ac5ac525ce0378772e8149de9f&profile_id=175"
            autoplay
            muted
            loop
            webkit-playsinline
            playsinline>
        </video>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        workAreas() {
            return this.$store.state.workAreas.workAreas
        }
    },
    async fetch({ store, params }) {
        await store.dispatch('workAreas/getWorkAreas', params.slug)
    }
}
</script>

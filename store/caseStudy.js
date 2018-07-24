import { slugify } from '../utilities/utilities'

export const state = () => ({
    currentCaseStudy: {},
    isLoading: true
})

export const mutations = {
    setCurrentCaseStudy(state, payload) {
        state.currentCaseStudy = payload;
    },
    setLoading(state, payload) {
        state.isLoading = payload;
    }
}

export const actions = {
    async getCaseStudyBySlug({commit}, slug) {
        console.log(slug);
        let postData = await import('../content/case-study/' + slug + '.json');
        commit('setCurrentCaseStudy', postData);
        commit('setLoading', false);
    }
}

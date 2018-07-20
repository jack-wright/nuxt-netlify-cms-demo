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
        
    }
}

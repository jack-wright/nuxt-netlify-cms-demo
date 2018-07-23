export const state = () => ({
    currentWorkArea: {},
    isLoading: true
})

export const mutations = {
    setCurrentWorkArea(state, payload) {
        state.currentWorkArea = payload;
    },
    setLoading(state, payload) {
        state.isLoading = payload;
    }
}

export const actions = {
    async getWorkAreaBySlug({ commit }, slug) {
        console.log(slug);
        let postData = await import('../content/work-area/' + slug + '.json');
        commit('setCurrentWorkArea', postData);
        commit('setLoading', false);
    }
}
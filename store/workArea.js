export const state = () => ({
    currentWorkArea: {},
    caseStudies: {},
    isLoading: true
})

export const mutations = {
    setCurrentWorkArea(state, payload) {
        state.currentWorkArea = payload;
    },
    setCaseStudies(state, payload) {
        state.caseStudies = payload;
    },
    setLoading(state, payload) {
        state.isLoading = payload;
    }
}

export const actions = {
    async getCaseStudies({commit}) {
        // Use webpack's context to get all files from a folder
        const context = require.context('~/content/case-study/', false, /\.json$/)
        const workAreas = context.keys().map(key => ({
            ...context(key),
            slug: `${key.replace('.json', '').replace('./', '')}`
        }));

        commit('setCaseStudies', caseStudies.map(caseStudy => ({
            ...caseStudy,
            slug: slugify(caseStudy.title)
        })));
    },

    async getWorkAreaBySlug({ commit }, slug) {
        let postData = await import('../content/work-area/' + slug + '.json');
        commit('setCurrentWorkArea', postData);
        commit('setLoading', false);
    }
}
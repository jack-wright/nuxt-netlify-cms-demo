import { slugify } from '../utilities/utilities'

export const state = () => ({
    collection: [],
    isLoading: true
})

export const mutations = {
    setCollection(state, payload) {
        state.collection = payload;
    },
    setLoading(state, payload) {
        state.isLoading = payload;
    }
}

export const actions = {
    async getByWorkArea({commit}, slug) {
        const context = require.context('~/content/case-study/', false, /\.json$/)
        const caseStudies = context.keys().map(key => ({
            ...context(key),
            slug: `${key.replace('.json', '').replace('./', '')}`
        }))
        .filter(caseStudy => slugify(caseStudy['work-area']) === slug)

        commit('setCollection', caseStudies)
        commit('setLoading', false)
    }
}
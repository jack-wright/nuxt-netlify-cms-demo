import { slugify } from '../utilities/utilities'

export const state = () => ({
    workAreas: []
})

export const mutations = {
    setWorkAreas(state, payload) {
        state.workAreas = payload;
    }
}

export const actions = {
    async getWorkAreas({ commit }) {
        // Use webpack's context to get all files from a folder
        const context = require.context('~/content/work-area/', false, /\.json$/)
        const workAreas = context.keys().map(key => ({
            ...context(key),
            slug: `${key.replace('.json', '').replace('./', '')}`
        }));

        commit('setWorkAreas', workAreas.map(workArea => ({
            ...workArea,
            slug: slugify(workArea.title)
        })));
    }
}
var requireContext = require('require-context');
require('dotenv').config();

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'nuxt-demo',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    modules: ['@nuxtjs/dotenv', '@nuxtjs/markdownit'],
    markdownit: {
        injected: true
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
                config.module.rules.push({
                    test: /(\.vue|\.js)$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    exclude: /.nuxt/
                });
            }
            config.node = {
                fs: 'empty'
            }
        }
    },
    generate: {
        routes: () => {
            let routes = [],
                areaContext = requireContext('../../content/work-area', false, /\.json$/),
                areas = areaContext.keys().map(key => ({
                    payload: {
                        slug: `work/${key.replace('.json', '')}`
                    },
                    route: `work/${key.replace('.json', '')}`
                })),
                caseContext = requireContext('../../content/case-study', false, /\.json$/),
                caseStudies = caseContext.keys().map(key => ({
                    /**
                     * We need to make 'area-1' dynamically generated rather than statically added
                     */
                    payload: {
                        slug: `work/area-1/${key.replace('.json', '')}`
                    },
                    route: `work/area-1/${key.replace('.json', '')}`
                }));

            return routes.concat(areas, caseStudies);
        }
    }
}
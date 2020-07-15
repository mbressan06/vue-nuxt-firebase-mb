import enviroment from './enviroments.json';

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          production: enviroment.production,
          development: enviroment.development
        },
        customEnv: false,
        onFirebaseHosting: false,
        services: {
          firestore: {
            memoryOnly: false // default
          },
          functions: {
            location: 'us-central', // Default
            emulatorPort: 12345
          },
          storage: true,
          realtimeDb: true
        }
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

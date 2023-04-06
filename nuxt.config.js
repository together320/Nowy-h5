export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, viewport-fit=cover; initial-scale=1.0, maximum-scale=1.0, user-scalable=0'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
    ],
    script: [
      {
        src: "https://res.wx.qq.com/open/js/jweixin-1.2.0.js",
        body: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vant/lib/index.css',
    '@/static/css/gjzq.css',
    { src: '@/static/css/main.css', lang: 'css' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vant',
    '@/plugins/router',
    '@/plugins/axios',
    { src: '@/plugins/calendar', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // You will need to add this:
   server: {
     host: '172.23.11.45',
     port: '3000' // optional
   },

  features:{
    transitions: false
  },
  loading: {
    color: '#287EF1',
    height: '2px'
  },
  /*
   ** Runtime Config
   */
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASEURL
    }
  },
  router: {
    base: process.env.BASE
  },
  generate:{
    dir:process.env.DIR
  }
}

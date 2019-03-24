import Vue from 'vue'
import VueRouter from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueJquery from 'vue-jquery'
import VModal from 'vue-js-modal'

import App from './App.vue'
import RouteNames from './routeNames.js'
import store from './store.js'
import router from './router.js'
import './bootstrap.js'

// import SuiVue from 'semantic-ui-vue'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VueJquery)
Vue.use(VModal)
// Vue.use(SuiVue)

Vue.prototype.$routeNames = RouteNames;

import './styles/styles.scss'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

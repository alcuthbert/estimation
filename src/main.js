import Vue from 'vue'
import VueRouter from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import RouteNames from './routeNames.js'
import store from './store.js'
import router from './router.js'
import i18n from './configs/i18n.js'
import './configs/bootstrap.js'
import './configs/fontAwesome.js'
import './configs/filters.js'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Vue.prototype.$routeNames = RouteNames;

import './styles/styles.scss'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import RouteNames from './routes'
import store from './store.js'
import router from './router.js'
import './bootstrap.js'

// import SuiVue from 'semantic-ui-vue'
// import VueJQuery from 'vue-jquery';

import App from './App.vue'

// Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
// Vue.use(SuiVue)
// Vue.use(VueJQuery)

Vue.prototype.$routeNames = RouteNames;

import './styles/styles.scss'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

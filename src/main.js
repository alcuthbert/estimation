import Vue from 'vue'
import VueRouter from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate';
import VueMoment from 'vue-moment';

import App from './App.vue'
import RouteNames from './routeNames.js'
import store from './store/store.js'
import router from './router.js'
import i18n from './configs/i18n/index.js'
import FlagIcon from 'vue-flag-icon'
import Toaster from 'v-toaster'
import './configs/bootstrap.js'
import './configs/fontAwesome.js'
import './configs/filters.js'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate, {
	inject: true,
	fieldsBagName: 'veeFields'
})
Vue.use(FlagIcon)
Vue.use(Toaster)
Vue.use(VueMoment)

Vue.prototype.$routeNames = RouteNames;

import 'v-toaster/dist/v-toaster.css'
import './styles/styles.scss'

Vue.config.productionTip = false

new Vue({
	store,
	router,
	i18n,
	render: h => h(App),
}).$mount('#app')

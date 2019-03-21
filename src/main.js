import Vue from 'vue'
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import RouteNames from './routes'
import store from './store.js'
// import router from './router.js'

// import SuiVue from 'semantic-ui-vue'
// import VueJQuery from 'vue-jquery';

import App from './App.vue'

import Home from './components/Home.vue'
import ChangeRequests from './components/ChangeRequests.vue'
import Login from './components/Login.vue'
import NotFound from './components/NotFound.vue'

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
// Vue.use(SuiVue)
// Vue.use(VueJQuery)

Vue.prototype.$routeNames = RouteNames;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: RouteNames.home,
      component: Home
    },
    {
      path: '/change-requests',
      name: RouteNames.changeRequests,
      component: ChangeRequests
    },
    {
      path: '/login',
      name: RouteNames.login,
      component: Login
    },
    {
      path: '/not-found',
      name: RouteNames.notFound,
      component: NotFound
    },
    {
      // will match everything
      path: '*',
      redirect: {name: RouteNames.notFound}
    }
  ]
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

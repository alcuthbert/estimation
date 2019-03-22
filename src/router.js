// import Vue from 'vue'
import VueRouter from 'vue-router';
import RouteNames from './routes'

import Home from './components/Home.vue'
import ChangeRequests from './components/ChangeRequests.vue'
import NotFound from './components/NotFound.vue'
import Profile from './components/Profile.vue'

// Vue.use(VueRouter)

export default new VueRouter({
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
        path: '/not-found',
        name: RouteNames.notFound,
        component: NotFound
      },
      {
        path: '/profile',
        name: RouteNames.profile,
        component: Profile 
      },
      {
        // will match everything
        path: '*',
        redirect: {name: RouteNames.notFound}
      }
    ]
  })


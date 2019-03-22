import VueRouter from 'vue-router';
import RouteNames from './routeNames.js'

import Home from './components/Home.vue'
import ChangeRequests from './components/ChangeRequests.vue'
import ChangeRequest from './components/ChangeRequest.vue'
import NotFound from './components/NotFound.vue'
import Profile from './components/Profile.vue'

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
        component: ChangeRequests,
        meta: {
            requiresAuth: true
        }
      },
      {
        path: '/change-requests/:crId',
        name: RouteNames.changeRequest,
        component: ChangeRequest,
        props: true,
        meta: {
            requiresAuth: true
        }
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


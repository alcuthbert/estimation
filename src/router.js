import VueRouter from 'vue-router';
import RouteNames from './routeNames.js'

import AuthService from './common/services/AuthService.js'

import Home from './components/Home.vue'
import ChangeRequests from './components/ChangeRequests.vue'
import ChangeRequest from './components/ChangeRequest.vue'
import NotFound from './components/NotFound.vue'
import Profile from './components/Profile.vue'
import Login from './components/Login.vue'
import Users from './components/Users.vue'

const router = new VueRouter({
    linkExactActiveClass: 'active',
    routes: [
      {
        path: '/',
        name: RouteNames.home,
        component: Home,
        meta: {
            requiresAuth: true
        }
      },
      {
        path: '/login',
        name: RouteNames.login,
        component: Login
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
        component: Profile,
        meta: {
            requiresAuth: true
        }
      },
      {
        path: '/users',
        name: RouteNames.users,
        component: Users,
        meta: {
            requiresAuth: true
        }
      },
      {
        // will match everything
        path: '*',
        redirect: {name: RouteNames.notFound}
      }
    ]
  });

  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(route => route.meta.requiresAuth);

    if (requiresAuth && !AuthService.isLoggedIn()) {
      next({name: RouteNames.login});
    } else {
      next();
    }
  })

  export default router;


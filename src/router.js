import VueRouter from 'vue-router';
import RouteNames from './routeNames.js'

import AuthService from './common/services/AuthService.js'

import Home from './components/pages/Home.vue'
import ChangeRequests from './components/pages/ChangeRequests.vue'
import ChangeRequest from './components/pages/ChangeRequest.vue'
import NotFound from './components/pages/NotFound.vue'
import Profile from './components/pages/Profile.vue'
import Login from './components/pages/Login.vue'
import Users from './components/pages/Users.vue'
import Signup from './components/pages/Signup'

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
        path: '/signup',
        name: RouteNames.signup,
        component: Signup
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


import VueRouter from 'vue-router';
import RouteNames from './routes'

import Home from './components/Home.vue'
import ChangeRequests from './components/ChangeRequests.vue'
import Login from './components/Login.vue'
import NotFound from './components/NotFound.vue'

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


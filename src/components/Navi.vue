<template>
    <b-navbar toggleable="lg" type="dark" variant="primary" v-if="isVisible">
        <b-navbar-brand href="#" :to="{name: $routeNames.home}">
            Estimation
            <font-awesome-icon icon="bolt" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item href="#" :to="{name: $routeNames.changeRequests}" :exact=true >Change Requests</b-nav-item>
            </b-navbar-nav>

            <user-actions></user-actions>
        </b-collapse>
    </b-navbar>
</template>

<script>

import UserActions from './helpers/UserActions.vue'
import AuthService from './../common/services/AuthService.js'

export default {
    name: 'app',
    computed: {
        isVisible() {
            console.log("computed isLoggedIn", AuthService.isLoggedIn());
            return AuthService.isLoggedIn();
        }
    },
    components: {
        UserActions
    }
}

</script>
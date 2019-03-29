<template>
    <b-navbar-nav class="ml-auto">
        <lang></lang>

        <b-nav-item-dropdown right>
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item href="#" :to="{name: $routeNames.profile}">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
    </b-navbar-nav>
</template>

<script>
import Lang from './Lang.vue'
import AuthService from './../../common/services/AuthService.js'
import RouteNames from './../../routeNames.js'

export default {
    methods: {
        logout() {
            AuthService.logout();
            this.$router.push({name: RouteNames.login});
        }
    },
    computed: {
        isLoggedIn() {
            return AuthService.isLoggedIn();
        }
    },
    components: {
        Lang
    }
}
</script>
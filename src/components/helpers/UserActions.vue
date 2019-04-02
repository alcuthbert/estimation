<template>
    <b-navbar-nav class="ml-auto">
        <lang></lang>

        <b-nav-item-dropdown right>
            <template slot="button-content"><em>{{getUserName()}}</em></template>
            <b-dropdown-item href="#" :to="{name: $routeNames.profile}">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
    </b-navbar-nav>
</template>

<script>
import Lang from './Lang.vue'
import AuthService from './../../common/services/AuthService.js'
import RouteNames from './../../routeNames.js'
import {MUTATION_REMOVE_IDENTITY} from './../../mutationTypes.js'

export default {
    methods: {
        logout() {
            AuthService.logout();
            this.$store.commit(MUTATION_REMOVE_IDENTITY);
            this.$router.push({name: RouteNames.login});
        },
        getUserName() {
            // return AuthService.getUser() || 'User';
            return (this.$store.state.identity !== null) ? this.$store.state.identity.name : 'User';
        }
    },
    components: {
        Lang
    }
}
</script>
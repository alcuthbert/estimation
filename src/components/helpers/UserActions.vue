<template>
    <b-navbar-nav class="ml-auto">
        <lang-nav></lang-nav>

        <b-nav-item-dropdown right>
            <template slot="button-content">
                <em>{{getUserName() | ucfirst}}</em>
            </template>
            <b-dropdown-item href="#" :to="{name: $routeNames.profile}">
                {{$t("message.profile") | ucfirst}}
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">
                {{$t("message.logout") | ucfirst}}
            </b-dropdown-item>
        </b-nav-item-dropdown>
    </b-navbar-nav>
</template>

<script>
import LangNav from './LangNav'
import AuthService from './../../common/services/AuthService.js'
import RouteNames from './../../routeNames.js'
import {MUTATION_REMOVE_IDENTITY} from './../../mutationTypes.js'

export default {
    methods: {
        logout() {
            AuthService.logout()
            this.$store.commit(MUTATION_REMOVE_IDENTITY)
            this.$router.push({name: RouteNames.login})
        },
        getUserName() {
            // return AuthService.getUser() || 'User';
            return (this.$store.state.identity !== null) ? this.$store.state.identity.name : 'User'
        },
    },
    components: {
        LangNav
    }
}
</script>
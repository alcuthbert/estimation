<template>
    <b-navbar toggleable="lg" type="dark" variant="primary" v-show="this.isLoggedIn">
        <b-navbar-brand href="#" :to="{name: $routeNames.home}">
            Estimation
            <font-awesome-icon icon="bolt" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item href="#" :to="{name: $routeNames.changeRequests}" :exact=true >
                    {{$t("message['change requests']") | ucfirst}}
                </b-nav-item>
            </b-navbar-nav>

            <user-actions></user-actions>
        </b-collapse>
    </b-navbar>
</template>

<script>

import UserActions from './UserActions.vue'
import {IS_LOGGED_IN} from '@/store/getter-types'
import { mapGetters } from 'vuex';

export default {
    name: 'app',
    computed: {
        ...mapGetters({
            isLoggedIn: IS_LOGGED_IN
        })
    },
    components: {
        UserActions
    }
}

</script>
<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Estimation</b-navbar-brand>

            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="#" :to="{name: $routeNames.home}" :exact=true >Home</b-nav-item>
                    <b-nav-item href="#" :to="{name: $routeNames.login}" :exact=true >Login</b-nav-item>
                    <b-nav-item href="#" :to="{name: $routeNames.changeRequests}" :exact=true >Change Requests</b-nav-item>
                </b-navbar-nav>

                <user-actions></user-actions>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

import UserActions from './helpers/UserActions.vue'

export default {
  name: 'app',
  components: {
    UserActions
  }
}

</script>
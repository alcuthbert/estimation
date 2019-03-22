<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Estimation</b-navbar-brand>

            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="#" :to="{name: $routeNames.home}" :exact=true >Home</b-nav-item>
                    <b-nav-item href="#" :to="{name: $routeNames.changeRequests}" :exact=true >Change Requests</b-nav-item>
                </b-navbar-nav>

                <login></login>

                <!-- Right aligned nav items -->
                <!-- <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav> -->
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

import Login from './helpers/Login.vue'

export default {
  name: 'app',
  components: {
    Login
  }
}

</script>
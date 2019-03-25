<template>
    <b-navbar-nav class="ml-auto">
        <lang></lang>

        <b-nav-item-dropdown right>
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item href="#" :to="{name: $routeNames.profile}">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
    </b-navbar-nav>
</template>

<script>
import Lang from './Lang.vue'

export default {
    components: {
        Lang
    }
}
</script>
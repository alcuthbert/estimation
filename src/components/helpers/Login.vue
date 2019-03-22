<template>
    <b-navbar-nav class="ml-auto">
        <lang></lang>

        <b-form inline>
            <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Username" />
            <b-input type="password" id="textPassword" aria-describedby="passwordHelpBlock" placeholder="Pass" />
            <b-button variant="primary">Login</b-button>
        </b-form>

        <b-nav-item-dropdown right>
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item href="#" :to="{name: $routeNames.profile}">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
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

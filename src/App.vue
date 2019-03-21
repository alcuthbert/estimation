<template>
  <div id="app">

  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Estimation</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#" :to="{name: $routeNames.home}" :exact=true >Home</b-nav-item>
        <b-nav-item href="#" :to="{name: $routeNames.changeRequests}" :exact=true >changeRequests</b-nav-item>
        <b-nav-item href="#" :to="{name: $routeNames.notFound}" :exact=true >notFound</b-nav-item>
        <b-nav-item href="#" :to="{name: $routeNames.login}" :exact=true  >Login</b-nav-item>
        <b-nav-item-dropdown text="Dropdown" right>
          <b-dropdown-item href="#" :to="{name: $routeNames.login}" :exact=true >Login</b-dropdown-item>
          <b-dropdown-item href="#" :to="{name: $routeNames.notFound}" :exact=true >notFound</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
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

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content"><em>User</em></template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="container-fluid">
    <router-view></router-view>
  </div>

  </div>
</template>

<script>

// import Vue from 'vue';
// import VueRouter from 'vue-router';

// export default {
//   name: 'app',
//   components: {
//     // HelloWorld,
//     // Home,
//     VueRouter
//   }
// }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

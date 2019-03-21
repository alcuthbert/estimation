<template>
    <div class="ui container">
      <h1>CRs</h1>
      <vuetable ref="vuetable"
        api-url="https://vuetable.ratiw.net/api/users"
        :fields="['name', 'email', 'birthdate']"
      ></vuetable>
    </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
// import UsersResource from './../resources/users.js'

export default {
    components: {
        Vuetable
    }
}
</script>

<template>
    <div class="ui container">
      <h1>CRs</h1>
      <vuetable ref="vuetable"
        :api-url="usersApi"
        :fields="['name', 'email', 'birthdate']"
      ></vuetable>
    </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
// import axios from 'axios'

export default {
    // data() {
    //   return {
    //     users: null
    //   }
    // },
    // mounted() {
    //   axios
    //     .get('/api/users')
    //     .then(response => (this.users = response.data))
    // }
    computed: {
      usersApi() {
        return 'http://localhost:8080/api/users'
      }
    },
    components: {
      Vuetable
    },
}
</script>

<template>
    <div class="ui container">
      <h1>CRs</h1>
      <vuetable ref="vuetable"
        :api-url="changeRequestApi"
        :fields="fields"
      ></vuetable>
    </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import CustomActions from './helpers/CustomActions.vue'

Vue.component('custom-actions', CustomActions)

export default {
    data() {
      return {
        fields: [
          {name: 'id', title: 'id'},
          {name: 'name', title: 'name'},
          {name: 'status', title: 'status'},
          {name: 'jira_link', title: 'jira_link'},
          {name: 'owner', title: 'owner'},
          {name: 'version', title: 'version'},
          {name: 'created', title: 'created'},
          {name: 'project', title: 'project'},
          {
            name: '__component:custom-actions',
            title: 'Actions',
            // titleClass: 'center aligned',
            // dataClass: 'center aligned'
          }
        ]
      }
    },
    computed: {
      changeRequestApi() {
        return 'http://localhost:8080/api/change-requests'
      },
    },
    components: {
      Vuetable
    },
}
</script>

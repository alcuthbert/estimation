<template>
    <div class="ui container">
      <h1>CRs</h1>
      <vuetable ref="vuetable"
        :api-url="changeRequestApi"
        :fields="changeRequestFields"
      ></vuetable>
    </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
    computed: {
      changeRequestApi() {
        return 'http://localhost:8080/api/change-requests'
      },
      changeRequestFields() {
        return ['id', 'name', 'status', 'jira_link', 'owner', 'version','created', 'project'];
      }
    },
    components: {
      Vuetable
    },
}
</script>

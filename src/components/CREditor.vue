<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group label="Name" label-for="name">
        <b-form-input id="name" type="text" v-model="item.name" required />
      </b-form-group>

      <b-form-group label="Status" label-for="status">
        <b-form-select id="status" required v-model="item.status" :options="statuses" />
      </b-form-group>

      <b-form-group label="Owner" label-for="owner">
        <b-form-select id="owner" required v-model="item.owner" :options="owners" />
      </b-form-group>

      <b-form-group label="Version" label-for="version">
        <b-form-input id="version" type="text" v-model="item.version" />
      </b-form-group>

      <b-form-group label="Jira" label-for="jira_link">
        <b-form-input id="jira_link" type="text" v-model="item.jira_link" />
      </b-form-group>

      <b-form-group label="Project" label-for="project">
        <b-form-input id="project" type="text" v-model="item.project" />
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="secondary">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
import CRService from './../common/services/ChangeRequests.js'

export default {
    data() {
      return {
        statuses: [
          {text: 'Select One', value: null},
          {text: 'Open', value: 'open'},
          {text: 'Closed', value: 'closed'},
          {text: 'Approved', value: 'approved'},
        ],
        owners: [
          {text: 'Select One', value: null},
          {text: 'Noelia O\'Kon', value: 1},
          {text: 'Edwin Beier', value: 2},
        ]
      }
    },
    props: {
      item: Object
    },
    methods: {
      onReset() {
        this.$root.$emit('bv::hide::modal', 'cr-editor')
      },
      onSubmit() {
        CRService
          .save(this.item)
          .then((response) => {
            this.$emit('cr-saved', response.data)
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log('cr save error', error)
          })

        this.$root.$emit('bv::hide::modal', 'cr-editor')
      }
    }
}
</script>

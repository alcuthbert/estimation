<template>
  <div>
    <b-form>
      <b-form-group label="Name" label-for="name">
        <b-form-input id="name" type="text" v-model="cr.name" required />
      </b-form-group>

      <b-form-group label="Status" label-for="status">
        <b-form-select id="status" required v-model="cr.status" :options="statuses" />
      </b-form-group>

      <b-form-group label="Owner" label-for="owner">
        <b-form-select id="owner" required v-model="cr.owner" :options="owners" />
      </b-form-group>

      <b-form-group label="Version" label-for="version">
        <b-form-input id="version" type="text" v-model="cr.version" />
      </b-form-group>

      <b-form-group label="Jira" label-for="jira_link">
        <b-form-input id="jira_link" type="text" v-model="cr.jira_link" />
      </b-form-group>

      <b-form-group label="Project" label-for="project">
        <b-form-input id="project" type="text" v-model="cr.project" />
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
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
        ],
      }
    },
    props: {
      cr: Object
    },
    methods: {
      close() {
        this.$emit('close');
      }
    },
}
</script>

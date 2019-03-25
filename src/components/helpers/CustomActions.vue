<template>
    <div class="custom-actions">
      <b-button-group>
        <router-link :to="{name: $routeNames.changeRequest, params: {crId: rowData.id}}">
            <button class="btn btn-primary">
              <font-awesome-icon icon="edit" />
            </button>
        </router-link>
        <button class="btn btn-primary" @click="itemAction('delete-item', rowData, rowIndex)">
          <font-awesome-icon icon="trash" />
        </button>
      </b-button-group>
    </div>
  </template>

  <script>
  export default {
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      }
    },
    methods: {
      itemAction (action, data, index) {
        console.log('custom-actions: ' + action, data.name, index)
      }
    }
  }
  </script>

  <style scoped>
    .custom-actions button.ui.button {
      padding: 8px 8px;
    }
    .custom-actions button.ui.button > i.icon {
      margin: auto !important;
    }
  </style>
<template>
    <div class="custom-actions">
        <router-link class="btn" tag="button" :to="{name: $routeNames.changeRequest, params: { crId: rowData.id }}" :exact=true>
            <font-awesome-icon icon="search" />
        </router-link>
        <!-- <button class="ui basic button" :to="{name: $routeNames.changeRequest, params: { crId: rowData.id }}" @click="itemAction('view-item', rowData, rowIndex)"><i class="zoom icon"></i></button> -->
        <button class="btn" @click="itemAction('edit-item', rowData, rowIndex)">
          <font-awesome-icon icon="edit" />
        </button>
        <button class="btn" @click="itemAction('delete-item', rowData, rowIndex)">
          <font-awesome-icon icon="trash" />
        </button>
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
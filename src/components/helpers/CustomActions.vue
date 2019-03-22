<template>
    <div class="custom-actions">
        <router-link class="ui basic button" tag="button" :to="{name: $routeNames.changeRequest, params: { crId: rowData.id }}" :exact=true>
            <i class="zoom icon"></i>
        </router-link>
        <!-- <button class="ui basic button" :to="{name: $routeNames.changeRequest, params: { crId: rowData.id }}" @click="itemAction('view-item', rowData, rowIndex)"><i class="zoom icon"></i></button> -->
        <button class="ui basic button" @click="itemAction('edit-item', rowData, rowIndex)"><i class="edit icon"></i></button>
        <button class="ui basic button" @click="itemAction('delete-item', rowData, rowIndex)"><i class="delete icon"></i></button>
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
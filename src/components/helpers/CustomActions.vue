<template>
    <div class="custom-actions">
      <b-button-group>
        <router-link :to="{name: $routeNames.changeRequest, params: {crId: rowData.id}}">
         <b-button variant="primary">
            <font-awesome-icon icon="search" />
          </b-button>
        </router-link>

        <b-button variant="warning" v-b-modal.cr-editor>
          <font-awesome-icon icon="edit" />
        </b-button>

        <b-button variant="danger" @click="itemAction('delete-item', rowData, rowIndex)">
          <font-awesome-icon icon="trash" />
        </b-button>
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
      // itemAction (action, data, index) {
      // console.log('custom-actions: ' + action, data, index)
      // }
      itemAction () {
        
      },
      showModal() {
        this.$refs.myModalRef.show()
      },
      hideModal() {
        this.$refs.myModalRef.hide()
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
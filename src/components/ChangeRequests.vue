<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 mx-auto">
      <div class="card my-4">
        <h5 class="card-header">Change requests</h5>
        <div class="card-body">
         
            <b-button-group class="mb-3">
              <b-button variant="success" @click="show">
                Create new
                <font-awesome-icon icon="plus-square" />
              </b-button>
            </b-button-group>
      
          <vuetable ref="vuetable"
            :api-url="changeRequestApi"
            :fields="fields"
          ></vuetable>

        </div>
      </div>
    </div>

    <modal name="cr-editor">
      <c-r-editor foo="bar" :cr="{name: 'ololo'}" @close="closeModal" />
    </modal>
  </div>  
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import CustomActions from './helpers/CustomActions.vue'
import CREditor from './CREditor.vue'

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
        ],
      }
    },
    computed: {
      changeRequestApi() {
        return '/api/change-requests'
      },
    },
    methods: {
      closeModal() {
        console.log("close modal");
      },
      show() {
        this.$modal.show('cr-editor');
      },
      hide() {
        this.$modal.hide('cr-editor');
      }
    },
    components: {
      Vuetable,
      CREditor
    },
}
</script>

<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 mx-auto">
      <div class="card my-4">
        <h5 class="card-header">Change requests</h5>
        <div class="card-body">
            <b-button-group class="mb-3">
              <b-button variant="success" v-b-modal.cr-editor>
                Create new
                <font-awesome-icon icon="plus-square" />
              </b-button>
            </b-button-group>
      
          <b-table bordered hover
                  selectable
                  select-mode="single"
                  selectedVariant="warning"
                  :busy="isBusy"
                  :items="getItems"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  @filtered="onFiltered">

            <div slot="table-busy" class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>

            <template slot="actions" slot-scope="row">  
              <b-button-group>
                <router-link :to="{name: $routeNames.changeRequest, params: {crId: row.item.id}}">
                <b-button variant="primary">
                    <font-awesome-icon icon="search" />
                  </b-button>
                </router-link>

                <b-button variant="warning" v-b-modal.cr-editor>
                  <font-awesome-icon icon="edit" />
                </b-button>

                <b-button variant="danger">
                  <font-awesome-icon icon="trash" />
                </b-button>

                <b-button @click="row.toggleDetails" variant="warning">
                  {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
              </b-button-group>
            </template>

            <template slot="row-details" slot-scope="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
          </b-table>

          <b-row>
            <b-col md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>

    <b-modal id="cr-editor" title="CR Editor">
      <c-r-editor foo="bar" :cr="cr" />
    </b-modal>
  </div>  
</template>

<script>
import Vue from 'vue'
import CustomActions from './helpers/CustomActions.vue'
import CREditor from './CREditor.vue'
import axios from "axios";

Vue.component('custom-actions', CustomActions)

export default {
    data() {
      return {
        isBusy: false,
        items: [],
        fields: [
          {key: 'id', title: 'id', sortable: true},
          {key: 'name', title: 'name', sortable: true},
          {key: 'status', title: 'status', sortable: true},
          {key: 'jira_link', title: 'jira_link', sortable: false},
          {key: 'owner', title: 'owner', sortable: true},
          {key: 'version', title: 'version', sortable: true},
          {key: 'created', title: 'created', sortable: true},
          {key: 'project', title: 'project', sortable: true, _showDetails: true},
          {key: 'actions', title: 'actions', sortable: false},
          // {
          //   name: '__component:custom-actions',
          //   title: 'Actions',
          // }
        ],
        currentPage: 1,
        perPage: 2,
        totalRows: 0,
        pageOptions: [5, 10, 15],
        // sortBy: null,
        // sortDesc: false,
        // sortDirection: 'asc',
        filter: null,
        // modalInfo: { title: '', content: '' },
        cr: {name: 'trololo'}
      }
    },
    computed: {

    },
    methods: {
      getItems() {
        this.isBusy = true;
        
        return axios.get("/api/change-requests").then((response) => {
          this.isBusy = false;

          this.items = response.data.data;
          this.totalRows = this.items.length;

          return this.items;
        }).catch(() => {
          this.isBusy = false;

          return [];
        })
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    components: {
      CREditor
    },
}
</script>

<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 mx-auto">
      <div class="card my-4">
        <h5 class="card-header">Change requests</h5>
        <div class="card-body">
          <b-button-group class="mb-3">
            <b-button variant="primary" v-b-modal.cr-editor @click="selectRowItem()">
              <font-awesome-icon icon="plus-square" />
              Create
            </b-button>
            <b-button variant="secondary" @click="getItems()">
              <font-awesome-icon icon="sync" />
              Refresh
            </b-button>
          </b-button-group>

          <b-row>
            <b-col md="4">
              <b-form-group label="Filter">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary" :disabled="!filter" @click="filter = ''">Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group label="Sort">
                <b-input-group>
                  <b-form-select v-model="sortBy" :options="sortOptions"></b-form-select>
                  <b-form-select v-model="sortDesc">
                    <option :value="false">Asc</option>
                    <option :value="true">Desc</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group label="Per page">
                <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
      
          <b-table bordered hover
                  selectable
                  select-mode="single"
                  selectedVariant="warning"
                  :busy="isBusy"
                  :items="items"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :filter="filter"
                  @filtered="onFiltered">

            <div slot="table-busy" class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>

            <template slot="details" slot-scope="row">
              <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails" variant="success">
                {{ row.detailsShowing ? 'Hide' : 'Show'}} details
              </b-form-checkbox>
            </template>

            <template slot="actions" slot-scope="row">  
              <b-button-group>
                <router-link :to="{name: $routeNames.changeRequest, params: {crId: row.item.id}}">
                  <b-button variant="primary">
                    <font-awesome-icon icon="search" />
                  </b-button>
                </router-link>

                <b-button variant="warning" v-b-modal.cr-editor @click="selectRowItem(row.item)">
                  <font-awesome-icon icon="edit" />
                </b-button>

                <b-button variant="danger">
                  <font-awesome-icon icon="trash" />
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

    <b-modal id="cr-editor" ref="cr-editor" header-bg-variant="default" title="CR Editor" scrollable hide-footer>
      <c-r-editor :item="itemToEdit" @cr-saved="onCrSaved" />
    </b-modal>

    <!-- <b-modal id="delete-modal" ref="delete-modal">Hello From My delete Modal!</b-modal> -->
  </div>  
</template>

<script>
import Vue from 'vue'
import CREditor from './CREditor.vue'
import CRs from './../common/services/ChangeRequests.js'

export default {
    data() {
      return {
        isBusy: false,
        item: null,
        items: [],
        fields: [
          {key: 'details', title: 'details', sortable: false},
          {key: 'id', title: 'id', sortable: true},
          {key: 'name', title: 'name', sortable: true},
          {key: 'status', title: 'status', sortable: true},
          {key: 'jira_link', title: 'jira_link', sortable: false},
          {key: 'owner', title: 'owner', sortable: true},
          {key: 'version', title: 'version', sortable: true},
          {key: 'created', title: 'created', sortable: true},
          {key: 'project', title: 'project', sortable: true},
          {key: 'actions', title: 'actions', sortable: false},
        ],
        currentPage: 1,
        perPage: 5,
        pageOptions: [1, 5, 10, 15, 20],
        sortBy: 'id',
        sortOptions: ['id', 'name', 'status', 'owner', 'version', 'created', 'project'],
        sortDesc: false,
        totalRows: 0,
        filter: null
      }
    },
    mounted() {
      this.getItems()
    },
    methods: {
      getItems() {
        this.isBusy = true

        CRs.getItems()
          .then((response) => {
            this.isBusy = false

            this.items = response.data
            this.totalRows = this.items.length
          })
          .catch(() => {
            this.isBusy = false
            this.items = []
          })
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      selectRowItem(item = null) {
        this.item = (item !== null) ? Vue.util.extend({}, item) : null
      },
      onCrSaved(item) {
        const found = this.items.find(el => el.id === item.id)

        if (found) {
          Vue.util.extend(found, item)
        } else {
          this.items.push(item)
        }
      }
    },
    computed: {
      itemToEdit() {
        if (this.item === null) {
          return {
            id: null,
            name: '',
            status: null,
            jira_link: '',
            owner: null,
            version: '',
            project: '',
            created: null
          }
        }

        return this.item
      }
    },
    components: {
      CREditor
    }
}
</script>

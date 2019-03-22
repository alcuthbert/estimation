<template>
    <div>
        <b-card no-body style="max-width: 20rem;">
            <h4 slot="header">CR Card</h4>

            <b-card-body>
                <b-card-title>{{ '#' + cr.id + ': ' + cr.name }} </b-card-title>
                <b-card-sub-title class="mb-2">{{cr.status}}</b-card-sub-title>
                <b-card-text>
                    Some quick example text to build on the card title and make up the bulk of the card's
                    content.
                </b-card-text>
            </b-card-body>

            <b-list-group flush>
                <b-list-group-item>{{cr.version}}</b-list-group-item>
                <b-list-group-item>{{cr.owner}}</b-list-group-item>
                <b-list-group-item>{{cr.created}}</b-list-group-item>
            </b-list-group>

            <b-list-group flush>
                <b-list-group-item>Assignee 1</b-list-group-item>
                <b-list-group-item>Assignee 2</b-list-group-item>
            </b-list-group>

            <b-card-body>
                <a href="#" class="card-link">Jira Url</a>
            </b-card-body>
        </b-card>

        <div class="ui container">
            <h1>Tasks</h1>
            <vuetable ref="vuetable"
                :data="tasks"
                :fields="['id', 'name']"
            ></vuetable>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Vuetable from 'vuetable-2/src/components/Vuetable'
// import crResource from './../resources/cr.js'

export default {
    data() {
        return {
            cr: {},
            tasks: []
        }
    },
    props: {
        crId: String
    },
    computed: {
        
    },
    mounted() {
        // this.cr = crResource.getCR(this.crId);

        axios
            .get('/api/change-requests')
            .then(response => (
                this.cr = response.data.data.filter( cr => {
                    return cr.id == this.crId
                })[0]
            ))

        axios
            .get('/api/tasks')
            .then(response => {
                this.tasks = response.data.data.filter( task => {
                    return task.cr_id == this.crId
                })
            })
    },
    components: {
      Vuetable
    },
}

</script>

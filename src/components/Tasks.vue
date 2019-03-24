<template>
    <div class="ui container">
        <h1>Tasks {{crId}}</h1>
        <vuetable ref="vuetable"
            :data="tasks"
            :fields="['id', 'name']"
        ></vuetable>
    </div>
</template>

<script>
import axios from 'axios'
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
    data() {
        return {
            tasks: []
        }
    },
    props: {
        crId: String
    },
    mounted() {
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
    }
}
</script>

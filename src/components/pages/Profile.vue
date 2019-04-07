<template>
    <div class="row m-3">
        <div class="col-sm-4 col-md-4 col-lg-4 mx-auto">
            <b-card no-body v-if="user">
                <h4 slot="header">My Profile</h4>

                <b-card-body>
                    <b-card-title>{{ '#' + user.id + ': ' + user.name }} </b-card-title>
                    <b-card-sub-title class="mb-2">Nick: {{user.nickname}}</b-card-sub-title>
                    <b-card-text>
                        Some quick example text to build on the card title and make up the bulk of the card's
                        content.
                    </b-card-text>
                </b-card-body>

                <b-list-group flush>
                    <b-list-group-item>Sex: {{user.gender}}</b-list-group-item>
                    <b-list-group-item>Birth date: {{user.birthdate}}</b-list-group-item>
                </b-list-group>
            </b-card>

            <b-card no-body v-else="">
                <h4 slot="header">My Profile</h4>

                <b-card-body>
                    <b-card-text>
                        There is no info for the user
                    </b-card-text>
                </b-card-body>
            </b-card>
        </div>

        <div class="col-sm-8 col-md-8 col-lg-8 mx-auto">
            <b-card no-body v-if="user">
                <h4 slot="header">My Tasks</h4>

                <b-card-body>
                    <tasks :cr-id="crId"></tasks>
                </b-card-body>
            </b-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Tasks from './../Tasks.vue'

export default {
    data() {
        return {
            userId: 1,
            crId: 2,
            user: null
        }
    },
    mounted() {
        axios
            .get('/api/users')
            .then(response => (
                this.user = response.data.data.filter( user => {
                    return user.id == this.userId
                })[0]
            ))
    },
    components: {
        Tasks
    }
}
</script>


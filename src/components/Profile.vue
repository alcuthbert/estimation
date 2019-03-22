<template>
    <b-card no-body style="max-width: 20rem;" v-if="user">
        <h4 slot="header">My Profile</h4>

        <b-card-body>
            <b-card-title>{{ '#' + user.id + ': ' + user.name }} </b-card-title>
            <b-card-sub-title class="mb-2">{{user.nickname}}</b-card-sub-title>
            <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
            </b-card-text>
        </b-card-body>

        <b-list-group flush>
            <b-list-group-item>{{user.gender}}</b-list-group-item>
            <b-list-group-item>{{user.birthdate}}</b-list-group-item>
        </b-list-group>
    </b-card>

    <b-card no-body style="max-width: 20rem;" v-else="">
        <h4 slot="header">My Profile</h4>

        <b-card-body>
            <b-card-text>
                There is no info for the user
            </b-card-text>
        </b-card-body>
    </b-card>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userId: 1,
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
}
</script>


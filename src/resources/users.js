import Repo from './repository.js'

// const url = '/users'

export default {
    get() {
        return Repo.get('/users')
    },
    getUser(userId) {
        return Repo.get(`/users/${userId}`)
    }
}
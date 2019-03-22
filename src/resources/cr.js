import axios from 'axios'

export default {
    getCR(id) {
        return axios
            .get('/api/change-requests')
            .then(response => (
                response.data.data.filter( cr => {
                    return cr.id == id
                })[0]
            ))
    }
}
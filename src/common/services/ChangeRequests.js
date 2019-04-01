import axios from 'axios';

export default {
    getItems() {
        return axios.get("/api/change-requests")
            .then((response) => response.data.data)
    }
}
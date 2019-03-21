import Axios from 'axios'

const baseUrl = 'http://localhost:8080/api'

export default Axios.create({
    baseUrl
})
import axios from 'axios';
import {API_URL} from './../../appConfig.js'

const url = `${API_URL}/users`;

export default {
    findByCredentials(name, password) {
        return axios.get(url, {
			params: {
				name: name,
				password: password
			}
		})
	},
	save(user) {
		return axios.post(url, user)
	},
	findById(id) {
		return axios.get(`${url}/${id}`)
	}
}
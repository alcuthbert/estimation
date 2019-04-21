import axios from 'axios';
import {API_URL} from '@/appConfig.js'
import { ROLE_ESTIMATOR } from '@/common/resources/roles'

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
	findEstimators() {
		return axios.get(url, {
			params: {
				role: ROLE_ESTIMATOR
			}
		})
	},
	save(user) {
		return axios.post(url, user)
	},
	findById(id) {
		return axios.get(`${url}/${id}`)
	},
	find() {
		return axios.get(url)
	}
}
import axios from 'axios';
import {API_URL} from '@/appConfig.js'

const url = `${API_URL}/estimations`

export default {
	getById(id) {
		return axios.get(`${url}/${id}`)
    },
    getBySubtaskId(subtaskId) {
		return axios.get(`${url}`, {
			params: {
				subtaskId: subtaskId
			}
		})
	},
	getItems() {
		return axios.get(`${url}`)
	},
	save(obj) {
		if (Object.keys(obj).includes('id') && obj.id) {
			return axios.put(`${url}/${obj.id}`, obj)
		} else {
			return axios.post(url, obj)
		}
	},
	delete(id) {
		return axios.delete(`${url}/${id}`)
	}
}
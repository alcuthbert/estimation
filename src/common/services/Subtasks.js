import axios from 'axios';
import {API_URL} from '@/appConfig.js'

const url = `${API_URL}/subtasks`

export default {
	getById(id) {
		return axios.get(`${url}/${id}`)
    },
    getByTaskId(taskId) {
		return axios.get(`${url}?_embed=estimations`, {
			params: {
				taskId: taskId
			}
		})
	},
	getItems() {
		return axios.get(`${url}?_embed=estimations`)
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
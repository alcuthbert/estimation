import axios from 'axios';
import {API_URL} from '@/appConfig.js'

const url = `${API_URL}/changeRequests`

export default {
	getApiUrl() {
		return url;
	},
	getById(id) {
		return axios.get(`${url}/${id}`)
	},
	getItems() {
		return axios.get(url + '?_embed=tasks')
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
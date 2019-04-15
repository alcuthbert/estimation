import axios from 'axios';
import {API_URL} from '@/appConfig.js'
import Tasks from './Tasks'

const url = `${API_URL}/changeRequests`

export default {
	getApiUrl() {
		return url;
	},
	getById(id) {
		return axios.get(`${url}/${id}`)
	},
	getItems() {
		return axios.get(url)
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
	},
	getTasks(id) {
		return axios.get(`${url}/${id}/tasks`)
	},
	saveTasks(id, tasks) {
		const promises = []

		tasks.forEach(task => {
			const promise = Tasks.save(task)

			promises.push(promise)
		});

		return axios.all(promises)
	}
}
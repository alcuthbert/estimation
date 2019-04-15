import axios from 'axios';
import {API_URL} from './../../appConfig.js'

const url = `${API_URL}/tasks`;

export default {
    findByCrId(id) {
        return axios.get(url, {
			params: {
				changeRequestId: id
			}
		})
	},
	findById(id) {
		return axios.get(`${url}/${id}`)
	},
	delete(id) {
		return axios.delete(`${url}/${id}`)
	},
    save(obj) {
		if (Object.keys(obj).includes('id') && obj.id) {
			return axios.put(`${url}/${obj.id}`, obj)
		} else {
			return axios.post(url, obj)
		}
	}
}
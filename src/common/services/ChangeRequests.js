import axios from 'axios';
import {API_URL} from './../../appConfig.js'

const url = `${API_URL}/change-requests`;

export default {
  getApiUrl() {
    return url;
  },
  getItems() {
    return axios.get(url);
  },
  save(obj) {
    if (Object.keys(obj).includes('id') && obj.id) {
      return axios.put(`${url}/${obj.id}`, obj);
    } else {
      return axios.post(url, obj);
    }
  },
  delete(id) {
    return axios.delete(`${url}/${id}`);
  }
}
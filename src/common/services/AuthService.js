import axios from 'axios';
import {API_URL} from './../../appConfig.js'

const url = `${API_URL}/users`;

export const token = 'user_token';

export default  {
	isLoggedIn() {
		return localStorage.getItem(token);
	},
	getToken() {
		return localStorage.getItem(token);
	},
	login(user) {
		return new Promise((resolve, reject) => {
			axios
				.get(url, {
					params: {
						name: user.username,
						password: user.password
					}
				})
				.then((response) => {
					if (response.data.length === 0) {
						reject({
							data: {},
							status: 401,
							statusText: "Not Authorized"
						})
					} else {
						localStorage.setItem(token, response.data[0].name)
						resolve(response)
					}
				})
				.catch((error) => {
					reject(error);
				})
		})
	},
	signup(user) {
		return new Promise((resolve, reject) => {
			axios
				.post(url, user)
				.then((response) => {
					resolve(response)
				})
				.catch((error) => {
					reject(error);
				})
		})
	},
	logout() {
		localStorage.removeItem(token);
	}
}
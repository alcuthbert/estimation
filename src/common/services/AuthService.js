import Users from '@/common/services/Users'

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
			Users.findByCredentials(user.username, user.password)
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
			Users.save(user)
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
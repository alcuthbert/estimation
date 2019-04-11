import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from './common/services/AuthService'
import { MUTATION_SET_IDENTITY } from './mutationTypes.js'
import { MUTATION_REMOVE_IDENTITY } from './mutationTypes.js'
import Users from '@/common/services/Users'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		identity: null
	},
	mutations: {
		[MUTATION_SET_IDENTITY](state, identity) {
			state.identity = identity
		},
		[MUTATION_REMOVE_IDENTITY](state) {
			state.identity = null
		}
	},
	actions: {
		getIdentity({commit}) {
			const id = AuthService.getToken()

			if (id !== null) {
				return Users.findById(id)
					.then(res => commit(MUTATION_SET_IDENTITY, res.data))
			}
		},
	},
	getters: {
		isLoggedIn(state) {
			return state.identity !== null
		},
		getIdentity(state) {
			return state.identity
		}
	}
});
import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/common/services/AuthService'
import Users from '@/common/services/Users'
import {MUTATION_SET_IDENTITY} from './mutation-types'
import {MUTATION_REMOVE_IDENTITY} from './mutation-types'
import {IS_LOGGED_IN} from './getter-types'
import {GET_IDENTITY} from './getter-types'
import {ACTION_GET_IDENTITY} from './action-types'

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
		[ACTION_GET_IDENTITY]({commit}) {
			const id = AuthService.getToken()

			if (id !== null) {
				return Users.findById(id)
					.then(res => commit(MUTATION_SET_IDENTITY, res.data))
			}
		},
	},
	getters: {
		[IS_LOGGED_IN](state) {
			return state.identity !== null
		},
		[GET_IDENTITY](state) {
			return state.identity
		}
	}
});
import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './common/services/AuthService'
import {MUTATION_SET_IDENTITY} from './mutationTypes.js'
import {MUTATION_REMOVE_IDENTITY} from './mutationTypes.js'

Vue.use(Vuex);

const identity = Auth.getToken() ? {name: Auth.getToken()} : null;

export default new Vuex.Store({
  state: {
    identity: identity
  },
  mutations: {
    [MUTATION_SET_IDENTITY] (state, identity) {
      state.identity = identity;
    },
    [MUTATION_REMOVE_IDENTITY] (state) {
      state.identity = null;
    }
  },
  actions: {

  },
  getters: {
    isLoggedIn(state) {
      return state.identity !== null;
    }
  }
});
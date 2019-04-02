import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './common/services/AuthService'

Vue.use(Vuex);

const identity = Auth.getToken() ? {name: Auth.getToken()} : null;

export default new Vuex.Store({
  state: {
    identity: identity
  },
  mutations: {
    setIdentity(state, identity) {
      state.identity = identity;
    },
    removeIdentity(state) {
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
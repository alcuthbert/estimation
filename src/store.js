import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
        {
            name: 'Noelia O\'Kon',
            email: 'otho.smitham@example.com',
            birthdate: '1978-06-28 00:00:00'
        }
    ]
  },
  mutations: {

  },
  actions: {

  }
});
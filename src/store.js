import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({

  plugins: [createPersistedState()],

  state: {
    component: 'organization-view',
    darkmode: false
  },
  getters: {
    currentComponent: state => {
      return state.component;
    },
    darkMode: state => {
      return state.darkmode;
    }
  },
  mutations: {
    ORGANIZATION_VIEW: (state) => {
      state.component = 'organization-view';
    },
    LOCATION_VIEW: (state) => {
      state.component = 'location-view';
    },
    EVENT_VIEW: (state) => {
      state.component = 'event-view';
    },
    DARK_MODE: (state) => {
      state.darkmode = !state.darkmode;
    }
  },
  actions: {

  }
})
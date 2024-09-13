import {createStore} from 'vuex';

import authentication from './authentication.js';

 

const store = createStore({

  modules: {

    authentication

  },

  state: {

    hideConfigButton: false,

    isPinned: true,

    showConfig: false,

    sidebarType: "bg-white",

    mcolor: "",

    darkMode: false,

    isNavFixed: false,

    isAbsolute: false,

    showNavs: true,

    showSidenav: true,

    showNavbar: true,

    showFooter: true,

    showMain: true,

    layout: "default"

  },

  mutations: {

    toggleConfigurator(state) {

      state.showConfig = !state.showConfig;

    },

    navbarMinimize(state) {

      const sidenav_show = document.querySelector(".g-sidenav-show");

 

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {

        sidenav_show.classList.remove("g-sidenav-hidden");

        sidenav_show.classList.add("g-sidenav-pinned");

        state.isPinned = true;

      } else {

        sidenav_show.classList.add("g-sidenav-hidden");

        sidenav_show.classList.remove("g-sidenav-pinned");

        state.isPinned = false;

      }

    },

    sidebarType(state, payload) {

      state.sidebarType = payload;

    },

    navbarFixed(state) {

      if (state.isNavFixed === false) {

        state.isNavFixed = true;

      } else {

        state.isNavFixed = false;

      }

    }

  },

  actions: {

    toggleSidebarColor({ commit }, payload) {

      commit("sidebarType", payload);

    }

  },

  getters: {}

});

 

store.subscribe((mutation, state) => {

  localStorage.setItem('authenticationState', JSON.stringify(state.authentication));

 

});

store.commit('authentication/LOAD_STATE_FROM_LOCAL_STORAGE');

 

export default store;
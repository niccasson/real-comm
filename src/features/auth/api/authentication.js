import axios from 'axios';

 

import {UserAuthUrls} from '../modules/user-authentication/user-authentication-constants.js';

 

const state = {

  status: '',

  username: null,

  permissions: '',

  isAuthenticated: false

};

 

const getters = {

  authenticationStatus: state => state.status,

  username: state => state.username,

  userPermissions: state => state.permissions,

  isAuthenticated: state => state.isAuthenticated

  // email: state => state.user ? state.user.email : '',

  // name: state => state.user ? state.user.name : ''

};

 

const mutations = {

  AUTH_REQUEST(state) {

    state.status = 'loading';

  },

  AUTH_SUCCESS(state, { username, permissions }) {

    state.status = 'success';

    state.username = username;

    state.permissions = permissions;

    state.isAuthenticated = true;

  },

  AUTH_ERROR(state) {

    state.status = 'error';

  },

  LOGOUT(state) {

    state.status = '';

    state.username = null;

    state.permissions = '';

    state.isAuthenticated = false;

  },

  LOAD_STATE_FROM_LOCAL_STORAGE(state){

    const savedState = localStorage.getItem('authenticationState');

    console.log(savedState);

    if (savedState) {

      const parsedState = JSON.parse(savedState);

      Object.assign(state, parsedState);

    }

  },

};

 

const actions = {

  login({ commit }, loginDict) {

    return new Promise((resolve, reject) => {

      commit('AUTH_REQUEST');

      axios.post(UserAuthUrls.LOGIN_USER_URL, loginDict, {withCredentials: true})

        .then(response => {

          const username = response.data.username;

          const permissions = response.data.permissions;

          commit('AUTH_SUCCESS', { username, permissions });

          axios.defaults.headers.common['Authorization'] = getters.authenticationToken;

          resolve(response);

          console.log(response);

          console.log(response.data);

        })

        .catch(err => {

          commit('AUTH_ERROR');

          reject(err);

        });

    });

  },

  logout({ commit }) {

    return new Promise((resolve, reject) => {

      commit('AUTH_REQUEST');

      axios.post(UserAuthUrls.LOGOUT_USER_URL, {withCredentials: true})

        .then(response => {

          commit('LOGOUT');

          delete axios.defaults.headers.common['Authorization'];

          resolve();

          console.log(response);

          console.log(response.data);

        })

        .catch(err => {

          commit('AUTH_ERROR');

          reject(err);

        });

    });

  },

};

 

// function clearSessionCookies() {

//   document.cookie.split().forEach((cookie) => {

//     document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");

//   });

// }

 

export default {

  namespaced: true,

  state,

  getters,

  mutations,

  actions

};
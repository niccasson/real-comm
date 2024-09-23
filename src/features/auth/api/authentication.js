import axios from 'axios';
import { AuthUrls } from '@/features/auth/api/authentication-constants.js';


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
  LOAD_STATE_FROM_LOCAL_STORAGE(state) {
    const savedState = localStorage.getItem('authenticationState');
    console.log(savedState);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      Object.assign(state, parsedState);
    }
  },
};

const actions = {
  signup({ commit }, signupDict) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      axios.post(AuthUrls.SIGNUP_USER_URL, signupDict, { withCredentials: true })
        .then(response => {
          const username = response.data.username;
          const permissions = response.data.permissions;
          commit('AUTH_SUCCESS', { username, permissions });
          axios.defaults.headers.common['Authorization'] = getters.authenticationToken;
          resolve(response);
          console.log(response);
          console.log(response.data);
          const responseDict = response.data;
          console.log(responseDict);
          console.log(responseDict.status);
          return response;
        })
        .catch(err => {
          commit('AUTH_ERROR');
          reject(err);
        });
    });
  },
  login({ commit }, loginDict) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      axios.post(AuthUrls.LOGIN_USER_URL, loginDict, { withCredentials: true })
        .then(response => {
          const username = response.data.username;
          const permissions = response.data.permissions;
          commit('AUTH_SUCCESS', { username, permissions });
          axios.defaults.headers.common['Authorization'] = getters.authenticationToken;
          resolve(response);
          console.log(response);
          console.log(response.data);
          const responseDict = response.data;
          console.log(responseDict);
          console.log(responseDict.status);
          return response;
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
      console.log(AuthUrls.LOGOUT_USER_URL);
      axios.post(AuthUrls.LOGOUT_USER_URL, { withCredentials: true })
        .then(response => {
          console.log('logging out!');
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
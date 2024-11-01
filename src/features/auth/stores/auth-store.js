import { defineStore } from 'pinia';
import axios from 'axios';
import { AuthUrls } from '@/features/auth/api/auth-constants.js';


export const authStore = defineStore('auth', {

    state: () => ({
        _isAuthenticated: false,
        _username: '',
        _userPermissions: null
    }),

    getters: {
        authStorageKey: () => 'auth-data',
        expirationKey: () => 'auth-expiration',
        isAuthenticated: (state) => state._isAuthenticated,
        username: (state) => state._username,
        userPermissions: (state) => state._userPermissions
    },

    actions: {

        /**
         * Loads authentication data from local storage if it is still valid.
         */
        loadAuthData() {
            const authData = localStorage.getItem(this.authStorageKey);
            const expirationTime = localStorage.getItem(this.expirationKey);

            if (expirationTime && Date.now() < parseInt(expirationTime, 10) && authData) {
                const { isAuthenticated, username, permissions } = JSON.parse(authData);
                this._isAuthenticated = isAuthenticated;
                this._username = username;
                this._userPermissions = permissions;
            } else {
                this.resetAuthState();
            }
        },

        /**
         * Saves authentication data to local storage.
         */
        saveAuthData() {
            const authData = {
                isAuthenticated: this._isAuthenticated,
                username: this._username,
                permissions: this._userPermissions,
            };
            localStorage.setItem(this.authStorageKey, JSON.stringify(authData));
            localStorage.setItem(this.expirationKey, (Date.now() + 12 * 60 * 60 * 1000).toString()); // 12 hours
        },

        /**
         * Resets authentication state and clears local storage.
         */
        resetAuthState() {
            this._isAuthenticated = false;
            this._username = '';
            this._userPermissions = null;
            localStorage.removeItem(this.authStorageKey);
            localStorage.removeItem(this.expirationKey);
        },

        /**
         * Saves authentication token to local storage.
         */
        saveAuthToken(authToken) {
            localStorage.setItem('token', authToken);
        },

        /**
         * Removes authentication token from local storage.
         */
        removeAuthToken(authToken) {
            localStorage.removeItem('token');
        },

        /**
         * Gets authentication status via token from local storage.
         */
        isAuthenticatedd() {
            return localStorage.getItem('token') !== null;
        },

        /**
         * Handles user signup.
         * 
         * @param {Object} router - Router for user login.
         * @param {Object} signupDict - Data for user registration.
         */
        async signup(router, signupDict) {
            try {
                const response = await axios.post(AuthUrls.auth.SIGNUP, signupDict, { withCredentials: true });
                this._username = response.data.username;
                this._userPermissions = response.data.permissions;
                this._isAuthenticated = true;
                this.saveAuthData(); // Save data to local storage
                console.log('Registration successful');
                router.push('/');
            } catch (err) {
                console.log('Signup failed', err);
            }
        },

        /**
         * Handles user login.
         * 
         * @param {Object} router - Router for user login.
         * @param {Object} loginDict - Data for user login.
         */
        async login(router, loginDict) {
            try {
                console.log(loginDict);
                const response = await axios.post(AuthUrls.LOGIN, loginDict);
                console.log(response.data);
                this.saveAuthToken(response.data.access);

                // this._username = response.data.username;
                // this._userPermissions = response.data.permissions;
                // this._isAuthenticated = true;
                // this.saveAuthData(); // Save data to local storage
                console.log('Login successful');
                console.log(router);
                console.log(typeof (router));
                router.push('/');
            } catch (err) {
                console.log('Login failed', err);
            }
        },

        /**
         * Handles user logout.
         * 
         * @param {Object} router - Router for user login.
         */
        async logout(router) {
            try {
                await axios.post(AuthUrls.auth.LOGOUT, { withCredentials: true });
                this.resetAuthState(); // Reset state
                console.log('Logout successful');
                router.push('/');
            } catch (err) {
                console.log('Logout failed', err);
            }
        }
    }
});

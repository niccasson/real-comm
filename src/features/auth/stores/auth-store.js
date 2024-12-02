import { defineStore } from 'pinia';
import axios from 'axios';
import { AuthUrls } from '@/features/auth/api/auth-constants.js';
import { jwtDecode } from 'jwt-decode';

export const authStore = defineStore('auth', {
    state: () => ({
        // _userId: null,
        // _username: '',
        // _userPermissions: {},
        // _isAuthenticated: false,
    }),

    getters: {
        // userId: (state) => state._userId,
        // username: (state) => state._username,
        // userPermissions: (state) => state._userPermissions,
        isAuthenticatedStorageKey: () => 'is_authenticated',
        userIdStorageKey: () => 'user_id',
        accessTokenStorageKey: () => 'access_token',
        refreshTokenStorageKey: () => 'refresh_token',
        isAuthenticated() {
            return JSON.parse(localStorage.getItem(this.isAuthenticatedStorageKey));
        },
        userId() {
            return document.cookie.replace(
                /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
            );
        }
    },

    actions: {
        /**
         * Loads authentication data from local storage.
         */
        loadAuthData() {
            const accessToken = localStorage.getItem(this.accessTokenStorageKey);
            if (accessToken) {
                const decodedAccessToken = jwtDecode(accessToken);
                // console.log('access_token: ', decodedAccessToken); // Output: { user_id: ..., username: ..., permissions: [...] }
                const { user_id, token_type } = decodedAccessToken;

                console.log(user_id);
                console.log(token_type);

                // this._userId = user_id;
                // this._username = username;
                // this._userPermissions = permissions;
                // this._isAuthenticated = true;
                this.saveUserId(user_id);
                localStorage.setItem(this.isAuthenticatedStorageKey, JSON.stringify(true));
            } else {
                console.log('Access token not found in local storage, resetting auth state.');
                this.resetAuthState();
            }
        },

        /**
         * Resets authentication state and clears access token from local storage.
         */
        resetAuthState() {
            // this._userId = null;
            // this._username = '';
            // this._userPermissions = {};
            // this._isAuthenticated = false;
            localStorage.setItem(this.isAuthenticatedStorageKey, JSON.stringify(false));
            this.removeAccessToken();
            this.removeRefreshToken();
            this.removeUserId();
        },

        /**
         * Saves access token to local storage.
         */
        saveAccessToken(accessToken) {
            localStorage.setItem(this.accessTokenStorageKey, accessToken);
        },

        /**
         * Saves refresh token to cookies.
         */
        saveRefreshToken(refreshToken) {
            document.cookie = `${this.refreshTokenStorageKey}=${refreshToken}; path=/;`;
        },

        /**
         * Saves user id to coookies.
         */
        saveUserId(userId) {
            document.cookie = `${this.userIdStorageKey}=${userId}; path=/;`;
        },

        /**
         * Removes access token from local storage.
         */
        removeAccessToken() {
            localStorage.removeItem(this.accessTokenStorageKey);
        },

        /**
         * Removes refresh token from cookies.
         */
        removeRefreshToken() {
            document.cookie = `${this.refreshTokenStorageKey}=; path=/;`;
        },

        /**
         * Removes user id from cookies.
         */
        removeUserId() {
            document.cookie = `${this.userIdStorageKey}=; path=/;`;
        },

        /**
         * Handles user login.
         *
         * @param {Object} router - Router for user navigation.
         * @param {Object} loginDict - Data for user login.
         */
        async login(router, loginDict) {
            try {
                this.resetAuthState();

                const response = await axios.post(AuthUrls.LOGIN, loginDict);
                console.log(response.data);
                const { access, refresh } = response.data;
                this.saveAccessToken(access);
                this.saveRefreshToken(refresh);
                this.loadAuthData();

                console.log('Login successful');
                router.push('/');
            } catch (err) {
                console.log('Login failed', err);
            }
        },

        /**
         * Handles user logout.
         *
         * @param {Object} router - Router for user navigation.
         */
        async logout(router) {
            try {
                // await axios.post(AuthUrls.auth.LOGOUT, { withCredentials: true });
                this.resetAuthState();
                console.log('Logout successful');
                router.push('/');
            } catch (err) {
                console.log('Logout failed', err);
            }
        },
    },
});

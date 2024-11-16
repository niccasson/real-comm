import axios from 'axios';
import router from '@/router';
import { AuthUrls } from '@/features/auth/api/auth-constants.js';
import { authStore } from '@/features/auth/stores/auth-store.js';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance for the API
const authAxiosClient = axios.create({
    baseURL: BASE_URL,
});

// Function to refresh the access token
const refreshAccessToken = async () => {
    try {
        const refreshToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        const response = await axios.post(AuthUrls.REFRESH, {
            refresh: refreshToken,
        });
        const newAccessToken = response.data.access;
        return newAccessToken;
    } catch (error) {
        console.error('Refresh token invalid or expired:', error);
        // Redirect to login page
        router.push({ name: 'login' });
        return null;
    }
};

// Request interceptor to add access token to headers
authAxiosClient.interceptors.request.use(
    (config) => {
        const authStoreInst = authStore();
        const accessToken = localStorage.getItem(authStoreInst.accessTokenStorageKey);
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors and retry the request
authAxiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const authStoreInst = authStore();
        const originalRequest = error.config;

        // Check if the response status is 401 and that it hasn't already retried
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.log('Expired access token detected, getting refreshed access token...');
            authStoreInst.resetAuthState();
            originalRequest._retry = true;

            const newAccessToken = await refreshAccessToken();
            authStoreInst.saveAccessToken(newAccessToken);
            authStoreInst.loadAuthData();

            if (newAccessToken) {
                // Update the header with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                // Retry the original request with the new token
                return authAxiosClient(originalRequest);
            }
        }

        // If the refresh token is invalid, reject the request and redirect to login
        console.log('Expired refresh token detected, redirecting to login...');
        return Promise.reject(error);
    }
);

export default authAxiosClient;

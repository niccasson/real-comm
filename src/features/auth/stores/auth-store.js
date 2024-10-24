import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { AuthUrls } from '@/features/auth/api/auth-constants.js';

export const authStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const username = ref('');
    const userPermissions = ref();

    function getIsAuthenticated() {
        return isAuthenticated;
    }

    function getUsername() {
        return username;
    }

    function getUserPermissions() {
        return userPermissions;
    }

    // function setIsAuthenticated(authenticationState) {
    //   isAuthenticated.value = authenticationState;
    // }

    // function setUsername(name) {
    //   username.value = name;
    // }

    // function setUserPermissions(permissions) {
    //   userPermissions = permissions;
    // }

    const router = useRouter();

    function signup(signupDict) {
        axios.post(AuthUrls.SIGNUP_USER_URL, signupDict, { withCredentials: true })
            .then(response => {
                const responseUsername = response.data.username;
                const responsePermissions = response.data.permissions;
                username.value = responseUsername;
                userPermissions.value = responsePermissions;
                isAuthenticated.value = true;
                console.log(response);
                console.log(response.data);
                console.log('Registration successful');
                router.push('/');
            })
            .catch(err => {
                console.log('Signup failed', err);
            });
    }

    function login(loginDict) {
        axios
            .post(AuthUrls.LOGIN_USER_URL, loginDict, { withCredentials: true })
            .then((response) => {
                const responseUsername = response.data.username;
                const responsePermissions = response.data.permissions;
                username.value = responseUsername;
                userPermissions.value = responsePermissions;
                isAuthenticated.value = true;
                console.log(response);
                console.log(response.data);
                console.log('Login successful');
                router.push('/');
            })
            .catch((err) => {
                console.log('Login failed', err);
            });
    }

    function logout() {
        axios
            .post(AuthUrls.LOGOUT_USER_URL, { withCredentials: true })
            .then((response) => {
                // delete axios.defaults.headers.common['Authorization'];
                console.log(response);
                console.log(response.data);
            })
            .catch((err) => {
                console.log('Logout failed', err);
            });
    }

    return {
        getIsAuthenticated,
        getUsername,
        getUserPermissions,
        // setIsAuthenticated,
        // setUsername,
        // setUserPermissions,
        signup,
        login,
        logout,
    };
});

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthUrls = {
    auth: {
        SIGNUP: `${BASE_URL}/auth/signup/`,
        LOGIN: `${BASE_URL}/auth/login/`,
        LOGOUT: `${BASE_URL}/auth/logout/`,
    }
};


export { AuthUrls };
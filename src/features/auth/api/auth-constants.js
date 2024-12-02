const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthUrls = {
    SIGNUP: `${BASE_URL}/api/auth/signup/`,
    LOGIN: `${BASE_URL}auth/jwt/create/`,
    REFRESH: `${BASE_URL}auth/jwt/refresh/`,
    LOGOUT: `${BASE_URL}/api/auth/logout/`,
};


export { AuthUrls };
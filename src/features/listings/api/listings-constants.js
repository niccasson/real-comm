const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ListingsUrls = {
    listings: {
        CREATE: `${BASE_URL}listings/create-listing/`,
        GET_ALL: `${BASE_URL}api/listings/`,
        GET_SINGLE: `${BASE_URL}api/listings/by-listing/`,
    },
    userListings: {
        GET_ALL: `${BASE_URL}api/listings/user-listings/`,
    },
    aws: {
        GET_IMAGES: `${BASE_URL}aws/list-images/`
    }
};

export { ListingsUrls };
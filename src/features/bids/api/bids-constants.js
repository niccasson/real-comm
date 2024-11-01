const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BidsUrls = {
    bids: {
        PLACE_BID: `${BASE_URL}/api/bids/place-bid/`,
        GET_BIDS: `${BASE_URL}/api/bids/get-bids/`,
    }
};

export { BidsUrls };
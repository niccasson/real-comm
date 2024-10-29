const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BidsUrls = {
    bids: {
        PLACE_BID: `${BASE_URL}/bids/place-bid/`,
        GET_BIDS: `${BASE_URL}/bids/get-bids/`,
    }
};

export { BidsUrls };
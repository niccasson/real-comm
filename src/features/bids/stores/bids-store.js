import { defineStore } from 'pinia';
import { BidsUrls } from '@/features/bids/api/bids-constants.js';
import BackendApis from '@/utils/backend-apis.js';

export const bidsStore = defineStore('bids', {
    state: () => ({
        // Assuming any mutable state variables would go here, if needed
    }),

    getters: {
        // Getter for columns
        columns() {
            return {
                BID_ID: 'bid_id',
                LISTING_ID: 'listing_id',
                BID_PRICE: 'bid_price',
                BID_DATE: 'bid_date',
                USERNAME: 'username'
            };
        },

        // Getter for headers
        headers() {
            return {
                BID_ID: 'Bid ID',
                LISTING_ID: 'Listing ID',
                BID_PRICE: 'Bid Price',
                BID_DATE: 'Bid Date',
                USERNAME: 'Username'
            };
        },

        // Getter for bidDisplayColumns, referencing other getters with `this`
        displayColumns() {
            return [
                { field: this.columns.BID_PRICE, header: this.headers.BID_PRICE },
                { field: this.columns.BID_DATE, header: this.headers.BID_DATE },
                { field: this.columns.USERNAME, header: this.headers.USERNAME }
            ];
        }
    },

    actions: {
        async placeBid(bidData) {
            try {
                const response = await BackendApis.axiosPost(BidsUrls.bids.PLACE_BID, bidData);
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error placing bid:', error);
            }
        },

        async fetchBidData(listingId) {
            const GET_SPECIFIC_BID_DATA_URL = `${BidsUrls.bids.GET_BIDS}${listingId}/`;
            try {
                const bidData = await BackendApis.axiosGet(GET_SPECIFIC_BID_DATA_URL);
                return bidData;
            } catch (error) {
                console.error('Error fetching bid data:', error);
            }
        }
    }
});

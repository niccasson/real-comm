import { defineStore } from 'pinia';
import { ListingsUrls } from '@/features/listings/api/listings-constants.js';
import BackendApis from '@/utils/backend-apis.js';

export const listingsStore = defineStore('listings', {

    actions: {
        /**
         * Creates a new listing.
         * 
         * @param {Object} listingData - The data for the new listing.
         * @returns {Promise<Object>} The response from the API.
         */
        async createListing(listingData) {
            try {
                const response = await BackendApis.axiosPost(ListingsUrls.listings.CREATE, listingData);
                return response; // Return the created listing data
            } catch (error) {
                console.error('Error creating listing:', error);
                throw error; // Rethrow the error for handling in the component
            }
        },

        /**
         * Fetches all listings.
         * 
         * @returns {Promise<Array>} An array of listing objects.
         */
        async fetchListings() {
            try {
                const data = await BackendApis.axiosGet(ListingsUrls.listings.GET_ALL);
                return data; // Return the listings data
            } catch (error) {
                console.error('Error fetching listings:', error);
                throw error; // Rethrow the error for handling in the component
            }
        },

        /**
         * Fetches data for a specific listing.
         * 
         * @param {number} listingId - The ID of the listing.
         * @returns {Promise<Object>} The specific listing data.
         */
        async fetchListingData(listingId) {
            try {
                const data = await BackendApis.axiosGet(`${ListingsUrls.listings.GET_SINGLE}${listingId}/`);
                return data; // Return the specific listing data
            } catch (error) {
                console.error('Error fetching listing data:', error);
                throw error; // Rethrow the error for handling in the component
            }
        },

        /**
         * Fetches AWS images for a specific listing.
         * 
         * @param {number} listingId - The ID of the listing.
         * @returns {Promise<Array>} An array of AWS image URLs.
         */
        async fetchAwsImages(listingId) {
            try {
                const data = await BackendApis.axiosGet(`${ListingsUrls.aws.GET_IMAGES}${listingId}/`);
                return data; // Return the images
            } catch (error) {
                console.error('Error fetching AWS images:', error);
                throw error; // Rethrow the error for handling in the component
            }
        }

    }

});

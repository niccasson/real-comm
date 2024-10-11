import { ref } from 'vue';

import { ListingsUrls } from './listings-constants.js';
import BackendApis from '@/utils/backend-apis.js';


export default class Listings {

  static BidColumns = {
    BID_ID: 'bid_id',
    LISTING_ID: 'listing_id',
    BID_PRICE: 'bid_price',
    BID_DATE: 'bid_date',
    USERNAME: 'username'
  };

  static BidHeaders = {
    BID_ID: 'Bid ID',
    LISTING_ID: 'Listing ID',
    BID_PRICE: 'Bid Price',
    BID_DATE: 'Bid Date',
    USERNAME: 'Username'
  };

  static columns = [
    'address',
    'annual_property_taxes',
    'asking_price',
    'bathrooms',
    'bedrooms',
    'building_type',
    'built_in',
    'city_town',
    'community_name',
    'description',
    'land_size',
    'listing_id',
    'media',
    'neighbourhood_name',
    'parking_type',
    'postal_code',
    'property_type',
    'province',
    'square_footage',
    'storeys',
    'title'
  ];

  static bidColumns = [
    'bid_id',
    'listing_id',
    'bid_price',
    'bid_date',
    'username'
  ];

  /**
  * Creates listing.
  *
  * @static
  * @param {Object} listingData The listing data.
  * @returns {Array} Returns the row data.
  */
  static async createListing(listingData) {
    // const GET_SPECIFIC_LISTING_DATA_URL = ListingsUrls.GET_LISTING_DATA_URL + listingId + '/';
    // const CREATE_LISTING_URL = ListingsUrls.CREATE_LISTING_URL + listingId + '/';
    // let response = await BackendApis.axiosPost(ListingsUrls.CREATE_LISTING_URL);
    // return listing_data;
    try {
      let response = await BackendApis.axiosPost(ListingsUrls.CREATE_LISTING_URL, listingData);
      console.log('Response:', response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  /**
  * Gets NBR table data.
  *
  * @static
  * @returns {Array} Returns the table data.
  */
  static async getData() {
    let listingData = await BackendApis.axiosGet(ListingsUrls.GET_DATA_URL);
    return listingData;
  }

  /**
  * Gets Listing row data.
  *
  * @static
  * @param {Integer} listingId The ID of the listing.
  * @returns {Array} Returns the row data.
  */
  static async getListingData(listingId) {
    const GET_SPECIFIC_LISTING_DATA_URL = ListingsUrls.GET_LISTING_DATA_URL + listingId + '/';
    let listingData = await BackendApis.axiosGet(GET_SPECIFIC_LISTING_DATA_URL);
    return listingData;
  }

  /**
  * Gets Listing bid data.
  *
  * @static
  * @param {Integer} listingId The ID of the listing.
  * @returns {Array} Returns the bid data.
  */
  static async getBidData(listingId) {
    const GET_SPECIFIC_BID_DATA_URL = ListingsUrls.GET_BID_DATA_URL + listingId + '/';
    let bidData = await BackendApis.axiosGet(GET_SPECIFIC_BID_DATA_URL);
    return bidData;
  }


  //   /**
  //   * Updates NBR cell.
  //   *
  //   * @static
  //   * @param {Object} event Data from cell change.
  //   */
  //   static async editRow(rowDict) {
  //     await BackendApis.axiosPost(NbrUrls.EDIT_ROW_URL, {'rowData': rowDict});
  //   }

}


Listings.BID_DISPLAY_COLUMNS_REF = ref([
  // { field: Listings.BidColumns.BID_ID, header: Listings.BidHeaders.BID_ID },
  // { field: Listings.BidColumns.LISTING_ID, header: Listings.BidHeaders.LISTING_ID },
  { field: Listings.BidColumns.BID_PRICE, header: Listings.BidHeaders.BID_PRICE },
  { field: Listings.BidColumns.BID_DATE, header: Listings.BidHeaders.BID_DATE },
  { field: Listings.BidColumns.USERNAME, header: Listings.BidHeaders.USERNAME }
]);
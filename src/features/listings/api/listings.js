import { ref } from 'vue';
 
import {ListingsUrls} from './listings-constants.js';
import BackendApis from '@/utils/backend-apis.js';


export default class Listings {

  /**
  * Gets NBR table data.
  *
  * @static
  * @returns {Array} Returns the table data.
  */
  static async getData() {
    let listings_data = await BackendApis.axiosGet(ListingsUrls.GET_DATA_URL);
    return listings_data;
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
    let listing_data = await BackendApis.axiosGet(GET_SPECIFIC_LISTING_DATA_URL);
    return listing_data;
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

 
// Nbr.FROZEN_COLUMNS_LEFT_REF = ref([

//   { field: NbrColumns.NBR_ID, header: NbrHeaders.NBR_ID },

//   { field: NbrColumns.STATUS, header: NbrHeaders.STATUS }

// ]);

 

// Nbr.COLUMNS_REF = ref([

//   { field: NbrColumns.DATE_RECEIVED, header: NbrHeaders.DATE_RECEIVED },

//   { field: NbrColumns.PROJECT_NAME, header: NbrHeaders.PROJECT_NAME },

//   { field: NbrColumns.CIVIC_ADDRESS, header: NbrHeaders.CIVIC_ADDRESS },

//   { field: NbrColumns.CIVIC_TOWNCITY, header: NbrHeaders.CIVIC_TOWNCITY },

//   { field: NbrColumns.LEGAL_DESCRIPTION, header: NbrHeaders.LEGAL_DESCRIPTION },

//   { field: NbrColumns.MULTI_DWELLING, header: NbrHeaders.MULTI_DWELLING },

//   { field: NbrColumns.COMMERCIAL, header: NbrHeaders.COMMERCIAL },

//   { field: NbrColumns.TOTAL_RESIDENTIAL_UNITS, header: NbrHeaders.TOTAL_RESIDENTIAL_UNITS },

//   { field: NbrColumns.TOTAL_COMMERCIAL_UNITS, header: NbrHeaders.TOTAL_COMMERCIAL_UNITS },

//   { field: NbrColumns.NUM_OF_RESIDENTIAL_BLDGS, header: NbrHeaders.NUM_OF_RESIDENTIAL_BLDGS },

//   { field: NbrColumns.NUM_OF_COMMERCIAL_BLDGS, header: NbrHeaders.NUM_OF_COMMERCIAL_BLDGS },

//   { field: NbrColumns.PROJECT_PHASE, header: NbrHeaders.PROJECT_PHASE },

//   { field: NbrColumns.ELEVATOR_REQUIRED, header: NbrHeaders.ELEVATOR_REQUIRED },

//   { field: NbrColumns.ENTERPHONE_REQUIRED, header: NbrHeaders.ENTERPHONE_REQUIRED },

//   { field: NbrColumns.ALARM_REQUIRED, header: NbrHeaders.ALARM_REQUIRED },

//   { field: NbrColumns.INTERNET_REQUIRED, header: NbrHeaders.INTERNET_REQUIRED },

//   { field: NbrColumns.TOTAL_COUNT_PHONEFAX, header: NbrHeaders.TOTAL_COUNT_PHONEFAX },

//   { field: NbrColumns.PRIMARY_CONTACT_COMPANY, header: NbrHeaders.PRIMARY_CONTACT_COMPANY },

//   { field: NbrColumns.PRIMARY_CONTACT_NAME, header: NbrHeaders.PRIMARY_CONTACT_NAME },

//   { field: NbrColumns.PRIMARY_CONTACT_PHONE, header: NbrHeaders.PRIMARY_CONTACT_PHONE },

//   { field: NbrColumns.PRIMARY_CONTACT_EMAIL, header: NbrHeaders.PRIMARY_CONTACT_EMAIL },

//   { field: NbrColumns.SITE_ELECTRICIAN_COMPANY, header: NbrHeaders.SITE_ELECTRICIAN_COMPANY },

//   { field: NbrColumns.SITE_ELECTRICIAN_NAME, header: NbrHeaders.SITE_ELECTRICIAN_NAME },

//   { field: NbrColumns.SITE_ELECTRICIAN_PHONE, header: NbrHeaders.SITE_ELECTRICIAN_PHONE },

//   { field: NbrColumns.SITE_ELECTRICIAN_EMAIL, header: NbrHeaders.SITE_ELECTRICIAN_EMAIL },

//   { field: NbrColumns.SITE_SUPERVISOR_COMPANY, header: NbrHeaders.SITE_SUPERVISOR_COMPANY },

//   { field: NbrColumns.SITE_SUPERVISOR_NAME, header: NbrHeaders.SITE_SUPERVISOR_NAME },

//   { field: NbrColumns.SITE_SUPERVISOR_PHONE, header: NbrHeaders.SITE_SUPERVISOR_PHONE },

//   { field: NbrColumns.SITE_SUPERVISOR_EMAIL, header: NbrHeaders.SITE_SUPERVISOR_EMAIL },

//   { field: NbrColumns.SITE_PHASE_PLAN_ATTACHED, header: NbrHeaders.SITE_PHASE_PLAN_ATTACHED },

//   { field: NbrColumns.UTILITY_PLAN_ATTACHED, header: NbrHeaders.UTILITY_PLAN_ATTACHED },

//   { field: NbrColumns.GOOGLE_SNAPSHOT_RURAL_ATTACHED, header: NbrHeaders.GOOGLE_SNAPSHOT_RURAL_ATTACHED },

//   { field: NbrColumns.CONSTRUCTION_START_DATE, header: NbrHeaders.CONSTRUCTION_START_DATE },

//   { field: NbrColumns.DATE_OF_BASE_BLDG_VERIFICATION_INSPECTION_SERVICES_ACTIVATION, header: NbrHeaders.DATE_OF_BASE_BLDG_VERIFICATION_INSPECTION_SERVICES_ACTIVATION },

//   { field: NbrColumns.FIRST_TENANT_OCCUPANCY_DATE, header: NbrHeaders.FIRST_TENANT_OCCUPANCY_DATE },

//   { field: NbrColumns.COMMENTS, header: NbrHeaders.COMMENTS },

//   { field: NbrColumns.LAST_UPDATED, header: NbrHeaders.LAST_UPDATED },

//   { field: NbrColumns.AUTHOR, header: NbrHeaders.AUTHOR },

//   { field: NbrColumns.LINK, header: NbrHeaders.LINK }

// ]);
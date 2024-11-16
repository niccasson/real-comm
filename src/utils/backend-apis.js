import axios from 'axios';
// import store from '../store';
import authAxiosClient from '@/features/auth/api/auth-axios-client';

export default class BackendApis {
  /**
   * Performs axios GET request.
   *
   * @static
   * @param {String} url - The URL to perform the GET request on.
   * @returns {Array} Returns the requested data.
   */
  static async axiosGet(url) {
    let data = [];
    await authAxiosClient
      .get(url, {
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('Sending axios request to: ', url);
          data = response.data;
        },
        (error) => {
          console.log('Error reading: ', error.response.data);
          return error;
        }
      );

    return data;
  }

  /**
   * Performs axios POST request.
   *
   * @static
   * @param {String} url - The URL to submit the POST request to.
   * @param {Object} postData - The data to submit to the URL.
   * @returns {Promise} The response or error from the POST request.
   */
  static async axiosPost(url, postData) {
    return await authAxiosClient
      .post(url, postData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        (response) => response,
        (error) => {
          console.log('Error creating: ', error.response.data);
          return error;
        }
      );
  }

  /**
   * Performs axios PUT request.
   *
   * @static
   * @param {String} url - The URL to submit the PUT request to.
   * @param {Object} putData - The data to submit to the URL.
   * @returns {Promise} The response or error from the PUT request.
   */
  static async axiosPut(url, putData) {
    return await authAxiosClient
      .put(url, putData, {
        withCredentials: true,
      })
      .then(
        (response) => response,
        (error) => {
          console.log('Error updating: ', error.response.data);
          return error;
        }
      );
  }
}

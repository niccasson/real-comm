import axios from 'axios';

// import store from '../store';

 

export default class BackendApis {

 

  /**

  * Performs axios GET request.

  *

  * @static

  * @param {String} url The url to perform the get request on.

  * @returns {Array} Returns the requested data.

  */

  static async axiosGet(url) {

    // console.log('permissions: ');

    // console.log(store.getters['authentication/userPermissions']);



    // axios.defaults.headers.common['Authorization'] = store.getters['authentication/userPermissions'];

    let data = [];

    await axios.get(url, {

      withCredentials: false,

    })

        .then((response => {

          data = response.data;

        }), (error) => {

          console.error(error);

        });

    return data;

  }

 

  /**

  * Performs axios POST request.
  *
  * @static
  * @param {String} url The url to submit post request to.
  * @param {Object} postData The data to submit to the url.
  */

  static async axiosPost(url, postData) {
    console.log('permissions: ');
    console.log(store.getters['authentication/userPermissions']);
    axios.defaults.headers.common['Authorization'] = store.getters['authentication/userPermissions'];

    return await axios.post(url, postData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }

    })

        .then((response) => {

          return response;

        }, (error) => {

          return error;

        });

  }

}
import cookie from 'react-cookies';
import config from '../config';
// import a from 'axios';
// import _get from 'lodash/get';
// import config from '../config';
// ​
// import { getInitialState } from '../store/user/user.reducer';
// import { getTokenFromStorage } from '../utils';
// ​
// const axios = a.create({
//   baseURL: config.apiUrl,
// });
// axios.interceptors.request.use((axiosConfig) => {
//   const token = getTokenFromStorage();

//   if (!token) {
//     return axiosConfig;
//   }

//   const bearerToken = `Bearer ${token}`;
//   const updatedAxiosConfig = Object.assign(
//     axiosConfig,
//     Object.assign(
//       axiosConfig.headers,
//       { Authorization: bearerToken },
//     ),
//   );

//   return updatedAxiosConfig;
// }, (error) => {
//   return Promise.reject(error);
// });

// axios.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   const isAuthError = (_get(error, 'response.statusText', null) === 'Unauthorized')
//     || (_get(error, 'response.status', null) === 401);

//   if (isAuthError) {
//     localStorage.removeItem('jwtToken');
//     getInitialState();
//     throw new Error('No active account found with the given credentials');
//   }
//   return Promise.reject(error);
// });

// export default axios

// ////////////////

// const token = cookie.load('token');
// const url = new URL(`${config.apiUrl}/recipes/ingredients`);
// const filtr = fetch(url, { method: 'GET' })
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw new Error('Network response was not ok');
//   })
//   .then((json) => {
//     this.setState({ ingredients: json.recipes });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// export default filtr;

///////////////////////////////////

const Helpers = {
  // Main wrapper for Fetch API
  httpRequest: (url, method, payload, headers) => {
    // Configuration to accept json as a default
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // method = post and payload, add it to the fetch request
    if (method.toLowerCase() === 'post' && payload && payload.length > 0) {
      config.body = JSON.stringify(payload);
    }
    // if custom headers need to be set for the specific request
    // override them here
    if (headers && typeof headers === 'object' && Object.keys(headers).length > 0) {
      config.headers = headers;
    }
    return fetch(
      url,
      config
    ).then((response) => {
      // Check if the request is 200
      if (response.ok) {
        return response.json();
        // let data = response;
        // // if the type is json return, interpret it as json
        // if (response.headers.get('Content-Type').indexOf('application/json') > -1) {

        //   data = response.json();
        // }
        // return data;
      }
      if (response.status === 401) {
        return response.json();
      }
      throw new Error('Network response was not ok');
      // if an errors, anything but 200 then reject with the actuall response
      // return Promise.reject(response);
    })
      .then((json) => {
        return json;
      });
  },
  // login: (url, method, payload, headers) => {
  //   fetch(`${config.apiUrl}/users/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  //     },
  //     body: formBody,
  //   })
  //     .then((response) => {
  //       if (response.status === 401) {
  //         return response.json();
  //       }
  //       if (response.ok) {
  //         return response.json();
  //       }

  //       throw new Error('Network response was not ok');
  //     })
  // }
};

export default Helpers;

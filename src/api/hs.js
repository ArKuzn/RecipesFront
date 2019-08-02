// import axios from "axios";

// const WrappedAxios = async ({
//   url = '',
//   params = {},
//   headers = {},
//   data = {}
// }) => {
//   try {
//     const { data } = await axios({
//       url: `${}${url}`,
//       headers: {
//         ...defaulktHeadrs,
//         ...headers
//       }
//     });

//     return data;
//   } catch (error) {
//     throw (error);
//   }
// };

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
      config,
    ).then((response) => {
      // Check if the request is 200
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
      .then((json) => {
        return json;
      });
  },
};

export default Helpers;

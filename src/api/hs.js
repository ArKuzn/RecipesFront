// import a from 'axios';
// import _get from 'lodash/get';
// import config from '../config';
// ​
// import { getInitialState } from '../store/user/user.reducer';
// import { getTokenFromStorage } from '../utils';
// ​
const axios = a.create({
  baseURL: config.apiUrl,
});
axios.interceptors.request.use((axiosConfig) => {
  const token = getTokenFromStorage();

  if (!token) {
    return axiosConfig;
  }

  const bearerToken = `Bearer ${token}`;
  const updatedAxiosConfig = Object.assign(
    axiosConfig,
    Object.assign(
      axiosConfig.headers,
      { Authorization: bearerToken },
    ),
  );

  return updatedAxiosConfig;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const isAuthError = (_get(error, 'response.statusText', null) === 'Unauthorized')
    || (_get(error, 'response.status', null) === 401);

  if (isAuthError) {
    localStorage.removeItem('jwtToken');
    getInitialState();
    throw new Error('No active account found with the given credentials');
  }
  return Promise.reject(error);
});

export default axios;
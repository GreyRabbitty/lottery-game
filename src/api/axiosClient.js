import axios from 'axios';

const token = localStorage.getItem('phototd-token');
let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const axiosClient = axios.create({
  baseURL,
  headers: token && {
    Authorization: `Bearer ${token}`,
  },
});

const handleResponse = (res) => {
  return res.data;
};

const handleError = (err) => {
  return Promise.reject(err);
};

axiosClient.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(handleResponse, handleError);

export default axiosClient;

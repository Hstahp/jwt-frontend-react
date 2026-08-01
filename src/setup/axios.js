import axios from 'axios';
import { toast } from 'react-toastify';
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

instance.defaults.withCredentials = true;

// // Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before the request is sent
        return config;
    },
    function (error) {
        // Do something with the request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lies within the range of 2xx causes this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that fall outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = (error && error.response && error.response.status) || 500;
        switch (status) {
            case 401:
                toast.error('Unauthorized the user. Please login again');
                // window.location.href = '/login';
                return Promise.reject(error);
            case 403:
                toast.error(`You don't have permission to access this resource`);
                return Promise.reject(error);
            case 404:
                toast.error('Not Found');
                return Promise.reject(error);
            case 500:
                toast.error('Internal Server Error');
                return Promise.reject(error);
            default:
                toast.error('Something went wrong. Please try again later');
                return Promise.reject(error);
        }
    },
);

export default instance;

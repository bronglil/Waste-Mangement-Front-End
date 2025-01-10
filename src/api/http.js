import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://waste-management-server.cleverapps.io/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optionally, you can add interceptors here for request/response handling
// apiClient.interceptors.request.use(config => {
//     // Add any custom logic before sending the request
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// apiClient.interceptors.response.use(response => {
//     // Handle response data
//     return response;
// }, error => {
//     // Handle response errors
//     return Promise.reject(error);
// });

export default apiClient; 
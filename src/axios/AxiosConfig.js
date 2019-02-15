import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-e-dashboard.firebaseio.com/'
});

export default instance;
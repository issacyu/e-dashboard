import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44356/'
});

export default instance;
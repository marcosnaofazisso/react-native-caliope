import axios from 'axios';

const api = axios.create({
    baseURL:'https://caliope-watson.herokuapp.com'
});

export default api;


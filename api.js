import axios from 'axios';

const api = axios.create({
    baseURL:'https://watson-assistant-naruto.herokuapp.com'
});

export default api;


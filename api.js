import axios from 'axios';

const api = axios.create({
    baseURL:'https://caliope-watson.herokuapp.com'
});
export const apiUsuario = axios.create({
    baseURL:'https://caliope-crud-usuario.herokuapp.com'
});

export default api;


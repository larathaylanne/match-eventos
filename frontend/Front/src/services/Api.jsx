import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080' // Certifique-se que o Java está rodando aqui
});

export default api;
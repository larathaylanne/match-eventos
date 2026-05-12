import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080' // Certifique-se que o Java está rodando aqui
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // confira o nome da chave
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
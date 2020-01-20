import axios from 'axios';

const api = axios.create({
   // o acesso varia de acordo com o sistema operacional
   // o endereco IP é o do Expo e a porta é a do backend no NodeJS
   baseURL: 'http://192.168.25.22:3333'
});

export default api;

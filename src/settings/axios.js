import axios from 'axios'
import store from '@/store'

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

axios.defaults.headers['content-type'] = 'application/json';
axios.defaults.withCredentials = true;
switch (NODE_ENV) {
  // case 'development':
  //   axios.defaults.baseURL =  'http://localhost:8081/api/v1/';
  //   break;
  case 'production':
    axios.defaults.baseURL =  window.location.origin + '/api/v1/';
    break;
  default:
    axios.defaults.baseURL =  'https://virtserver.swaggerhub.com/andrewleykin/social/1.0.4/api/v1/';
}

const token = localStorage.getItem('user-token')
if (token) axios.defaults.headers.common['Authorization'] = token

axios.interceptors.response.use(null, error => {
  // добавить проверку на законченный токен и сделать выход из приложения
  // store.dispatch('auth/api/logout')
  store.dispatch('global/alert/setAlert', {
    status: 'error',
    text: error.response.statusText
  })
  console.error(error)
  return Promise.reject(error)
});

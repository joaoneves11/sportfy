import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.100.122:3001',
})


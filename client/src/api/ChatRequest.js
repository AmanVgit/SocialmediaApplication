import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL


const API = axios.create({ baseURL: `${BASE_URL}` });

export const userChats = (id) => API.get(`/chat/${id}`);

export const createChat = (data) => API.post('/chat/', data);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
});

export const fetchAirports = async () => (await api.get('/airports')).data.airports;
export const fetchRoutes = async () => (await api.get('/routes')).data.routes;
export const fetchAnalysis = async () => (await api.get('/analysis')).data;
export const findRoute = async (payload) => (await api.post('/find-route', payload)).data;
export const findMultiCity = async (payload) => (await api.post('/multi-city', payload)).data;

export default api;

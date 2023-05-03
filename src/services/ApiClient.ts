import axios from 'axios';
import appConfig from '../config/AppConfig';

const apiClient = axios.create({
  baseURL: appConfig.apiUrl,
});

export default apiClient;

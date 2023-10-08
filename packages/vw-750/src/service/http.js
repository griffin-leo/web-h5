/* eslint-disable prettier/prettier */
import HttpRequest from './request';
export const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const http = new HttpRequest(baseUrl);
export default http;

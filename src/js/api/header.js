import { API_KEY } from './constants';

const token = JSON.parse(localStorage.getItem('token'));

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append('X-Noroff-API-Key', API_KEY);
  }

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  headers.append('content-type', 'application/json');

  return headers;
}

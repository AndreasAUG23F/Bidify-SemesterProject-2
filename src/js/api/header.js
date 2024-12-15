/**
 * Generates HTTP headers for API requests.
 * Includes the API key and authorization token if available.
 * @module Headers
 * @function headers
 * @returns {Headers} - An instance of the Headers object containing the necessary headers.
 */

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

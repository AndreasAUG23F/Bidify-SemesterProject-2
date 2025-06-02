import { API_AUTH_KEY } from '../constants';
import { headers } from '../header';

/**
 * Requests and stores an API key in localStorage.
 * @async
 * @function getKey
 * @returns {Promise<void>} - No return value.
 * @throws {Error} - Logs and alerts errors if the request fails.
 */
export default async function getKey() {
  const body = {
    name: 'ApiKey',
  };

  try {
    const response = await fetch(API_AUTH_KEY, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const apiKey = await response.json();
      localStorage.setItem('API-KEY', JSON.stringify(apiKey));
    }
  } catch (error) {
    console.log(error);
    alert('Something went wrong trying to get API key');
  }
}

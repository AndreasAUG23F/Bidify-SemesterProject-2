import { API_AUTH_KEY } from '../constants';
import { headers } from '../header';

export async function getKey() {
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
    alert('something went wrong trying to get apiKey');
  }
}

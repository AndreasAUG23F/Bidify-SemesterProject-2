import { API_AUTH_REGISTER } from '../constants';
import { headers } from '../header';

export async function register({ name, email, password }) {
  const body = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (response.ok) {
      alert('User registered');
      window.location.href = '/auth/login/';
    }
  } catch (error) {
    alert('An error occurred');
    console.error(error);
  }
}

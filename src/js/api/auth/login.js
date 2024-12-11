/**
 * Handles user login by sending credentials to the authentication API.
 * Stores the user's access token and data in localStorage upon successful login.
 * @module Login
 * @async
 * @function login
 * @param {Object} params - The login parameters.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @returns {Promise<void>} - No return value.
 * @throws {Error} - Logs and alerts errors if the login request fails.
 */

import { API_AUTH_LOGIN } from '../constants';
import { headers } from '../header';

export async function login({ email, password }) {
  const body = {
    email: email,
    password: password,
  };

  try {
    console.log('trying to login');
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert('User logged in');
      window.location.href = '/';
      const data = await response.json();
      localStorage.setItem('token', JSON.stringify(data.data.accessToken));
      localStorage.setItem('userData', JSON.stringify(data.data));
      console.log(data);
    }
  } catch (error) {
    alert('An error occurred');
    console.error(error);
  }
}

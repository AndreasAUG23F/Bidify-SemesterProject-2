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

import { hideLoader, showLoader } from '../../ui/global/loader';
import { API_AUTH_LOGIN } from '../constants';
import { headers } from '../header';

export async function login({ email, password }) {
  const body = { email, password };

  showLoader();
  try {
    console.log('trying to login');
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      alert('User logged in');
      hideLoader();
      window.location.href = '/';
      localStorage.setItem('token', JSON.stringify(data.data.accessToken));
      localStorage.setItem('userData', JSON.stringify(data.data));
      console.log(data);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
  } catch (error) {
    hideLoader();
    displayError(error.message);
    console.error('Login error:', error);
  }
}

function displayError(message) {
  const errorContainer = document.querySelector('#errorContainer');
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  } else {
    alert(message);
  }
}

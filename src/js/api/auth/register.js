/**
 * Handles user registration by sending user details to the registration API.
 * Redirects the user to the login page upon successful registration.
 * Displays an alert if the registration request fails.
 * @module Register
 * @async
 * @function register
 * @param {Object} params - The registration parameters.
 * @param {string} params.name - The user's name.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @returns {Promise<void>} - No return value.
 * @throws {Error} - Logs and alerts errors if the registration request fails.
 */

import { hideLoader, showLoader } from '../../ui/global/loader';
import { API_AUTH_REGISTER } from '../constants';
import { headers } from '../header';

export async function register({ name, email, password }) {
  const emailPattern = /^[\w.-]+@(?:stud\.)?noroff\.no$/;
  if (!name || name.length > 20) {
    alert('Name must be max 20 characters and contain valid characters.');
    return;
  }

  if (!email || !emailPattern.test(email)) {
    alert(
      'Email must be a valid Noroff email (e.g., user@noroff.no or user@stud.noroff.no).'
    );
    return;
  }

  if (!password || password.length < 8) {
    alert('Password must be at least 8 characters long.');
    return;
  }

  const body = {
    name: name,
    email: email,
    password: password,
  };

  showLoader();
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert('User registered');
      hideLoader();
      window.location.href = '/auth/login/';
    } else {
      const error = await response.json();
      alert(`Registration failed: ${error.message}`);
    }
  } catch (error) {
    alert('An error occurred');
    console.error(error);
  } finally {
    hideLoader();
  }
}

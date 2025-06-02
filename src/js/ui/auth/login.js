/**
 * Handles the login form submission.
 * Prevents default form behavior, gathers input data,
 * and calls the login function.
 * @module LoginHandler
 * @async
 * @function onLogin
 * @param {Event} event - The form submission event.
 */

import login from '/src/js/api/auth/login.js';

export async function onLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const loginData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    await login(loginData);
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please check your credentials.');
  }
}

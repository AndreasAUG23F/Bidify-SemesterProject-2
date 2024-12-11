/**
 * Handles the registration form submission.
 * Prevents the default form submission behavior and gathers input data for registration.
 * Calls the API to register the user.
 * @module RegisterHandler
 * @async
 * @function onRegister
 * @param {Event} event - The form submission event.
 * @throws {Error} - Logs errors if the registration API call fails.
 */

import { register } from '../../api/auth/register.js';

export async function onRegister(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const registerData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  console.log('Register Data:', registerData);

  register(registerData);
}

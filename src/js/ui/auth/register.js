/**
 * Handles the registration form submission.
 * Prevents the default form submission behavior and gathers input data for registration.
 * Performs client-side validation and calls the API to register the user.
 * @module RegisterHandler
 * @async
 * @function onRegister
 * @param {Event} event - The form submission event.
 * @throws {Error} - Logs errors if the registration API call fails.
 */

import register from '../../api/auth/register.js';

export async function onRegister(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const image = formData.get('image');

  // Client-side validation
  const namePattern = /^[a-zA-Z0-9_]+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  const urlPattern = /^https?:\/\/.+$/;

  if (!namePattern.test(name)) {
    alert('Name must only contain letters, numbers, and underscores.');
    return;
  }

  if (!emailPattern.test(email)) {
    alert('Email must be a valid stud.noroff.no address.');
    return;
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters.');
    return;
  }

  if (image && !urlPattern.test(image)) {
    alert('Image URL must be valid (starting with http or https).');
    return;
  }

  const registerData = { name, email, password };
  if (image) {
    registerData.avatar = image;
  }

  try {
    await register(registerData);
    alert('Registration successful! Redirecting to login page.');
    window.location.href = '/auth/login/';
  } catch (error) {
    console.error('Registration failed:', error);
    alert('An error occurred during registration.');
  }
}

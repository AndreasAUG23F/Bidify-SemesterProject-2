/**
 * Initializes the registration page.
 * Attaches a submit event listener to the registration form if it exists.
 * Logs an error if the form is not found in the DOM.
 * @module RegisterPage
 */

import { onRegister } from '../../ui/auth/register.js';

const form = document.forms.register;

if (form) {
  form.addEventListener('submit', onRegister);
} else {
  console.error("Form with name 'register' not found!");
}

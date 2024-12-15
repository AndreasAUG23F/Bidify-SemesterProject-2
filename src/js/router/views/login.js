/**
 * Initializes the login page.
 * Attaches the form submission handler for user authentication.
 * @module LoginPage
 */

/**
 * Attaches a submission event listener to the login form.
 * @function
 */

import { onLogin } from '../../ui/auth/login';

const form = document.forms.login;

form.addEventListener('submit', onLogin);

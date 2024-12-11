/**
 * Sets up a click event listener for the logout button.
 * Calls the `onLogout` function when the button is clicked.
 * @module LogoutListener
 * @function setLogoutListener
 * @throws {Error} - Logs errors if the logout button is not found.
 */

import { onLogout } from '../auth/logout';

export function setLogoutListener() {
  const logoutButton = document.getElementById('logoutButton');

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      onLogout();
    });
  }
}

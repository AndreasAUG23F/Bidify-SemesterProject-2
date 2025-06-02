/**
 * Sets up the logout button click listener.
 * @module LogoutListener
 */

import { onLogout } from '../auth/logout';

export function setLogoutListener() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', onLogout);
  }
}

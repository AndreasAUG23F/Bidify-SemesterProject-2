import { onLogout } from '../auth/logout';

/**
 * Attaches a click event listener to the logout button that triggers the logout process.
 * When the button is clicked, the `onLogout` function is called to log the user out.
 */

export function setLogoutListener() {
  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', () => {
    onLogout();
  });
}

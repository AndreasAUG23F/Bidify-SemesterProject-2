/**
 * Logs the user out by clearing localStorage
 * and redirecting to the login page.
 * @module Logout
 * @function onLogout
 */

export function onLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  alert('Logged out');
  window.location.href = '/auth/login/';
}

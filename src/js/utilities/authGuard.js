/**
 * Ensures the user is authenticated before allowing access to a page.
 *
 * @module AuthGuard
 * @function authGuard
 * @description
 * Redirects unauthenticated users to the login page with an alert.
 *
 * @example
 * // Call this at the top of protected pages
 * authGuard();
 */

export function authGuard() {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('userData');

  if (!token || !userData) {
    alert('You must be logged in to view this page.');
    window.location.href = '/auth/login/';
  }
}

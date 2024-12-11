/**
 * Ensures the user is authenticated before allowing access to a page.
 *
 * @module AuthGuard
 * @function authGuard
 * @description
 * Redirects the user to the login page if they are not authenticated.
 * Displays an alert message to inform the user about the need to log in.
 *
 * @example
 * // Add this to pages that require authentication
 * authGuard();
 */

export function authGuard() {
  if (!localStorage.token) {
    alert('You must be logged in to view this page');
    window.location.href = '/auth/login/';
  }
}

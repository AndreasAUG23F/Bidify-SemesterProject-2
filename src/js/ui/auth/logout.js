export function onLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  //localStorage.removeItem("listingId")
  alert('Logged out');
  window.location.href = '/auth/login/';
}

export function onLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  //localStorage.removeItem("postId")
  alert('Logged out');
  window.location.href = '/auth/login/';
}

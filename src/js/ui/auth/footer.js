/**
 * Dynamically creates and renders the footer section of the website.
 * Includes navigation links, copyright,
 * and handles logout functionality for logged-in users.
 * @module Footer
 * @function makeFooter
 */

export const makeFooter = () => {
  const footer = document.querySelector('footer');
  if (!footer) {
    console.error('<footer> element not found in the DOM.');
    return;
  }

  footer.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-6 lg:px-12 py-16';

  const topSection = document.createElement('div');
  topSection.className =
    'flex flex-col lg:flex-row justify-between items-center space-y-12 lg:space-y-0 lg:space-x-16';

  const logoDiv = document.createElement('div');
  const logoImg = document.createElement('img');
  logoImg.src = '/images/bidifyLogo.png';
  logoImg.alt = 'Bidify Logo';
  logoImg.className = 'h-14 w-auto';
  logoDiv.appendChild(logoImg);

  const nav = document.createElement('nav');
  nav.className =
    'flex flex-wrap justify-center lg:justify-start space-x-8 text-lg md:text-xl';

  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.textContent = 'Home';
  homeLink.className = 'hover:text-blue-500';
  nav.appendChild(homeLink);

  const token = localStorage.getItem('token');

  if (token) {
    const profileLink = document.createElement('a');
    profileLink.href = '/profile/';
    profileLink.textContent = 'Profile';
    profileLink.className = 'hover:text-blue-500';

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.id = 'logoutButton';
    logoutButton.className = `
      bg-red-500 text-white font-medium py-2 px-4 rounded-lg 
      transform transition duration-300 hover:scale-105 hover:bg-red-600
    `;
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/';
    });

    nav.append(profileLink, logoutButton);
  } else {
    const registerLink = document.createElement('a');
    registerLink.href = '/auth/register/';
    registerLink.textContent = 'Register';
    registerLink.className = 'hover:text-blue-500';

    const loginLink = document.createElement('a');
    loginLink.href = '/auth/login/';
    loginLink.textContent = 'Login';
    loginLink.className = 'hover:text-blue-500';

    nav.append(registerLink, loginLink);
  }

  topSection.append(logoDiv, nav);

  const divider = document.createElement('div');
  divider.className = 'border-t border-gray-300 my-12';

  const bottomSection = document.createElement('div');
  bottomSection.className =
    'flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0';

  const copyright = document.createElement('p');
  copyright.className = 'text-lg text-gray-600';
  copyright.textContent = '© 2024 Bidify. All rights reserved.';

  const bottomNav = document.createElement('nav');
  bottomNav.className = 'flex space-x-6 text-lg';

  const privacyLink = document.createElement('a');
  privacyLink.href = '/privacy-policy';
  privacyLink.textContent = 'Privacy Policy';
  privacyLink.className = 'hover:text-blue-500';

  const termsLink = document.createElement('a');
  termsLink.href = '/terms-of-service';
  termsLink.textContent = 'Terms of Service';
  termsLink.className = 'hover:text-blue-500';

  bottomNav.append(privacyLink, termsLink);
  bottomSection.append(copyright, bottomNav);

  container.append(topSection, divider, bottomSection);
  footer.appendChild(container);
};

import { setLogoutListener } from '../global/logout';

export const makeFooter = () => {
  const footer = document.querySelector('footer');

  footer.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-6 lg:px-12 py-16';

  const topSection = document.createElement('div');
  topSection.className =
    'flex flex-col lg:flex-row justify-between items-center space-y-12 lg:space-y-0 lg:space-x-16';

  const logoDiv = document.createElement('div');
  logoDiv.className = 'flex-shrink-0';

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
  homeLink.className = 'hover:text-blue-500';
  homeLink.textContent = 'Home';

  const loggedIn = localStorage.getItem('token');

  if (loggedIn) {
    const profileLink = document.createElement('a');
    profileLink.href = '/profile';
    profileLink.className = 'hover:text-blue-500';
    profileLink.textContent = 'Profile';

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.id = 'logoutButton';
    logoutButton.className = `
  bg-red-500 
  text-white 
  font-medium 
  py-2 
  px-4 
  rounded-lg 
  transform 
  transition 
  duration-300 
  hover:scale-105 
  hover:bg-red-600
`;
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/';
    });

    nav.appendChild(homeLink);
    nav.appendChild(profileLink);
    nav.appendChild(logoutButton);
  } else {
    const registerLink = document.createElement('a');
    registerLink.href = '/auth/register/';
    registerLink.className = 'hover:text-blue-500';
    registerLink.textContent = 'Register';

    const loginLink = document.createElement('a');
    loginLink.href = '/auth/login/';
    loginLink.className = 'hover:text-blue-500';
    loginLink.textContent = 'Login';

    nav.appendChild(homeLink);
    nav.appendChild(registerLink);
    nav.appendChild(loginLink);
  }

  topSection.appendChild(logoDiv);
  topSection.appendChild(nav);

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
  privacyLink.className = 'hover:text-blue-500';
  privacyLink.textContent = 'Privacy Policy';

  const termsLink = document.createElement('a');
  termsLink.href = '/terms-of-service';
  termsLink.className = 'hover:text-blue-500';
  termsLink.textContent = 'Terms of Service';

  bottomNav.appendChild(privacyLink);
  bottomNav.appendChild(termsLink);

  bottomSection.appendChild(copyright);
  bottomSection.appendChild(bottomNav);

  container.appendChild(topSection);
  container.appendChild(divider);
  container.appendChild(bottomSection);

  footer.appendChild(container);
};

setLogoutListener();

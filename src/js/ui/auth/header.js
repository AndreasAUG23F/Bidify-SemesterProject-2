/**
 * Dynamically creates and renders the header section of the website.
 * Includes navigation links, a responsive menu toggle, and logout functionality.
 * @module Header
 * @function makeHeader
 */

export const makeHeader = () => {
  const header = document.querySelector('header');
  if (!header) {
    console.error('<header> element not found in the DOM.');
    return;
  }

  header.innerHTML = '';

  const nav = document.createElement('nav');
  nav.className =
    'flex flex-col md:flex-row items-center justify-between px-6 py-4';

  const logoLink = document.createElement('a');
  logoLink.href = '/';
  const logoImg = document.createElement('img');
  logoImg.src = '/images/bidifyLogo.png';
  logoImg.alt = 'Logo';
  logoImg.className =
    'h-16 w-auto md:h-20 transition-transform transform hover:scale-110 duration-300';
  logoLink.append(logoImg);

  const navLinksDiv = document.createElement('div');
  navLinksDiv.className =
    'hidden md:flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-lg md:text-xl';

  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.textContent = 'Home';
  homeLink.className = 'font-medium text-gray-700 hover:text-gray-900';
  navLinksDiv.appendChild(homeLink);

  const token = localStorage.getItem('token');

  if (token) {
    const createListingLink = document.createElement('a');
    createListingLink.href = '/listing/create/';
    createListingLink.textContent = 'Create Listing';
    createListingLink.className =
      'font-medium text-gray-700 hover:text-gray-900';

    const profileLink = document.createElement('a');
    profileLink.href = '/profile/';
    profileLink.textContent = 'Profile';
    profileLink.className = 'font-medium text-gray-700 hover:text-gray-900';

    const logoutButton = document.createElement('button');
    logoutButton.id = 'logoutButton';
    logoutButton.textContent = 'Logout';
    logoutButton.className = `
      bg-red-500 text-white font-medium py-2 px-4 rounded-lg 
      transform transition duration-300 hover:scale-105 hover:bg-red-600
    `;
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/';
    });

    navLinksDiv.append(createListingLink, profileLink, logoutButton);
  } else {
    const registerLink = document.createElement('a');
    registerLink.href = '/auth/register/';
    registerLink.textContent = 'Register';
    registerLink.className = 'font-medium text-gray-700 hover:text-gray-900';

    const loginLink = document.createElement('a');
    loginLink.href = '/auth/login/';
    loginLink.textContent = 'Login';
    loginLink.className = 'font-medium text-gray-700 hover:text-gray-900';

    navLinksDiv.append(registerLink, loginLink);
  }

  const menuToggle = document.createElement('button');
  menuToggle.className = 'block md:hidden text-gray-700 hover:text-gray-900';
  menuToggle.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
  menuToggle.addEventListener('click', () => {
    navLinksDiv.classList.toggle('hidden');
    navLinksDiv.classList.toggle('flex');
  });

  nav.append(logoLink, navLinksDiv, menuToggle);
  header.appendChild(nav);

  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMediaChange = (e) => {
    if (e.matches) {
      navLinksDiv.classList.add('hidden');
      navLinksDiv.classList.remove('flex');
    } else {
      navLinksDiv.classList.remove('hidden');
      navLinksDiv.classList.add('flex');
    }
  };

  mediaQuery.addEventListener('change', handleMediaChange);
  handleMediaChange(mediaQuery);
};

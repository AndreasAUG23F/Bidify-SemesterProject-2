export const makeHeader = () => {
  const header = document.querySelector('header');

  const nav = document.createElement('nav');
  nav.className =
    'flex items-center justify-between px-12 py-4 md:flex-row flex-col';

  const logoDiv = document.createElement('div');
  logoDiv.className = 'flex-shrink-0';

  const logoImg = document.createElement('img');
  logoImg.src = '/images/bidifyLogo.png';
  logoImg.alt = 'Logo';
  logoImg.className = 'h-160 w-auto';

  logoDiv.appendChild(logoImg);

  const smallScreenSearch = document.createElement('a');
  smallScreenSearch.href = '#';
  smallScreenSearch.className =
    'md:hidden text-gray-700 hover:text-gray-900 text-4xl my-4';

  const smallScreenSearchIcon = document.createElement('i');
  smallScreenSearchIcon.className = 'fa-solid fa-magnifying-glass';
  smallScreenSearch.appendChild(smallScreenSearchIcon);

  const navLinksDiv = document.createElement('div');
  navLinksDiv.className =
    'flex items-center space-x-20 text-xl md:text-3xl mt-4 md:mt-0';

  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.className = 'font-medium text-gray-700 hover:text-gray-900';
  homeLink.textContent = 'Home';
  navLinksDiv.appendChild(homeLink);

  const loggedIn = localStorage.getItem('token');

  if (loggedIn) {
    const createListingLink = document.createElement('a');
    createListingLink.href = './views/postCreate.js';
    createListingLink.className =
      'font-medium text-gray-700 hover:text-gray-900';
    createListingLink.textContent = 'Create Listing';

    const profileLink = document.createElement('a');
    profileLink.href = 'views/profile.js';
    profileLink.className = 'font-medium text-gray-700 hover:text-gray-900';
    profileLink.textContent = 'Profile';

    navLinksDiv.appendChild(createListingLink);
    navLinksDiv.appendChild(profileLink);

    const logoutButton = document.createElement('button');
    logoutButton.id = 'logoutButton';
    logoutButton.className = 'text-red-500 hover:text-red-400 font-medium';
    logoutButton.textContent = 'Logout';
    navLinksDiv.appendChild(logoutButton);
  } else {
    const registerLink = document.createElement('a');
    registerLink.href = '/auth/register/';
    registerLink.className = 'font-medium text-gray-700 hover:text-gray-900';
    registerLink.textContent = 'Register';

    const loginLink = document.createElement('a');
    loginLink.href = '/auth/login/';
    loginLink.className = 'font-medium text-gray-700 hover:text-gray-900';
    loginLink.textContent = 'Login';

    navLinksDiv.appendChild(registerLink);
    navLinksDiv.appendChild(loginLink);
  }

  const largeScreenSearch = document.createElement('a');
  largeScreenSearch.href = '#';
  largeScreenSearch.className =
    'hidden md:inline text-gray-700 hover:text-gray-900';

  const largeScreenSearchIcon = document.createElement('i');
  largeScreenSearchIcon.className = 'fa-solid fa-magnifying-glass text-4xl';
  largeScreenSearch.appendChild(largeScreenSearchIcon);

  navLinksDiv.appendChild(largeScreenSearch);

  nav.appendChild(logoDiv);
  nav.appendChild(smallScreenSearch);
  nav.appendChild(navLinksDiv);

  header.appendChild(nav);
};

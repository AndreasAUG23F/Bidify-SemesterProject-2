import { displayListings } from '../../ui/listing/makeListing';
import { readListings } from '../../api/listing/read';
import { initCarousel } from '../../ui/global/carousel';
import { initSearch } from '../../ui/global/search';

function isUserLoggedIn() {
  const token = localStorage.getItem('token');
  return !!token;
}

function getUsername() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData?.name || 'User';
}

function displayLoggedInContent() {
  const landingContainer = document.getElementById('landingContainer');

  if (!landingContainer) {
    console.error('Element with ID "landingContainer" not found in the DOM.');
    return;
  }

  const username = getUsername();

  landingContainer.innerHTML = `
    <div class="w-full text-center px-4 sm:px-6 lg:px-12 pt-10 sm:pt-16 lg:pt-20">
      <h1 class="text-4xl sm:text-5xl font-bold mb-6">
        Welcome back, ${username}!
      </h1>
      <p class="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
        We're glad to have you back. Explore new auctions, place your bids, and enjoy the platform!
      </p>
    </div>
  `;
}

function displayLoggedOutContent() {
  const landingContainer = document.getElementById('landingContainer');

  if (!landingContainer) {
    console.error('Element with ID "landingContainer" not found in the DOM.');
    return;
  }

  landingContainer.innerHTML = `
    <div class="w-full text-center px-4 sm:px-6 lg:px-12 pt-10 sm:pt-16 lg:pt-20">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        The future of online auction is here!
      </h1>
      <p class="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
        Welcome to Bidify, the ultimate online auction platform where buying and selling become effortless. 
        Whether you’re looking to declutter by selling your items or discover unique finds from other users, Bidify makes it simple. 
        Create your profile, post listings with ease, and bid on items you love. Start your journey today—post, bid, and win with Bidify!
      </p>
      <div class="flex justify-center space-x-4">
        <a href="/auth/login/" class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">Login</a>
        <a href="/auth/register/" class="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">Register</a>
      </div>
    </div>
  `;
}

async function runPage() {
  try {
    const listings = await readListings();
    console.log('Listings data:', listings);
    displayListings(listings);
    await initCarousel('#carouselContainer');

    if (isUserLoggedIn()) {
      displayLoggedInContent();
    } else {
      displayLoggedOutContent();
    }

    await initSearch();
  } catch (error) {
    console.error('Error fetching or displaying listings:', error);
  }
}

runPage();

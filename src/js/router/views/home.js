import { displayListings } from '../../ui/listing/makeListing';
import { readListings } from '../../api/listing/read';
import { initCarousel } from '../../ui/global/carousel';

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

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const resultsContainer = document.getElementById('postResults');

resultsContainer.classList.add('hidden');

let allListings = [];

const fetchListings = async () => {
  try {
    allListings = await readListings(50);
    renderListings([]);
  } catch (error) {
    console.error('Error fetching listings:', error);
    resultsContainer.innerHTML =
      '<p class="text-red-500">Failed to load posts.</p>';
  }
};

const renderListings = (listings, query = '') => {
  resultsContainer.innerHTML = '';

  if (query && (!listings || listings.length === 0)) {
    resultsContainer.innerHTML =
      '<p class="text-gray-500 text-center">No results found.</p>';
    resultsContainer.classList.remove('hidden');
    return;
  }

  if (listings.length === 0) {
    resultsContainer.classList.add('hidden');
    return;
  }

  resultsContainer.classList.remove('hidden');

  listings.forEach((listing) => {
    const postCard = document.createElement('div');
    postCard.className =
      'bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl transition duration-300 overflow-hidden';

    postCard.innerHTML = `
      <div class="relative">
        <img src="${listing.media?.[0]?.url || 'https://via.placeholder.com/300x200'}" 
             alt="Post image" 
             class="w-full h-40 sm:h-48 object-cover">
      </div>
      <div class="p-4 flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <img src="${listing.seller?.avatar?.url || 'https://via.placeholder.com/50'}" 
               alt="Seller Avatar" 
               class="w-10 h-10 rounded-full object-cover border border-gray-200">
          <div>
            <h2 class="text-lg font-semibold text-gray-800 truncate">${listing.title}</h2>
            <p class="text-sm text-gray-600">Posted by: ${listing.seller?.name || 'Unknown Seller'}</p>
          </div>
        </div>
        <a href="/post/?id=${listing.id}" 
           class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition">
           Check out post
        </a>
      </div>
    `;
    resultsContainer.appendChild(postCard);
  });
};

const filterListings = (query) => {
  if (!query) {
    renderListings([]);
    return;
  }

  const filteredListings = allListings.filter((listing) =>
    listing.title.toLowerCase().includes(query.toLowerCase())
  );
  renderListings(filteredListings, query);
};

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  filterListings(query);

  clearSearch.style.display = query ? 'block' : 'none';
});

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  clearSearch.style.display = 'none';
  renderListings([]);
});

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
  } catch (error) {
    console.error('Error fetching or displaying listings:', error);
  }
}

fetchListings();
runPage();

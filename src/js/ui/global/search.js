/**
 * Handles the initialization and functionality of the search feature for listings.
 * Fetches all listings, filters them based on user input, and displays the results dynamically.
 * @module Search
 */

/**
 * Fetches all listings and initializes the display with an empty result set.
 * @async
 * @function fetchListings
 * @throws {Error} - Logs errors if listings cannot be fetched.
 */

/**
 * Renders a list of filtered listings based on the user's query.
 * If no query is provided, hides the results container.
 * @function renderListings
 * @param {Array<Object>} listings - The filtered listings to display.
 * @param {string} [query=''] - The search query used to filter listings.
 */

/**
 * Filters listings based on the search query entered by the user.
 * Updates the display with the filtered results.
 * @function filterListings
 * @param {string} query - The user's search query.
 */

/**
 * Initializes the search functionality.
 * Sets up event listeners for search input and clear button.
 * Fetches all listings to enable filtering.
 * @async
 * @function initSearch
 * @throws {Error} - Logs errors if initialization fails.
 */

import { readListings } from '../../api/listing/read';

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const resultsContainer = document.getElementById('postResults');

resultsContainer.classList.add('hidden');

let allListings = [];

const fetchListings = async () => {
  try {
    allListings = await readListings(100);
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

export const initSearch = async () => {
  await fetchListings();
};

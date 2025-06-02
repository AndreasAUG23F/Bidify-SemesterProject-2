/**
 * Initializes live search for listings.
 * Fetches all listings and filters them based on input.
 * @module Search
 */

import readListings from '../../api/listing/read/readListings';

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

  if (!listings.length) {
    resultsContainer.classList.add('hidden');
    return;
  }

  resultsContainer.classList.remove('hidden');

  listings.forEach((listing) => {
    const card = document.createElement('div');
    card.className =
      'bg-white border rounded-lg shadow overflow-hidden hover:shadow-xl transition';

    const imgUrl =
      listing.media?.[0]?.url || 'https://via.placeholder.com/300x200';
    const avatar =
      listing.seller?.avatar?.url || 'https://via.placeholder.com/50';

    card.innerHTML = `
      <div>
        <img src="${imgUrl}" alt="Listing Image" class="w-full h-48 object-cover" />
      </div>
      <div class="p-4">
        <div class="flex items-center gap-4">
          <img src="${avatar}" alt="Seller Avatar" class="w-10 h-10 rounded-full object-cover border" />
          <div>
            <h2 class="text-lg font-semibold text-gray-800 truncate">${listing.title}</h2>
            <p class="text-sm text-gray-600">Posted by: ${listing.seller?.name || 'Unknown'}</p>
          </div>
        </div>
        <a href="/listing/?id=${listing.id}" class="block mt-4 bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700 transition">
          View Listing
        </a>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
};

const filterListings = (query) => {
  const filtered = allListings.filter((l) =>
    l.title.toLowerCase().includes(query.toLowerCase())
  );
  renderListings(filtered, query);
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

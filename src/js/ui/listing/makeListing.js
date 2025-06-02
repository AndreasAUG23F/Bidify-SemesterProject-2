/**
 * Displays listings in a grid layout.
 * @module DisplayListings
 * @function displayListings
 * @param {Array<Object>} listings - Array of listing objects.
 */

export const displayListings = (listings) => {
  const listingContainer = document.getElementById('listingContainer');

  if (!listingContainer) {
    console.error('No container with id "listingContainer" found');
    return;
  }

  listingContainer.className =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto';
  listingContainer.innerHTML = '';

  if (!listings || listings.length === 0) {
    listingContainer.innerHTML =
      '<p class="text-center text-gray-500">No listings available at the moment.</p>';
    return;
  }

  listings.forEach((listing) => {
    const card = document.createElement('div');
    card.className =
      'bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center text-center opacity-0 translate-y-10 transition duration-700 ease-in-out scroll-animate';

    const image = document.createElement('img');
    image.className = 'w-full h-40 object-cover rounded-t-lg mb-4';
    image.loading = 'lazy';
    image.src =
      listing.media?.[0]?.url || 'https://via.placeholder.com/300x200';
    image.alt = listing.media?.[0]?.alt || 'Listing image';

    const title = document.createElement('h2');
    title.className = 'text-lg font-semibold text-gray-800 mb-2';
    title.textContent = listing.title;

    const description = document.createElement('p');
    description.className = 'text-sm text-gray-600 mb-4 flex-grow';
    description.textContent =
      listing.description || 'No description available.';

    const currentBid = document.createElement('p');
    currentBid.className = 'text-md font-bold text-blue-600 mb-4';
    const highestBid = Math.max(
      ...(listing.bids || []).map((b) => b.amount),
      0
    );
    currentBid.textContent =
      highestBid > 0 ? `Current Bid: ${highestBid}` : 'No Bids Yet';

    const viewButton = document.createElement('button');
    viewButton.className =
      'bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors';
    viewButton.textContent = 'View';
    viewButton.addEventListener('click', () => {
      localStorage.setItem('listingId', JSON.stringify(listing.id));
      window.location.href = `/listing/?id=${listing.id}`;
    });

    card.append(image, title, description, currentBid, viewButton);
    listingContainer.appendChild(card);
  });

  const scrollElements = document.querySelectorAll('.scroll-animate');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('opacity-100', entry.isIntersecting);
        entry.target.classList.toggle('translate-y-0', entry.isIntersecting);
        entry.target.classList.toggle('opacity-0', !entry.isIntersecting);
        entry.target.classList.toggle('translate-y-10', !entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );

  scrollElements.forEach((el) => observer.observe(el));
};

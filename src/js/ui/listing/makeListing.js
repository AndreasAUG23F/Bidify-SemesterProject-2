/**
 * Dynamically displays a list of auction listings in a grid layout with animations.
 *
 * @module DisplayListings
 * @function displayListings
 * @param {Array<Object>} listings - The array of listing objects to be displayed.
 * @param {string} listings[].id - The unique identifier for a listing.
 * @param {string} listings[].title - The title of the listing.
 * @param {string} [listings[].description] - A brief description of the listing.
 * @param {Array<Object>} [listings[].media] - An array of media objects associated with the listing.
 * @param {string} listings[].media[].url - The URL of the media item (e.g., image).
 * @param {string} [listings[].media[].alt] - The alt text for the media item.
 * @param {Array<Object>} [listings[].bids] - An array of bid objects associated with the listing.
 * @param {number} listings[].bids[].amount - The amount of a bid.
 * @throws {Error} If the listing container element is not found in the DOM.
 * @returns {void} Appends dynamically created listing elements to the DOM.
 */

export const displayListings = (listings) => {
  const listingContainer = document.getElementById('listingContainer');

  if (!listingContainer) {
    console.error('No container with id listingContainer found');
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
    const container = document.createElement('div');
    container.className =
      'bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center text-center opacity-0 translate-y-10 transition duration-700 ease-in-out scroll-animate';

    const image = document.createElement('img');
    image.className = 'w-full h-40 object-cover rounded-t-lg mb-4';
    image.loading = 'lazy';

    if (Array.isArray(listing.media) && listing.media.length > 0) {
      const mediaItem = listing.media[0];
      image.src = mediaItem.url || '';
      image.alt = mediaItem.alt || 'Listing image';
    }

    const title = document.createElement('h2');
    title.innerText = listing.title;
    title.className = 'text-lg font-semibold text-gray-800 mb-2';

    const description = document.createElement('p');
    description.innerText = listing.description || 'No description available.';
    description.className = 'text-sm text-gray-600 mb-4 flex-grow';

    const currentBid = document.createElement('p');
    currentBid.className = 'text-md font-bold text-blue-600 mb-4';
    if (
      listing.bids &&
      Array.isArray(listing.bids) &&
      listing.bids.length > 0
    ) {
      const highestBid = Math.max(...listing.bids.map((bid) => bid.amount));
      currentBid.innerText = `Current Bid: ${highestBid}`;
    } else {
      currentBid.innerText = 'No Bids Yet';
    }

    const viewButton = document.createElement('button');
    viewButton.innerText = 'View';
    viewButton.className =
      'bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors';
    viewButton.addEventListener('click', async () => {
      window.location.href = `/post/?id=${listing.id}`;
      localStorage.setItem('listingId', JSON.stringify(listing.id));
    });

    container.append(image, title, description, currentBid, viewButton);
    listingContainer.appendChild(container);
  });

  const scrollElements = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        } else {
          entry.target.classList.add('opacity-0', 'translate-y-10');
          entry.target.classList.remove('opacity-100', 'translate-y-0');
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  scrollElements.forEach((el) => observer.observe(el));
};

/**
 * Renders the listing details page.
 * @module RenderListingDetails
 * @async
 * @function renderListingDetails
 * @param {Object} listingData - Contains listing details under `data`.
 */

import fetchBid from '../../api/listing/bid/fetchBid';

export async function renderListingDetails(listingData) {
  const listing = listingData.data;
  const loggedInUser = JSON.parse(localStorage.getItem('userData'));

  const detailsContainer = document.getElementById('listingDetails');

  detailsContainer.querySelector('.title').textContent =
    listing.title || 'Product Name';

  const seller = listing.seller || {};
  detailsContainer.querySelector('.seller-avatar').src =
    seller.avatar?.url || 'default-avatar.png';
  detailsContainer.querySelector('.seller-avatar').alt =
    seller.avatar?.alt || 'Seller Avatar';
  detailsContainer.querySelector('.seller-name').textContent =
    seller.name || 'Unknown Seller';
  detailsContainer.querySelector('.seller-email').textContent =
    seller.email || '';
  detailsContainer.querySelector('.description').textContent =
    listing.description || 'No description available.';

  const carouselContainer = document.querySelector('#carouselContainer');
  const dotsContainer = document.querySelector('.dot-container');
  carouselContainer.innerHTML = '';
  dotsContainer.innerHTML = '';

  listing.media?.forEach((media, index) => {
    const slide = document.createElement('img');
    slide.src = media.url;
    slide.alt = media.alt || `Image ${index + 1}`;
    slide.className = `carousel-slide ${index === 0 ? 'block' : 'hidden'} w-full h-full object-cover rounded-lg`;

    const dot = document.createElement('span');
    dot.className = `dot ${index === 0 ? 'bg-gray-600' : 'bg-gray-300'} h-3 w-3 rounded-full cursor-pointer`;
    dot.addEventListener('click', () => updateCarousel(index));

    carouselContainer.appendChild(slide);
    dotsContainer.appendChild(dot);
  });

  let currentSlide = 0;
  const updateCarousel = (index) => {
    currentSlide = index;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    slides.forEach((s, i) => {
      s.classList.toggle('block', i === index);
      s.classList.toggle('hidden', i !== index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('bg-gray-600', i === index);
      d.classList.toggle('bg-gray-300', i !== index);
    });
  };

  document.querySelector('.prev-button2').addEventListener('click', () => {
    currentSlide =
      (currentSlide - 1 + listing.media.length) % listing.media.length;
    updateCarousel(currentSlide);
  });

  document.querySelector('.next-button2').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % listing.media.length;
    updateCarousel(currentSlide);
  });

  const editButton = document.querySelector('#listingDetails .edit-button');
  if (loggedInUser?.name === seller.name) {
    editButton.classList.remove('hidden');
    editButton.addEventListener('click', () => {
      window.location.href = `/listing/edit/?id=${listing.id}`;
    });
  }

  const bidsContainer = document.createElement('div');
  bidsContainer.className = 'bids-container mt-8';

  const bidsTitle = document.createElement('h2');
  bidsTitle.textContent = 'Bids';
  bidsTitle.className = 'text-lg font-semibold mb-4';

  const bidsList = document.createElement('ul');
  bidsList.className = 'space-y-2';

  if (listing.bids?.length > 0) {
    listing.bids.forEach((bid) => {
      const bidItem = document.createElement('li');
      bidItem.className =
        'flex justify-between items-center p-2 bg-gray-100 rounded-lg';

      const bidderInfo = document.createElement('div');
      bidderInfo.className = 'flex items-center gap-3';

      const avatar = document.createElement('img');
      avatar.src = bid.bidder?.avatar?.url || 'https://via.placeholder.com/40';
      avatar.alt = 'Bidder Avatar';
      avatar.className = 'w-8 h-8 rounded-full';

      const name = document.createElement('span');
      name.textContent = bid.bidder?.name || 'Anonymous';
      name.className = 'font-medium';

      const amount = document.createElement('span');
      amount.textContent = `${bid.amount} USD`;
      amount.className = 'text-blue-600 font-semibold';

      bidderInfo.append(avatar, name);
      bidItem.append(bidderInfo, amount);
      bidsList.appendChild(bidItem);
    });
  } else {
    const noBids = document.createElement('p');
    noBids.textContent = 'No bids yet.';
    noBids.className = 'text-gray-500';
    bidsContainer.appendChild(noBids);
  }

  const bidForm = document.createElement('form');
  bidForm.id = 'bidForm';
  bidForm.className = 'flex items-center gap-4 mt-4';

  const bidInput = document.createElement('input');
  bidInput.type = 'number';
  bidInput.placeholder = 'Enter bid';
  bidInput.className = 'border border-gray-300 rounded-lg p-2 flex-1';

  const bidButton = document.createElement('button');
  bidButton.textContent = 'Place bid';
  bidButton.className =
    'bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700';

  bidButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const amount = Number(bidInput.value);
    const highestBid =
      listing.bids?.reduce((max, b) => Math.max(max, b.amount), 0) || 0;

    if (!loggedInUser) return alert('Log in to place a bid.');
    if (isNaN(amount) || amount <= 0) return alert('Enter a valid bid.');
    if (amount <= highestBid) {
      return alert(`Your bid must be higher than ${highestBid} USD.`);
    }

    fetchBid(amount, listing.id);
  });

  bidForm.append(bidInput, bidButton);

  const endTime = document.createElement('p');
  endTime.className = 'text-sm text-gray-700 mt-2';
  endTime.textContent = `⏰ Ends at: ${listing.endsAt ? new Date(listing.endsAt).toLocaleString() : 'Not set'}`;

  bidsContainer.append(bidsTitle, bidsList, endTime, bidForm);
  detailsContainer.appendChild(bidsContainer);
}

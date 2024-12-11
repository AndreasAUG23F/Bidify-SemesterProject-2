import { placeBid } from '../../api/listing/bid';

export async function renderListingDetails(listingData) {
  const listing = listingData.data;
  const loggedInUser = JSON.parse(localStorage.getItem('userData'));

  const titleElement = document.querySelector('#listingDetails .title');
  titleElement.textContent = listing.title || 'Product Name';

  const sellerAvatar = document.querySelector('#listingDetails .seller-avatar');
  sellerAvatar.src = listing.seller?.avatar?.url || 'default-avatar.png';
  sellerAvatar.alt = listing.seller?.avatar?.alt || 'Seller Avatar';

  const sellerName = document.querySelector('#listingDetails .seller-name');
  sellerName.textContent = listing.seller?.name || 'Unknown Seller';

  const sellerEmail = document.querySelector('#listingDetails .seller-email');
  sellerEmail.textContent = listing.seller?.email || '';

  const descriptionElement = document.querySelector(
    '#listingDetails .description'
  );
  descriptionElement.textContent =
    listing.description || 'No description available.';

  const endAtElement = document.createElement('p');
  endAtElement.className =
    'end-at text-gray-700 text-lg font-semibold py-2 px-4 bg-yellow-100 border border-yellow-300 rounded-lg';
  endAtElement.textContent = `⏰ Auction Ends At: ${
    listing.endsAt
      ? new Date(listing.endsAt).toLocaleString()
      : 'No end time specified'
  }`;

  const detailsContainer = document.getElementById('listingDetails');

  const carouselContainer = document.querySelector('#carouselContainer');
  const dotsContainer = document.querySelector('.dot-container');
  carouselContainer.innerHTML = '';
  dotsContainer.innerHTML = '';

  listing.media?.forEach((mediaItem, index) => {
    const slide = document.createElement('img');
    slide.src = mediaItem.url;
    slide.alt = mediaItem.alt || `Image ${index + 1}`;
    slide.className = `carousel-slide ${
      index === 0 ? 'block' : 'hidden'
    } w-full h-full object-cover rounded-lg`;

    const dot = document.createElement('span');
    dot.className = `dot ${
      index === 0 ? 'bg-gray-600' : 'bg-gray-300'
    } h-3 w-3 rounded-full cursor-pointer transition hover:bg-gray-400`;
    dot.addEventListener('click', () => updateCarousel(index));

    carouselContainer.append(slide);
    dotsContainer.append(dot);
  });

  let currentSlide = 0;

  function updateCarousel(index) {
    currentSlide = index;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    slides.forEach((slide, i) => {
      slide.classList.toggle('block', i === index);
      slide.classList.toggle('hidden', i !== index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-gray-600', i === index);
      dot.classList.toggle('bg-gray-300', i !== index);
    });
  }

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
  if (loggedInUser?.name === listing.seller.name) {
    editButton.classList.remove('hidden');
    editButton.addEventListener('click', () => {
      window.location.href = `/post/edit/?id=${listing.id}`;
    });
  }

  const bidsContainer = document.createElement('div');
  bidsContainer.className = 'bids-container mt-8';

  const bidsTitle = document.createElement('h2');
  bidsTitle.textContent = 'Bids';
  bidsTitle.className = 'text-lg font-semibold mb-4';

  const bidsList = document.createElement('ul');
  bidsList.className = 'bids-list space-y-2';

  if (listing.bids?.length > 0) {
    listing.bids.forEach((bid) => {
      const bidItem = document.createElement('li');
      bidItem.className =
        'flex justify-between items-center p-2 bg-gray-100 rounded-lg';

      const bidderInfo = document.createElement('div');
      bidderInfo.className = 'flex items-center gap-3';

      const bidderAvatar = document.createElement('img');
      bidderAvatar.src =
        bid.bidder?.avatar?.url || 'https://via.placeholder.com/40';
      bidderAvatar.alt = 'Bidder Avatar';
      bidderAvatar.className = 'w-8 h-8 rounded-full object-cover';

      const bidderName = document.createElement('span');
      bidderName.textContent = bid.bidder?.name || 'Anonymous';
      bidderName.className = 'font-medium';

      const bidAmount = document.createElement('span');
      bidAmount.textContent = `${bid.amount} USD`;
      bidAmount.className = 'text-blue-600 font-semibold';

      bidderInfo.append(bidderAvatar, bidderName);
      bidItem.append(bidderInfo, bidAmount);
      bidsList.append(bidItem);
    });
  } else {
    const noBidsMessage = document.createElement('p');
    noBidsMessage.textContent = 'No bids yet.';
    noBidsMessage.className = 'text-gray-500';
    bidsContainer.append(noBidsMessage);
  }

  const bidForm = document.createElement('form');
  bidForm.className = 'flex items-center gap-4 mt-4';
  bidForm.id = 'bidForm';

  const bidInput = document.createElement('input');
  bidInput.type = 'number';
  bidInput.placeholder = 'Enter bid';
  bidInput.className =
    'border border-gray-300 rounded-lg p-2 flex-1 focus:ring focus:ring-blue-300 outline-none';

  const bidButton = document.createElement('button');
  bidButton.textContent = 'Place bid';
  bidButton.className =
    'bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700';

  bidButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem('userData'));
    if (!loggedInUser) {
      alert('You need to log in to place a bid.');
      return;
    }

    const bidAmount = Number(bidInput.value);

    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    const highestBid =
      listing.bids?.reduce((max, bid) => Math.max(max, bid.amount), 0) || 0;

    if (bidAmount <= highestBid) {
      alert(
        `Your bid must be higher than the current highest bid of ${highestBid} USD.`
      );
      return;
    }

    placeBid(bidAmount, listing.id);
  });

  bidForm.append(bidInput, bidButton);
  bidsContainer.append(bidsTitle, bidsList, endAtElement, bidForm);

  detailsContainer.appendChild(bidsContainer);
}

/* export async function renderListingDetails(listingData) {
  const container = document.getElementById('listingDetails');
  const listing = listingData.data;
  const loggedInUser = JSON.parse(localStorage.getItem('userData'));
  container.innerHTML = '';

  const title = document.createElement('div');
  title.textContent = listing.title || 'Product Name';
  title.style.fontSize = '32px';
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '20px';

  const description = document.createElement('div');
  description.textContent = listing.description || 'No description available.';
  description.style.fontSize = '16px';
  description.style.lineHeight = '1.5';
  description.style.marginBottom = '20px';

  const media = document.createElement('div');
  media.style.display = 'flex';
  media.style.flexDirection = 'column';
  media.style.alignItems = 'center';
  media.style.marginBottom = '20px';
  if (listing.media && listing.media.length > 0) {
    listing.media.forEach((item) => {
      const img = document.createElement('img');
      img.src = item.url;
      img.alt = item.alt || 'Product Image';
      img.style.width = '100%';
      img.style.maxWidth = '800px';
      img.style.height = 'auto';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '8px';
      img.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      img.style.marginBottom = '10px';
      media.appendChild(img);
    });
  }

  const sellerInfo = document.createElement('div');
  sellerInfo.style.display = 'flex';
  sellerInfo.style.alignItems = 'center';
  sellerInfo.style.marginBottom = '20px';
  sellerInfo.style.gap = '10px';

  const sellerAvatar = document.createElement('div');
  const avatarImg = document.createElement('img');
  avatarImg.src = listing.seller.avatar?.url || 'default-avatar.png';
  avatarImg.alt = listing.seller.avatar?.alt || 'Seller Avatar';
  avatarImg.style.width = '60px';
  avatarImg.style.height = '60px';
  avatarImg.style.borderRadius = '50%';
  avatarImg.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  sellerAvatar.appendChild(avatarImg);

  const sellerDetails = document.createElement('div');
  const sellerName = document.createElement('div');
  sellerName.textContent = listing.seller.name || 'Unknown Seller';
  sellerName.style.fontSize = '16px';
  sellerName.style.fontWeight = 'bold';
  sellerName.style.color = '#333';

  const sellerEmail = document.createElement('div');
  sellerEmail.textContent = listing.seller.email || '';
  sellerEmail.style.fontSize = '14px';
  sellerEmail.style.color = '#555';

  const sellerBio = document.createElement('div');
  sellerBio.textContent = listing.seller.bio || '';
  sellerBio.style.fontStyle = 'italic';
  sellerBio.style.color = '#555';
  sellerDetails.append(sellerName, sellerEmail, sellerBio);
  sellerInfo.append(sellerAvatar, sellerDetails);

  if (loggedInUser?.name === listing.seller.name) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.padding = '10px 20px';
    editButton.style.backgroundColor = '#007BFF';
    editButton.style.color = '#fff';
    editButton.style.border = 'none';
    editButton.style.borderRadius = '4px';
    editButton.style.cursor = 'pointer';
    editButton.style.marginTop = '10px';
    editButton.addEventListener('click', () => {
      window.location.href = `/post/edit/?id=${listing.id}`;
    });
    container.appendChild(editButton);
  }
  container.append(title, description, media, sellerInfo);
}

 */

import { fetchBid } from '../../api/listing/bid';

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

    carouselContainer.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = `dot ${
      index === 0 ? 'bg-gray-600' : 'bg-gray-300'
    } h-3 w-3 rounded-full cursor-pointer transition hover:bg-gray-400`;
    dot.addEventListener('click', () => updateCarousel(index));
    dotsContainer.appendChild(dot);
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

      bidderInfo.append(bidderAvatar, bidderName);

      const bidAmount = document.createElement('span');
      bidAmount.textContent = `${bid.amount} USD`;
      bidAmount.className = 'text-blue-600 font-semibold';

      bidItem.append(bidderInfo, bidAmount);
      bidsList.appendChild(bidItem);
    });
  } else {
    const noBidsMessage = document.createElement('p');
    noBidsMessage.textContent = 'No bids yet.';
    noBidsMessage.className = 'text-gray-500';
    bidsContainer.appendChild(noBidsMessage);
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
    const bidAmount = bidInput.value;

    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    fetchBid(bidAmount, listing.id);
  });

  bidForm.append(bidInput, bidButton);
  bidsContainer.append(bidsTitle, bidsList, bidForm);

  document.getElementById('listingDetails').appendChild(bidsContainer);
}

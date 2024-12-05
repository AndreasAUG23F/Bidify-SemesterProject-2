import { onBid } from '../../ui/listing/bid';

const displayListingDetails = async () => {
  const listingContainer = document.getElementById('listingDetails');

  if (!listingContainer) {
    console.error('No container with id listingDetails found');
    return;
  }

  const listingData = localStorage.getItem('listingData');
  if (!listingData) {
    listingContainer.innerHTML = '<p>No listing found to display.</p>';
    return;
  }

  const listing = JSON.parse(listingData);
  const loggedInUser = JSON.parse(localStorage.getItem('userData'));

  listingContainer.innerHTML = '';

  const contentContainer = document.createElement('div');
  contentContainer.style.maxWidth = '800px';
  contentContainer.style.margin = '0 auto';
  contentContainer.style.paddingLeft = '50px';
  contentContainer.style.textAlign = 'left';

  const title = document.createElement('h1');
  title.innerText = listing.title || 'Product Name';
  title.style.fontSize = '32px';
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '20px';

  const sellerInfo = document.createElement('div');
  sellerInfo.style.display = 'flex';
  sellerInfo.style.alignItems = 'center';
  sellerInfo.style.marginBottom = '20px';
  sellerInfo.style.gap = '10px';

  const sellerImage = document.createElement('img');
  sellerImage.src = listing.seller?.avatar?.url || 'default-avatar.png';
  sellerImage.alt = 'Seller Avatar';
  sellerImage.style.width = '60px';
  sellerImage.style.height = '60px';
  sellerImage.style.borderRadius = '50%';
  sellerImage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

  const sellerName = document.createElement('span');
  sellerName.innerText = listing.seller?.name || 'Unknown Seller';
  sellerName.style.fontSize = '16px';
  sellerName.style.color = '#333';
  sellerName.style.fontWeight = 'bold';

  sellerInfo.append(sellerImage, sellerName);

  if (loggedInUser?.name === listing.seller?.name) {
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.style.padding = '10px 20px';
    editButton.style.marginTop = '10px';
    editButton.style.backgroundColor = '#007BFF';
    editButton.style.color = '#fff';
    editButton.style.border = 'none';
    editButton.style.borderRadius = '4px';
    editButton.style.cursor = 'pointer';

    editButton.addEventListener('click', () => {
      window.location.href = `/post/edit/?id=${listing.id}`;
    });

    contentContainer.appendChild(editButton);
  }

  contentContainer.append(title, sellerInfo);

  const mainImageContainer = document.createElement('div');
  mainImageContainer.className =
    'relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'flex transition-transform duration-500 ease-in-out';

  listing.media?.forEach((mediaItem) => {
    const image = document.createElement('img');
    image.src = mediaItem?.url || 'placeholder.png';
    image.alt = mediaItem?.alt || 'Product Image';
    image.className = 'w-full h-auto object-cover flex-shrink-0';
    imageWrapper.appendChild(image);
  });
  mainImageContainer.appendChild(imageWrapper);

  const prevButton = document.createElement('button');
  prevButton.className =
    'absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75';
  prevButton.innerHTML = '&#8249;';
  prevButton.addEventListener('click', () => navigateSlide(-1));

  const nextButton = document.createElement('button');
  nextButton.className =
    'absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75';
  nextButton.innerHTML = '&#8250;';
  nextButton.addEventListener('click', () => navigateSlide(1));

  mainImageContainer.appendChild(prevButton);
  mainImageContainer.appendChild(nextButton);

  const dotsContainer = document.createElement('div');
  dotsContainer.className =
    'absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2';
  const dots = [];

  listing.media?.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className =
      'w-3 h-3 bg-gray-400 rounded-full hover:bg-gray-600 cursor-pointer transition duration-300';
    dot.addEventListener('click', () => navigateToSlide(index));
    dots.push(dot);
    dotsContainer.appendChild(dot);
  });
  mainImageContainer.appendChild(dotsContainer);

  let currentSlide = 0;
  const totalSlides = listing.media?.length || 0;

  const navigateSlide = (direction) => {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
  };

  const navigateToSlide = (index) => {
    currentSlide = index;
    updateCarousel();
  };

  const updateCarousel = () => {
    imageWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('bg-gray-800');
        dot.classList.remove('bg-gray-400');
      } else {
        dot.classList.add('bg-gray-400');
        dot.classList.remove('bg-gray-800');
      }
    });
  };

  updateCarousel();

  const infoSection = document.createElement('div');
  infoSection.innerHTML = `<h2>Info</h2><p>${listing.description || 'No description available.'}</p>`;
  infoSection.style.fontSize = '16px';
  infoSection.style.lineHeight = '1.5';
  infoSection.style.marginBottom = '20px';

  if (listing.endsAt) {
    const endDateSection = document.createElement('div');
    const formattedDate = new Date(listing.endsAt).toLocaleString();
    endDateSection.innerHTML = `<h3>Bid Ends:</h3><p>${formattedDate}</p>`;
    endDateSection.style.marginBottom = '20px';
    infoSection.appendChild(endDateSection);
  }

  const bidsSection = document.createElement('div');
  bidsSection.innerHTML = `<h2>Last Bids</h2>`;
  bidsSection.style.marginBottom = '20px';

  const bidList = document.createElement('ul');
  bidList.style.listStyleType = 'none';
  bidList.style.padding = '0';

  const sortedBids = listing.bids?.sort((a, b) => b.amount - a.amount) || [];
  const topBids = sortedBids.slice(0, 4);

  console.log('topBids', topBids);
  console.log('listing', listing);

  if (topBids.length > 0) {
    topBids.forEach((bid) => {
      const listItem = document.createElement('li');
      listItem.style.display = 'flex';
      listItem.style.justifyContent = 'space-between';
      listItem.style.padding = '10px';
      listItem.style.borderBottom = '1px solid #ddd';

      const bidderInfo = document.createElement('div');
      bidderInfo.style.display = 'flex';
      bidderInfo.style.alignItems = 'center';
      bidderInfo.style.gap = '10px';

      const bidderAvatar = document.createElement('img');
      bidderAvatar.src = bid.bidder?.avatar?.url || 'default-avatar.png';
      bidderAvatar.alt = 'Bidder Avatar';
      bidderAvatar.style.width = '40px';
      bidderAvatar.style.height = '40px';
      bidderAvatar.style.borderRadius = '50%';

      const bidderName = document.createElement('span');
      bidderName.innerText = bid.bidder?.name || 'Anonymous';
      bidderName.style.fontWeight = 'bold';

      bidderInfo.append(bidderAvatar, bidderName);

      const bidAmount = document.createElement('span');
      bidAmount.innerText = `${bid.amount} USD`;
      bidAmount.style.color = '#007BFF';

      listItem.append(bidderInfo, bidAmount);
      bidList.appendChild(listItem);
    });
  } else {
    const noBids = document.createElement('p');
    noBids.innerText = 'No bids yet.';
    bidsSection.appendChild(noBids);
  }

  bidsSection.appendChild(bidList);

  const bidForm = document.createElement('form');
  bidForm.style.display = 'flex';
  bidForm.style.justifyContent = 'center';
  bidForm.style.alignItems = 'center';
  bidForm.style.marginTop = '20px';

  const bidInput = document.createElement('input');
  bidInput.name = 'bidAmount';
  bidInput.type = 'number';
  bidInput.placeholder = 'Enter bid';
  bidInput.style.marginRight = '10px';
  bidInput.style.padding = '10px';
  bidInput.style.border = '1px solid #ccc';
  bidInput.style.borderRadius = '4px';

  const bidButton = document.createElement('button');
  bidButton.innerText = 'Place Bid';
  bidButton.style.padding = '10px 20px';
  bidButton.style.backgroundColor = '#007BFF';
  bidButton.style.color = '#fff';
  bidButton.style.border = 'none';
  bidButton.style.borderRadius = '4px';
  bidButton.style.cursor = 'pointer';

  bidForm.append(bidInput, bidButton);

  contentContainer.append(
    title,
    sellerInfo,
    mainImageContainer,
    infoSection,
    bidsSection,
    bidForm
  );

  listingContainer.appendChild(contentContainer);
  bidForm.addEventListener('submit', onBid);
};

displayListingDetails();

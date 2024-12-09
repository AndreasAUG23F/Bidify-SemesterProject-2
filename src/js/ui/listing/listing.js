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

export async function renderListingDetails(listingData) {
  const listing = listingData.data;
  const loggedInUser = JSON.parse(localStorage.getItem('userData'));

  // Tittel
  const titleElement = document.querySelector('#listingDetails .title');
  titleElement.textContent = listing.title || 'Product Name';

  // Selgerinfo
  const sellerAvatar = document.querySelector('#listingDetails .seller-avatar');
  sellerAvatar.src = listing.seller?.avatar?.url || 'default-avatar.png';
  sellerAvatar.alt = listing.seller?.avatar?.alt || 'Seller Avatar';

  const sellerName = document.querySelector('#listingDetails .seller-name');
  sellerName.textContent = listing.seller?.name || 'Unknown Seller';

  const sellerEmail = document.querySelector('#listingDetails .seller-email');
  sellerEmail.textContent = listing.seller?.email || '';

  // Beskrivelse
  const descriptionElement = document.querySelector(
    '#listingDetails .description'
  );
  descriptionElement.textContent =
    listing.description || 'No description available.';

  // Bildekarusell
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

  // Bud-segment
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

  bidsContainer.append(bidsTitle, bidsList);

  // Append til #listingDetails
  document.getElementById('listingDetails').appendChild(bidsContainer);
}

// export async function renderListingDetails(listingData) {
//   const container = document.getElementById('listingDetails');
//   const listing = listingData.data;

//   container.innerHTML = '';

//   const wrapper = document.createElement('div');
//   wrapper.className = 'flex flex-col items-center gap-8 p-6';

//   const title = document.createElement('h1');
//   title.textContent = listing.title || 'Product Name';
//   title.className = 'text-4xl font-bold text-center';

//   const sellerInfo = document.createElement('div');
//   sellerInfo.className = 'flex items-center gap-4';

//   const sellerAvatar = document.createElement('img');
//   sellerAvatar.src = listing.seller?.avatar?.url || 'default-avatar.png';
//   sellerAvatar.alt = listing.seller?.avatar?.alt || 'Seller Avatar';
//   sellerAvatar.className = 'w-16 h-16 rounded-full object-cover';

//   const sellerName = document.createElement('span');
//   sellerName.textContent = listing.seller?.name || 'Unknown Seller';
//   sellerName.className = 'text-lg font-semibold';

//   sellerInfo.append(sellerAvatar, sellerName);

//   const mainImageContainer = document.createElement('div');
//   mainImageContainer.className =
//     'relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-800';

//   const imageWrapper = document.createElement('div');
//   imageWrapper.className = 'flex transition-transform duration-500 ease-in-out';

//   const dotsContainer = document.createElement('div');
//   dotsContainer.className =
//     'absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2';

//   let currentSlide = 0;

//   listing.media?.forEach((mediaItem, index) => {
//     const image = document.createElement('img');
//     image.src = mediaItem?.url || 'placeholder.png';
//     image.alt = mediaItem?.alt || 'Product Image';
//     image.className = 'w-full h-auto object-cover flex-shrink-0';
//     imageWrapper.appendChild(image);

//     const dot = document.createElement('div');
//     dot.className =
//       'w-3 h-3 bg-gray-400 rounded-full hover:bg-gray-600 cursor-pointer transition duration-300';
//     dot.addEventListener('click', () => {
//       currentSlide = index;
//       updateCarousel();
//     });
//     dotsContainer.appendChild(dot);
//   });

//   const prevButton = document.createElement('button');
//   prevButton.className =
//     'absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75';
//   prevButton.innerHTML = '&#8249;';
//   prevButton.addEventListener('click', () => navigateSlide(-1));

//   const nextButton = document.createElement('button');
//   nextButton.className =
//     'absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75';
//   nextButton.innerHTML = '&#8250;';
//   nextButton.addEventListener('click', () => navigateSlide(1));

//   mainImageContainer.appendChild(imageWrapper);
//   mainImageContainer.appendChild(prevButton);
//   mainImageContainer.appendChild(nextButton);
//   mainImageContainer.appendChild(dotsContainer);

//   const updateCarousel = () => {
//     imageWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
//     const dots = dotsContainer.querySelectorAll('div');
//     dots.forEach((dot, index) => {
//       dot.className =
//         index === currentSlide
//           ? 'w-3 h-3 bg-gray-800 rounded-full cursor-pointer'
//           : 'w-3 h-3 bg-gray-400 rounded-full cursor-pointer';
//     });
//   };

//   const navigateSlide = (direction) => {
//     currentSlide =
//       (currentSlide + direction + listing.media.length) % listing.media.length;
//     updateCarousel();
//   };

//   updateCarousel();

//   const infoAndBids = document.createElement('div');
//   infoAndBids.className =
//     'flex flex-col lg:flex-row justify-between gap-8 w-full max-w-4xl';

//   const infoSection = document.createElement('div');
//   infoSection.className = 'flex-1';

//   const infoTitle = document.createElement('h2');
//   infoTitle.textContent = 'Info';
//   infoTitle.className = 'text-2xl font-bold mb-4';

//   const description = document.createElement('p');
//   description.textContent = listing.description || 'No description available.';
//   description.className = 'text-base text-gray-700 leading-relaxed';

//   infoSection.append(infoTitle, description);

//   const bidsSection = document.createElement('div');
//   bidsSection.className = 'flex-1';

//   const bidsTitle = document.createElement('h2');
//   bidsTitle.textContent = 'Last Bids';
//   bidsTitle.className = 'text-2xl font-bold mb-4';

//   const endDate = document.createElement('p');
//   endDate.textContent = `Ends: ${new Date(listing.endsAt).toLocaleDateString()}`;
//   endDate.className = 'text-base text-gray-600 mb-4';

//   const bidList = document.createElement('ul');
//   bidList.className = 'list-none space-y-2';

//   const sortedBids = listing.bids?.sort((a, b) => b.amount - a.amount) || [];
//   const topBids = sortedBids.slice(0, 4);

//   if (topBids.length > 0) {
//     topBids.forEach((bid) => {
//       const listItem = document.createElement('li');
//       listItem.className = 'flex justify-between items-center';

//       const bidderInfo = document.createElement('div');
//       bidderInfo.className = 'flex items-center gap-2';

//       const bidderAvatar = document.createElement('img');
//       bidderAvatar.src = bid.bidder?.avatar?.url || 'default-avatar.png';
//       bidderAvatar.alt = 'Bidder Avatar';
//       bidderAvatar.className = 'w-8 h-8 rounded-full';

//       const bidderName = document.createElement('span');
//       bidderName.textContent = bid.bidder?.name || 'Anonymous';
//       bidderName.className = 'font-semibold text-gray-800';

//       bidderInfo.append(bidderAvatar, bidderName);

//       const bidAmount = document.createElement('span');
//       bidAmount.textContent = `${bid.amount} USD`;
//       bidAmount.className = 'text-blue-600 font-semibold';

//       listItem.append(bidderInfo, bidAmount);
//       bidList.appendChild(listItem);
//     });
//   } else {
//     const noBids = document.createElement('p');
//     noBids.textContent = 'No bids yet.';
//     noBids.className = 'text-base text-gray-600';
//     bidsSection.appendChild(noBids);
//   }

//   const bidForm = document.createElement('form');
//   bidForm.className = 'flex items-center gap-4 mt-4';

//   bidForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const bidAmount = bidInput.value; // Hent budbeløpet fra input-feltet

//     if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
//       alert('Please enter a valid bid amount.');
//       return;
//     }

//     if (!listing.id) {
//       alert('Listing ID is missing. Please refresh the page.');
//       return;
//     }

//     /* fetchBid(bidAmount, listing.id); */
//   });

//   const bidInput = document.createElement('input');
//   bidInput.type = 'number';
//   bidInput.placeholder = 'Enter bid';
//   bidInput.className =
//     'border border-gray-300 rounded-lg p-2 flex-1 focus:ring focus:ring-blue-300 outline-none';

//   const bidButton = document.createElement('button');
//   bidButton.textContent = 'Place bid';
//   bidButton.className =
//     'bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700';
//   bidButton.addEventListener('click', async (event) => {
//     window.location.reload();
//     event.preventDefault();
//     const bidAmount = bidInput.value;
//     if (!bidAmount) {
//       return;
//     }
//     /* await fetchBid(bidAmount, listing.id); */
//   });

//   bidForm.append(bidInput, bidButton);

//   bidsSection.append(bidsTitle, endDate, bidList, bidForm);

//   infoAndBids.append(infoSection, bidsSection);
//   wrapper.append(title, sellerInfo, mainImageContainer, infoAndBids);

//   container.appendChild(wrapper);
// }

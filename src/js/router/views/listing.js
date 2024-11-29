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

  console.log('Listing Data:', listing);

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
  sellerImage.src = listing.seller?.avatar.url || 'default-avatar.png';
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

  const mainImageContainer = document.createElement('div');
  mainImageContainer.style.textAlign = 'center';
  mainImageContainer.style.marginBottom = '20px';

  const mainImage = document.createElement('img');
  mainImage.src = listing.media?.[0]?.url || 'placeholder.png';
  mainImage.alt = listing.media?.[0]?.alt || 'Main Image';
  mainImage.style.width = '80%';
  mainImage.style.maxWidth = '400px';
  mainImage.style.height = 'auto';
  mainImage.style.borderRadius = '10px';
  mainImage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  mainImage.style.marginBottom = '10px';

  mainImageContainer.appendChild(mainImage);

  const infoSection = document.createElement('div');
  infoSection.innerHTML = `<h2>Info</h2><p>${listing.description || 'No description available.'}</p>`;
  infoSection.style.fontSize = '16px';
  infoSection.style.lineHeight = '1.5';
  infoSection.style.marginBottom = '20px';

  if (listing.endDate) {
    const endDateSection = document.createElement('div');
    const formattedDate = new Date(listing.endDate).toLocaleString();
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
      bidderAvatar.src = bid.bidder?.avatar.url || 'default-avatar.png';
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

  const bidForm = document.createElement('div');
  bidForm.style.display = 'flex';
  bidForm.style.justifyContent = 'center';
  bidForm.style.alignItems = 'center';
  bidForm.style.marginTop = '20px';

  const bidInput = document.createElement('input');
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

  bidButton.addEventListener('click', () => {
    const bidValue = parseFloat(bidInput.value);
    if (isNaN(bidValue) || bidValue <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    alert(`Bid of ${bidValue} USD placed!`);
    bidInput.value = '';
  });

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
};

displayListingDetails();

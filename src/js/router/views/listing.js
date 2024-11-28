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

  listingContainer.innerHTML = '';

  const image = document.createElement('img');
  image.src =
    listing.media && listing.media[0]?.url ? listing.media[0].url : '';
  image.alt =
    listing.media && listing.media[0]?.alt
      ? listing.media[0].alt
      : 'Listing Image';
  image.style.width = '100%';
  image.style.height = 'auto';
  image.style.marginBottom = '20px';

  const title = document.createElement('h1');
  title.innerText = listing.title;
  title.style.fontSize = '24px';
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '10px';

  const description = document.createElement('p');
  description.innerText = listing.description;
  description.style.fontSize = '16px';
  description.style.marginBottom = '20px';

  const currentBid = document.createElement('p');
  if (listing.bids && Array.isArray(listing.bids) && listing.bids.length > 0) {
    const highestBid = Math.max(...listing.bids.map((bid) => bid.amount));
    currentBid.innerText = `Current Bid: ${highestBid}`;
  } else {
    currentBid.innerText = 'No Bids Yet';
  }
  currentBid.style.fontSize = '18px';
  currentBid.style.fontWeight = 'bold';
  currentBid.style.color = '#007BFF';
  currentBid.style.marginBottom = '20px';

  const sellerInfo = document.createElement('p');
  sellerInfo.innerText = `Seller: ${listing.seller ? listing.seller.name : 'Unknown'}`;
  sellerInfo.style.fontSize = '14px';
  sellerInfo.style.color = '#555';
  sellerInfo.style.marginBottom = '10px';

  listingContainer.append(image, title, description, currentBid, sellerInfo);
};

displayListingDetails();

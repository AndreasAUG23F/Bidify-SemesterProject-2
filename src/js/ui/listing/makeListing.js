export const displayListings = (listings) => {
  const listingContainer = document.getElementById('listingContainer');

  if (!listingContainer) {
    console.error('No container with id listingContainer found');
    return;
  }

  listingContainer.style.display = 'grid';
  listingContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
  listingContainer.style.gap = '20px';
  listingContainer.style.justifyContent = 'center';
  listingContainer.style.alignItems = 'center';
  listingContainer.style.padding = '20px';
  listingContainer.style.maxWidth = '1200px';
  listingContainer.style.margin = '0 auto';

  listingContainer.innerHTML = '';

  if (!listings || listings.length === 0) {
    listingContainer.innerHTML = '<p>No listings available at the moment.</p>';
    return;
  }

  listings.forEach((listing) => {
    const container = document.createElement('div');
    container.className = 'listingCard';
    container.style.background = '#ffffff';
    container.style.border = '1px solid #ddd';
    container.style.borderRadius = '8px';
    container.style.overflow = 'hidden';
    container.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    container.style.textAlign = 'center';
    container.style.padding = '15px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.height = '400px';
    container.style.boxSizing = 'border-box';

    const image = document.createElement('img');
    image.className = 'listingImage';
    image.loading = 'lazy';
    image.style.width = '100%';
    image.style.height = '150px';
    image.style.objectFit = 'cover';
    image.style.borderRadius = '8px 8px 0 0';
    image.style.marginBottom = '10px';

    if (Array.isArray(listing.media) && listing.media.length > 0) {
      const mediaItem = listing.media[0];
      image.src = mediaItem.url || '';
      image.alt = mediaItem.alt || 'Listing image';
    }

    const title = document.createElement('h2');
    title.innerText = listing.title;
    title.className = 'listingTitle';
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    title.style.color = '#333';
    title.style.margin = '10px 0';

    const description = document.createElement('p');
    description.innerText = listing.description;
    description.className = 'listingDescription';
    description.style.fontSize = '14px';
    description.style.color = '#555';
    description.style.margin = '10px 0';
    description.style.flexGrow = '1';

    const currentBid = document.createElement('p');
    currentBid.className = 'currentBid';
    currentBid.style.fontSize = '16px';
    currentBid.style.fontWeight = 'bold';
    currentBid.style.color = '#007BFF';
    currentBid.style.margin = '10px 0';
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
    viewButton.innerText = 'View Listing';
    viewButton.className = 'viewButton';
    viewButton.style.backgroundColor = '#007BFF';
    viewButton.style.color = 'white';
    viewButton.style.border = 'none';
    viewButton.style.borderRadius = '4px';
    viewButton.style.padding = '10px 20px';
    viewButton.style.cursor = 'pointer';
    viewButton.style.fontSize = '14px';
    viewButton.style.marginTop = 'auto';

    viewButton.addEventListener('click', () => {
      window.location.href = `post/index.html?id=${listing.id}`;
    });

    viewButton.addEventListener('mouseover', () => {
      viewButton.style.backgroundColor = '#0056b3';
    });
    viewButton.addEventListener('mouseout', () => {
      viewButton.style.backgroundColor = '#007BFF';
    });

    container.append(image, title, description, currentBid, viewButton);
    listingContainer.appendChild(container);
  });
};

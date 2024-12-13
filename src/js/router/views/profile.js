/**
 * Renders the user's profile page, including profile information and listings.
 * Allows updating the profile and managing auction listings.
 * @module ProfilePage
 */

import { readProfile, readUserListings } from '../../api/profile/read';
import { onUpdateProfile } from '../../ui/profile/update';
import { deleteListing } from '../../api/listing/delete';

const form = document.getElementById('updateProfile');
form.addEventListener('submit', onUpdateProfile);

const userData = JSON.parse(localStorage.getItem('userData'));
const username = userData.name;

export const renderProfilePage = async () => {
  const outerContainer = document.getElementById('outerContainer');
  outerContainer.innerHTML = '';

  const mainContainer = document.createElement('div');
  mainContainer.className = 'flex flex-col items-center w-full';

  const userProfile = await readProfile(username);

  const profileContainer = document.createElement('div');
  profileContainer.className = 'flex flex-col items-center w-full';

  const bannerContainer = document.createElement('div');
  bannerContainer.className = 'relative w-full';
  bannerContainer.style.minHeight = '40vh';
  bannerContainer.style.backgroundImage = `url(${userProfile.banner?.url || 'default-banner.png'})`;
  bannerContainer.style.backgroundSize = 'cover';
  bannerContainer.style.backgroundPosition = 'center';

  const avatarContainer = document.createElement('div');
  avatarContainer.className =
    'absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32';
  const avatar = document.createElement('img');
  avatar.src = userProfile.avatar?.url || 'default-avatar.png';
  avatar.alt = 'User Avatar';
  avatar.className =
    'w-full h-full rounded-full border-4 border-white shadow-lg object-cover';
  avatarContainer.appendChild(avatar);
  bannerContainer.appendChild(avatarContainer);

  const nameElement = document.createElement('h2');
  nameElement.innerText = username;
  nameElement.className = 'text-xl font-semibold mt-16 text-center';

  const bioElement = document.createElement('p');
  bioElement.innerText = userProfile.bio || 'No bio available.';
  bioElement.className = 'text-gray-500 mt-2 text-center';

  const coinsElement = document.createElement('div');
  coinsElement.className = 'flex items-center space-x-2 text-gray-600 mt-2';
  coinsElement.innerHTML = `<span class="text-lg font-medium">${userProfile.credits || 0}</span>
                          <i class="fa-solid fa-coins text-yellow-500"></i>`;

  const updateProfileButton = document.createElement('button');
  updateProfileButton.innerText = 'Update Profile';
  updateProfileButton.className =
    'mt-9 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition';
  const updateProfileDiv = document.getElementById('updateProfileDiv');
  updateProfileDiv.style.position = 'absolute';
  updateProfileDiv.style.top = '50%';
  updateProfileDiv.style.left = '50%';
  updateProfileDiv.style.transform = 'translate(-50%, -50%)';
  updateProfileDiv.style.zIndex = '10';

  updateProfileButton.addEventListener('click', () => {
    updateProfileDiv.classList.remove('hidden');
  });

  profileContainer.append(
    bannerContainer,
    nameElement,
    bioElement,
    coinsElement,
    updateProfileButton
  );

  const closeProfileButton = document.getElementById('closeProfileButton');
  if (closeProfileButton) {
    closeProfileButton.style.position = 'absolute';
    closeProfileButton.style.top = '10px';
    closeProfileButton.style.right = '10px';
    closeProfileButton.style.zIndex = '15';

    closeProfileButton.addEventListener('click', () => {
      updateProfileDiv.classList.add('hidden');
    });
  }

  mainContainer.appendChild(profileContainer);

  const listingsContainer = document.createElement('div');
  listingsContainer.id = 'listingsContainer';
  listingsContainer.className = 'w-full mt-8';
  mainContainer.appendChild(listingsContainer);

  outerContainer.appendChild(mainContainer);

  await userListing();
  await userWins();
};

async function userListing() {
  const listingsContainer = document.getElementById('listingsContainer');

  listingsContainer.innerHTML =
    '<h3 class="text-xl font-semibold mb-4">Your Listings</h3>';

  try {
    const listings = await readUserListings();
    if (!listings || listings.length === 0) {
      listingsContainer.innerHTML += '<p>No listings found.</p>';
      return;
    }

    listingsContainer.className = 'flex flex-wrap justify-center gap-6';

    listings.forEach((listing) => {
      const card = document.createElement('div');
      card.className =
        'listing-card border p-4 rounded-lg shadow-md w-80 text-center bg-white hover:shadow-lg hover:scale-105 transition-transform';

      const title = document.createElement('h2');
      title.textContent = listing.title || 'No Title';
      title.className = 'font-bold text-lg mb-2';
      card.appendChild(title);

      if (listing.media && listing.media[0]?.url) {
        const img = document.createElement('img');
        img.src = listing.media[0].url;
        img.alt = listing.title || 'Listing Image';
        img.className = 'w-full h-48 object-cover mb-4 cursor-pointer rounded';

        img.addEventListener('click', () => {
          window.location.href = `/listing/?id=${listing.id}`;
          localStorage.setItem('listingId', JSON.stringify(listing.id));
        });

        card.appendChild(img);
      } else {
        const placeholder = document.createElement('div');
        placeholder.className =
          'w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4';
        placeholder.textContent = 'No Image';
        card.appendChild(placeholder);
      }

      const bidCount = document.createElement('p');
      bidCount.textContent = `Bids: ${listing._count?.bids || 0}`;
      bidCount.className = 'text-gray-600';
      card.appendChild(bidCount);

      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'flex justify-center gap-4 mt-4';

      const monitorButton = document.createElement('button');
      monitorButton.textContent = 'Monitor Listing';
      monitorButton.className =
        'bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition';
      monitorButton.addEventListener('click', () => {
        window.location.href = `/listing/?id=${listing.id}`;
        localStorage.setItem('listingId', JSON.stringify(listing.id));
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className =
        'bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition';
      deleteButton.addEventListener('click', async (event) => {
        event.stopPropagation();
        const confirmDelete = confirm(
          `Are you sure you want to delete the listing: "${listing.title}"?`
        );
        if (confirmDelete) {
          try {
            await deleteListing(listing.id);
            alert('Listing deleted successfully.');
            userListing();
          } catch (error) {
            console.error('Error deleting listing:', error);
            alert('Failed to delete listing. Please try again later.');
          }
        }
      });

      buttonContainer.appendChild(monitorButton);
      buttonContainer.appendChild(deleteButton);

      card.appendChild(buttonContainer);

      listingsContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching user listings:', error);
    listingsContainer.innerHTML =
      '<p>Error loading listings. Please try again later.</p>';
  }
}

async function userWins() {
  const winsContainer = document.createElement('div');
  winsContainer.id = 'winsContainer';
  winsContainer.className = 'w-full mt-8';

  const listingsContainer = document.getElementById('outerContainer');
  listingsContainer.appendChild(winsContainer);

  winsContainer.innerHTML =
    '<h3 class="text-xl font-semibold mb-4">Won Listings</h3>';

  try {
    const userProfile = await readProfile(username);
    const wins = userProfile.wins;

    if (!wins || wins.length === 0) {
      winsContainer.innerHTML += '<p>No won listings found.</p>';
      return;
    }

    const winsGrid = document.createElement('div');
    winsGrid.className = 'flex flex-wrap justify-center gap-6';
    winsContainer.appendChild(winsGrid);

    wins.forEach((win) => {
      const card = document.createElement('div');
      card.className =
        'listing-card border p-4 rounded-lg shadow-md w-80 text-center bg-white hover:shadow-lg hover:scale-105 transition-transform';

      const title = document.createElement('h2');
      title.textContent = win.title || 'No Title';
      title.className = 'font-bold text-lg mb-2';
      card.appendChild(title);

      if (win.media && win.media[0]?.url) {
        const img = document.createElement('img');
        img.src = win.media[0].url;
        img.alt = win.title || 'Listing Image';
        img.className = 'w-full h-48 object-cover mb-4 cursor-pointer rounded';

        img.addEventListener('click', () => {
          window.location.href = `/listing/?id=${win.id}`;
          localStorage.setItem('listingId', JSON.stringify(win.id));
        });

        card.appendChild(img);
      } else {
        const placeholder = document.createElement('div');
        placeholder.className =
          'w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4';
        placeholder.textContent = 'No Image';
        card.appendChild(placeholder);
      }

      const auctionendsAt = document.createElement('p');
      auctionendsAt.textContent = `Auction Ended: ${new Date(win.endsAt).toLocaleString()}`;
      auctionendsAt.className = 'text-gray-600';
      card.appendChild(auctionendsAt);

      winsGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching won listings:', error);
    winsContainer.innerHTML =
      '<p>Error loading won listings. Please try again later.</p>';
  }
}

renderProfilePage();

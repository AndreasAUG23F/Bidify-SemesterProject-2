/* import { setLogoutListener } from '../../ui/global/logout';
import { readProfile, readUserBids } from '../../api/profile/read';
import { onUpdateProfile } from '../../ui/profile/update';
import { fetchBid } from '../../api/listing/bid';

setLogoutListener();

const form = document.getElementById('updateProfile');
form.addEventListener('submit', onUpdateProfile);

const userData = JSON.parse(localStorage.getItem('userData'));
const username = userData.name;

export const renderProfilePage = async () => {
  const outerContainer = document.getElementById('outerContainer');
  outerContainer.innerHTML = '';

  const userProfile = await readProfile(username);
  const userBids = await readUserBids(username);
  console.log('userBids', userBids);
  console.log(userProfile);

  const profileContainer = document.createElement('div');
  profileContainer.className = 'flex flex-col items-center w-full';

  const bannerContainer = document.createElement('div');
  bannerContainer.className = 'relative w-full h-52';
  const banner = document.createElement('img');
  banner.src = userProfile.banner?.url || 'default-banner.png';
  banner.alt = 'User Banner';
  banner.className = 'w-full h-full object-cover';
  bannerContainer.appendChild(banner);

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
    'mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition';
  const updateProfileDiv = document.getElementById('updateProfileDiv');
  updateProfileButton.addEventListener('click', () => {
    console.log('update', updateProfileDiv);
    updateProfileDiv.classList.remove('hidden');
  });

  profileContainer.append(
    bannerContainer,
    nameElement,
    bioElement,
    coinsElement,
    updateProfileButton
  );
  outerContainer.appendChild(profileContainer);

  // Adding close functionality
  const closeProfileButton = document.getElementById('closeProfileButton');
  if (closeProfileButton) {
    closeProfileButton.addEventListener('click', () => {
      updateProfileDiv.classList.add('hidden');
    });
  }

  const auctionsSection = document.createElement('div');
  auctionsSection.className = 'px-6 md:px-16 lg:px-32 mt-12';
  auctionsSection.innerHTML =
    '<h2 class="text-2xl font-bold mb-6">My auctions</h2>';

  if (userProfile.listings.length === 0) {
    auctionsSection.innerHTML +=
      '<p class="text-gray-500">No active auctions.</p>';
  } else {
    const auctionsGrid = document.createElement('div');
    auctionsGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';
    userProfile.listings.forEach((auction) => {
      const auctionCard = document.createElement('div');
      auctionCard.className =
        'flex items-center space-x-4 bg-white shadow-md p-4 rounded-lg';

      const auctionImage = document.createElement('img');
      auctionImage.src = auction.media[0].url || '/images/default-product.png';
      auctionImage.alt = auction.title;
      auctionImage.className = 'w-24 h-24 rounded-lg object-cover';

      const auctionDetails = document.createElement('div');
      auctionDetails.innerHTML = `
         <h3 class="text-lg font-medium">${auction.title}</h3>
         <p class="text-gray-500 text-sm">Current bid: $${auction.currentBid || 0}</p>
       `;

      auctionCard.append(auctionImage, auctionDetails);
      auctionsGrid.appendChild(auctionCard);
    });
    auctionsSection.appendChild(auctionsGrid);
  }


  outerContainer.appendChild(auctionsSection);
};

renderProfilePage();
fetchBid();
 */

import { setLogoutListener } from '../../ui/global/logout';
import { readProfile /* readUserBids */ } from '../../api/profile/read';
import { onUpdateProfile } from '../../ui/profile/update';
import { deleteListing } from '../../api/listing/delete';

setLogoutListener();

const form = document.getElementById('updateProfile');
form.addEventListener('submit', onUpdateProfile);

const userData = JSON.parse(localStorage.getItem('userData'));
const username = userData.name;

export const renderProfilePage = async () => {
  const outerContainer = document.getElementById('outerContainer');
  outerContainer.innerHTML = '';

  const userProfile = await readProfile(username);

  const profileContainer = document.createElement('div');
  profileContainer.className = 'flex flex-col items-center w-full';

  const bannerContainer = document.createElement('div');
  bannerContainer.className = 'relative w-full h-52';
  const banner = document.createElement('img');
  banner.src = userProfile.banner?.url || 'default-banner.png';
  banner.alt = 'User Banner';
  banner.className = 'w-full h-full object-cover';
  bannerContainer.appendChild(banner);

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
    'mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition';
  const updateProfileDiv = document.getElementById('updateProfileDiv');
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
  outerContainer.appendChild(profileContainer);

  const closeProfileButton = document.getElementById('closeProfileButton');
  if (closeProfileButton) {
    closeProfileButton.addEventListener('click', () => {
      updateProfileDiv.classList.add('hidden');
    });
  }

  const auctionsSection = document.createElement('div');
  auctionsSection.className = 'px-6 md:px-16 lg:px-32 mt-12';
  auctionsSection.innerHTML =
    '<h2 class="text-2xl font-bold mb-6">My auctions</h2>';

  if (userProfile.listings.length === 0) {
    auctionsSection.innerHTML +=
      '<p class="text-gray-500">No active auctions.</p>';
  } else {
    const auctionsGrid = document.createElement('div');
    auctionsGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

    userProfile.listings.forEach((auction) => {
      const auctionCard = document.createElement('div');
      auctionCard.className =
        'flex items-center space-x-4 bg-white shadow-md p-4 rounded-lg';

      const auctionImage = document.createElement('img');
      auctionImage.src = auction.media[0]?.url || '/images/default-product.png';
      auctionImage.alt = auction.title;
      auctionImage.className = 'w-24 h-24 rounded-lg object-cover';

      const auctionDetails = document.createElement('div');
      auctionDetails.innerHTML = `
         <h3 class="text-lg font-medium">${auction.title}</h3>
         <p class="text-gray-500 text-sm">Current bid: $${auction.currentBid || 0}</p>
       `;

      const deleteButton = document.createElement('button');
      deleteButton.className =
        'bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600';
      deleteButton.innerText = 'Delete';

      deleteButton.addEventListener('click', async () => {
        const confirmed = confirm(
          `Are you sure you want to delete the listing "${auction.title}"?`
        );
        if (confirmed) {
          const success = await deleteListing(auction.id);
          if (success) {
            auctionCard.remove();
            alert(`Listing "${auction.title}" deleted successfully.`);
          } else {
            alert('Failed to delete the listing. Please try again.');
          }
        }
      });

      auctionDetails.appendChild(deleteButton);
      auctionCard.append(auctionImage, auctionDetails);
      auctionsGrid.appendChild(auctionCard);
    });

    auctionsSection.appendChild(auctionsGrid);
  }

  outerContainer.appendChild(auctionsSection);
};

renderProfilePage();

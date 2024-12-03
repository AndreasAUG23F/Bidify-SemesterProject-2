// import { authGuard } from '../../utilities/authGuard';
// import { readUserProfile } from '../../api/user/readProfile';
// import { readUserBids } from '../../api/auction/readUserBids';
// import { setLogoutListener } from '../../ui/global/logout';

// setLogoutListener();
// authGuard();

// const userData = JSON.parse(localStorage.getItem('userData'));
// const username = userData.name;

// export const renderProfilePage = async () => {
//   const outerContainer = document.getElementById('outerContainer');
//   outerContainer.innerHTML = '';

//   const userProfile = await readUserProfile(username);
//   const userAuctions = await readUserAuctions(username);
//   const userBids = await readUserBids(username);

//   const profileContainer = document.createElement('div');
//   profileContainer.className = 'flex flex-col items-center py-12';

//   const avatar = document.createElement('img');
//   avatar.src = userProfile.avatar;
//   avatar.alt = 'User Avatar';
//   avatar.className = 'w-40 h-40 rounded-full shadow-lg object-cover';

//   const nameElement = document.createElement('h2');
//   nameElement.innerText = username;
//   nameElement.className = 'text-xl font-semibold mt-4';

//   const coinsElement = document.createElement('div');
//   coinsElement.className = 'flex items-center space-x-2 text-gray-600 mt-2';
//   coinsElement.innerHTML = `<span class="text-lg font-medium">${userProfile.coins || 0}</span>
//                             <i class="fa-solid fa-coins text-yellow-500"></i>`;

//   const updateProfileButton = document.createElement('button');
//   updateProfileButton.innerText = 'Update Profile';
//   updateProfileButton.className =
//     'mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition';

//   profileContainer.append(avatar, nameElement, coinsElement, updateProfileButton);
//   outerContainer.appendChild(profileContainer);

//   const auctionsSection = document.createElement('div');
//   auctionsSection.className = 'px-6 md:px-16 lg:px-32 mt-12';
//   auctionsSection.innerHTML = '<h2 class="text-2xl font-bold mb-6">My auctions</h2>';

//   if (userAuctions.length === 0) {
//     auctionsSection.innerHTML += '<p class="text-gray-500">No active auctions.</p>';
//   } else {
//     const auctionsGrid = document.createElement('div');
//     auctionsGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';
//     userAuctions.forEach((auction) => {
//       const auctionCard = document.createElement('div');
//       auctionCard.className =
//         'flex items-center space-x-4 bg-white shadow-md p-4 rounded-lg';

//       const auctionImage = document.createElement('img');
//       auctionImage.src = auction.image || '/images/default-product.png';
//       auctionImage.alt = auction.title;
//       auctionImage.className = 'w-24 h-24 rounded-lg object-cover';

//       const auctionDetails = document.createElement('div');
//       auctionDetails.innerHTML = `
//         <h3 class="text-lg font-medium">${auction.title}</h3>
//         <p class="text-gray-500 text-sm">Current bid: $${auction.currentBid || 0}</p>
//       `;

//       auctionCard.append(auctionImage, auctionDetails);
//       auctionsGrid.appendChild(auctionCard);
//     });
//     auctionsSection.appendChild(auctionsGrid);
//   }

//   outerContainer.appendChild(auctionsSection);

//   const bidsSection = document.createElement('div');
//   bidsSection.className = 'px-6 md:px-16 lg:px-32 mt-12';
//   bidsSection.innerHTML = '<h2 class="text-2xl font-bold

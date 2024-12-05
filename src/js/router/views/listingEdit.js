import { authGuard } from '../../utilities/authGuard';

authGuard();
// import { AUCTION_LISTINGS } from '../../api/constants';
// import { headers } from '../../api/header';

// const loadListingForEdit = async () => {
//   const params = new URLSearchParams(window.location.search);
//   const listingId = params.get('id');

//   if (!listingId) {
//     alert('No listing ID provided.');
//     return;
//   }

//   try {
//     const response = await fetch(`${AUCTION_LISTINGS}/${listingId}`, {
//       method: 'GET',
//       headers: headers(),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch listing for edit');
//     }

//     const listing = await response.json();

//     document.getElementById('title').value = listing.title || '';
//     document.getElementById('description').value = listing.description || '';
//     // Populate other fields as needed
//   } catch (error) {
//     console.error('Error loading listing for edit:', error);
//   }
// };

// const saveEditedListing = async () => {
//   const params = new URLSearchParams(window.location.search);
//   const listingId = params.get('id');

//   const updatedListing = {
//     title: document.getElementById('title').value,
//     description: document.getElementById('description').value,
//     // Include other fields as necessary
//   };

//   try {
//     const response = await fetch(`${AUCTION_LISTINGS}/${listingId}`, {
//       method: 'PUT',
//       headers: headers(),
//       body: JSON.stringify(updatedListing),
//     });

//     if (response.ok) {
//       alert('Listing updated successfully!');
//       window.location.href = `/listing.html?id=${listingId}`;
//     } else {
//       throw new Error('Failed to update listing');
//     }
//   } catch (error) {
//     console.error('Error updating listing:', error);
//   }
// };

// document.addEventListener('DOMContentLoaded', loadListingForEdit);
// document
//   .getElementById('saveButton')
//   .addEventListener('click', saveEditedListing);

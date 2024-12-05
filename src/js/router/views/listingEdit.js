import { authGuard } from '../../utilities/authGuard';
import { readListing } from '../../api/listing/read';
import { onUpdateListing } from '../../ui/listing/update';

authGuard();

async function loadListing() {
  const listingId = new URLSearchParams(window.location.search).get('id');
  const editForm = document.forms['editListing'];

  if (!listingId) {
    console.error('No listing ID provided.');
    document.body.innerHTML = '<p>The listing could not be found.</p>';
    return;
  }

  try {
    const listing = await readListing();
    if (listing && listing.data) {
      editForm.title.value = listing.data.title || '';
      editForm.description.value = listing.data.description || '';
      editForm.expiryDate.value = listing.data.expiryDate || '';

      const mediaContainer = document.getElementById('mediaUrlContainer');
      listing.data.media?.forEach((url) => {
        const mediaField = document.createElement('div');
        mediaField.className = 'media-url-item flex items-center space-x-2';
        mediaField.innerHTML = `
          <input
            type="text"
            name="mediaUrl[]"
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100"
            value="${url}"
          />
          <button
            type="button"
            class="remove-url bg-red-500 text-white rounded-full px-3"
          >
            -
          </button>`;
        mediaContainer.appendChild(mediaField);
      });

      document.getElementById('addMediaUrl').addEventListener('click', () => {
        const mediaField = document.createElement('div');
        mediaField.className = 'media-url-item flex items-center space-x-2';
        mediaField.innerHTML = `
          <input
            type="text"
            name="mediaUrl[]"
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100"
          />
          <button
            type="button"
            class="remove-url bg-red-500 text-white rounded-full px-3"
          >
            -
          </button>`;
        mediaContainer.appendChild(mediaField);
      });

      mediaContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-url')) {
          event.target.parentElement.remove();
        }
      });

      editForm.addEventListener('submit', (event) =>
        onUpdateListing(event, listingId)
      );
    } else {
      console.error('Listing not found.');
      document.body.innerHTML = '<p>The listing could not be found.</p>';
    }
  } catch (error) {
    console.error('Error loading listing:', error);
    document.body.innerHTML = '<p>Failed to load the listing.</p>';
  }
}

loadListing();

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

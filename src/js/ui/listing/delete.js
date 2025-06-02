/**
 * Handles the deletion of a listing.
 * @module DeleteListing
 * @async
 * @function onDeleteListing
 * @param {Event} event - The click event triggered by the delete button.
 */

import { deleteListing } from '../../api/listing/delete';

export async function onDeleteListing(event) {
  const listingId = event.target.dataset.listingId;
  const listingElement = event.target.closest('.listing');

  if (!listingId) {
    console.error('Listing ID not found.');
    return;
  }

  const confirmed = confirm('Are you sure you want to delete this listing?');
  if (!confirmed) return;

  try {
    const success = await deleteListing(listingId);

    if (success) {
      alert('Listing deleted successfully.');
      localStorage.removeItem('listingId');

      const isOnListingPage = window.location.pathname.includes('listing');
      if (isOnListingPage) {
        window.location.href = '/';
      } else if (listingElement) {
        listingElement.remove();
      }
    } else {
      alert('Failed to delete the listing.');
    }
  } catch (error) {
    console.error('Error deleting listing:', error);
    alert('An error occurred while deleting the listing.');
  }
}

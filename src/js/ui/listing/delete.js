/**
 * Handles the deletion of a listing.
 * Prompts the user for confirmation, calls the API to delete the listing,
 * and updates the UI by either redirecting or removing the deleted listing element.
 * @module DeleteListing
 * @async
 * @function onDeleteListing
 * @param {Event} event - The click event triggered by the delete button.
 * @throws {Error} - Logs errors if the listing ID is not found or the deletion fails.
 */

import { deleteListing } from '../../api/listing/delete';

export async function onDeleteListing(event) {
  const listingId = event.target.dataset.listingId;
  const listingElement = event.target.closest('.listing');

  if (!listingId) {
    console.error('listing ID not found.');
    return;
  }

  const confirmed = confirm(
    'Are you sure you want to delete this awesome listing?'
  );
  if (confirmed) {
    const success = await deleteListing(listingId);
    if (success) {
      alert('listing is deleted.');
      localStorage.removeItem('listingId');
      const currentPath = window.location.pathname;

      if (currentPath.includes('listing')) {
        window.location.href = '/';
      } else {
        listingElement.remove();
      }
    } else {
      alert('Failed to delete the listing.');
    }
  }
}

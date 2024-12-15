import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';
import { showLoader, hideLoader } from '../../ui/global/loader';

/**
 * Deletes an auction listing by sending a DELETE request to the API.
 * @module DeleteListing
 * @async
 * @function deleteListing
 * @param {string} id - The ID of the listing to be deleted.
 * @returns {Promise<boolean>} - Returns `true` if the listing was successfully deleted, otherwise `false`.
 * @throws {Error} - Logs errors if the API call fails.
 */
export async function deleteListing(id) {
  showLoader();
  try {
    const response = await fetch(`${AUCTION_LISTINGS}/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });

    if (response.ok) {
      alert('Listing successfully deleted.');
      return true;
    } else {
      console.error(`Failed to delete listing: ${response.status}`);
      alert(
        `Failed to delete listing: ${response.statusText || 'Unknown error'}`
      );
      return false;
    }
  } catch (error) {
    console.error(`Error deleting listing:`, error);
    alert('An error occurred while deleting the listing. Please try again.');
    return false;
  } finally {
    hideLoader();
  }
}

/**
 * Deletes an auction listing by sending a DELETE request to the API.
 * @module DeleteListing
 * @async
 * @function deleteListing
 * @param {string} id - The ID of the listing to be deleted.
 * @returns {Promise<boolean>} - Returns `true` if the listing was successfully deleted, otherwise `false`.
 * @throws {Error} - Logs errors if the API call fails.
 */

import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export async function deleteListing(id) {
  try {
    const response = await fetch(`${AUCTION_LISTINGS}/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });

    if (response.ok) {
      return true;
    } else {
      console.error(`Failed to delete listing: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting listing:`, error);
    return false;
  }
}

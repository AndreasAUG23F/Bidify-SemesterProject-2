import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';
import { showLoader, hideLoader } from '../../ui/global/loader';

/**
 * Updates an existing auction listing with new details.
 * Sends a PUT request to the API to update the listing.
 * @module UpdateListing
 * @async
 * @function updateListing
 * @param {string} listingId - The ID of the listing to be updated.
 * @param {Object} updatedData - The updated data for the listing.
 * @param {string} updatedData.title - The new title for the listing.
 * @param {string} updatedData.description - The new description for the listing.
 * @param {Array<string>} updatedData.tags - An array of new tags for the listing.
 * @param {Array<string>} updatedData.media - An array of new media URLs for the listing.
 * @returns {Promise<Object|null>} - Returns the updated listing data if successful, or null if the update fails.
 * @throws {Error} - Logs errors if the API call fails.
 */
export async function updateListing(
  listingId,
  { title, description, tags, media }
) {
  const body = {
    title,
    description,
    tags,
    media,
  };

  showLoader();
  try {
    const response = await fetch(`${AUCTION_LISTINGS}/${listingId}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(
        'Update failed. Server responded with:',
        response.statusText
      );
      alert(
        `Failed to update listing: ${response.statusText || 'Unknown error'}`
      );
      return null;
    }

    const data = await response.json();
    alert('Listing successfully updated');
    return data;
  } catch (error) {
    console.error('Failed to update the listing', error);
    alert('An error occurred while updating the listing. Please try again.');
    return null;
  } finally {
    hideLoader();
  }
}

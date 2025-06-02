import { showLoader, hideLoader } from '../../../ui/global/loader';
import { AUCTION_LISTINGS } from '../../constants';
import { headers } from '../../header';

/**
 * Fetches a single auction listing by its ID, including seller and bids information.
 * The ID is retrieved from the current URL's query parameters.
 * @module ReadListing
 * @async
 * @function readListing
 * @returns {Promise<Object|undefined>} - Returns the listing data if successful, or undefined if the request fails.
 * @throws {Error} - Logs errors if the API call fails.
 */
export default async function readListing() {
  const id = new URLSearchParams(window.location.search).get('id');
  showLoader();
  try {
    const response = await fetch(
      `${AUCTION_LISTINGS}/${id}?_seller=true&_bids=true`,
      {
        method: 'GET',
        headers: headers(),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch post:', response.status);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  } finally {
    hideLoader();
  }
}

import { showLoader, hideLoader } from '../../ui/global/loader';
import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

/**
 * Fetches a single auction listing by its ID, including seller and bids information.
 * The ID is retrieved from the current URL's query parameters.
 * @module ReadListing
 * @async
 * @function readListing
 * @returns {Promise<Object|undefined>} - Returns the listing data if successful, or undefined if the request fails.
 * @throws {Error} - Logs errors if the API call fails.
 */
export async function readListing() {
  const id = new URLSearchParams(window.location.search).get('id');
  showLoader(); // Show loader before starting the fetch
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
      console.log(data);
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

/**
 * Fetches multiple auction listings with optional pagination and filtering by tag.
 * @module ReadListings
 * @async
 * @function readListings
 * @param {number} [limit=12] - The maximum number of listings to fetch.
 * @param {number} [page=1] - The page number to fetch.
 * @param {string} [tag] - An optional tag to filter listings by.
 * @returns {Promise<Array>} - Returns an array of listing objects.
 * @throws {Error} - Logs and throws errors if the API call fails.
 */
export async function readListings(limit = 12, page = 1, tag) {
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    _seller: true,
    _bids: true,
    sort: 'created',
    sortOrder: 'desc',
  });

  if (tag) {
    params.append('tag', tag);
  }

  const url = `${AUCTION_LISTINGS}?${params.toString()}`;

  showLoader();
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(
        `Error! Did not manage to fetch listings: ${response.status}`
      );
    }

    const data = await response.json();
    const listings = data.data;
    return listings;
  } catch (error) {
    console.error('Error fetching Listings:', error);
    throw error;
  } finally {
    hideLoader();
  }
}

/**
 * Creates a new auction listing by sending data to the API.
 * @module CreateListing
 * @async
 * @function createListing
 * @param {string} title - The title of the listing.
 * @param {string} description - A detailed description of the listing.
 * @param {string} endsAt - The end date and time for the auction in ISO format.
 * @param {Array<string>} tags - An array of tags associated with the listing.
 * @param {Array<string>} media - An array of media URLs for the listing.
 * @returns {Promise<Object|undefined>} - The result of the API call if successful, or undefined if it fails.
 * @throws {Error} - Logs errors if the API call fails.
 */

import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export async function createListing(title, description, endsAt, tags, media) {
  const body = {
    title,
    description,
    endsAt,
    tags,
    media,
  };

  try {
    const response = await fetch(AUCTION_LISTINGS, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Failed to create listing. Status:', response.status);
      console.error('API response body:', result);

      alert(`Failed to create listing: ${result.message || 'Unknown error'}`);
      return null;
    }

    alert('Listing created successfully!');
    return result;
  } catch (error) {
    console.error('Something went wrong while creating the listing:', error);

    alert('An error occurred while creating the listing. Please try again.');
    return null;
  }
}

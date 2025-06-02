import { AUCTION_PROFILES } from '../constants';
import { headers } from '../header';
import { showLoader, hideLoader } from '../../ui/global/loader';

/**
 * Fetches profile information for a specific user, including their listings and wins.
 * @module ReadProfile
 * @async
 * @function readProfile
 * @param {string} userName - The username of the profile to fetch.
 * @returns {Promise<Object|undefined>} - Returns the user's profile data if successful, or undefined if an error occurs.
 * @throws {Error} - Logs errors if the API call fails.
 */
export default async function readProfile(userName) {
  const queryParameter = '?_listings=true&_wins=true';
  showLoader();
  try {
    const response = await fetch(
      `${AUCTION_PROFILES}/${userName}${queryParameter}`,
      {
        method: 'GET',
        headers: headers(),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.error('Error reading profile:', error);
  } finally {
    hideLoader();
  }
}

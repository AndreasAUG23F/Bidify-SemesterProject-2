import { AUCTION_PROFILES } from '../constants';
import { headers } from '../header';
import { showLoader, hideLoader } from '../../ui/global/loader';

/**
 * Fetches all auction listings for the currently logged-in user.
 * The user's name is retrieved from localStorage.
 * @module ReadUserListings
 * @async
 * @function readUserListings
 * @returns {Promise<Array|undefined>} - Returns an array of the user's listings if successful, or undefined if the user is not logged in or an error occurs.
 * @throws {Error} - Logs errors if the API call fails.
 */
export default async function readUserListings() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData || !userData.name) {
    console.error('User not logged in or name is missing in localStorage');
    return;
  }

  const { name } = userData;

  showLoader();
  try {
    const response = await fetch(`${AUCTION_PROFILES}/${name}/listings`, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.error('Failed to fetch listings:', response.status);
    }
  } catch (error) {
    console.error('Error reading profile:', error);
  } finally {
    hideLoader();
  }
}

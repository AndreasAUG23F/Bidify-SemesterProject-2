/**
 * Fetches profile information for a specific user, including their listings and wins.
 * @module ReadProfile
 * @async
 * @function readProfile
 * @param {string} userName - The username of the profile to fetch.
 * @returns {Promise<Object|undefined>} - Returns the user's profile data if successful, or undefined if an error occurs.
 * @throws {Error} - Logs errors if the API call fails.
 */

/**
 * Fetches all auction listings for the currently logged-in user.
 * The user's name is retrieved from localStorage.
 * @module ReadUserListings
 * @async
 * @function readUserListings
 * @returns {Promise<Array|undefined>} - Returns an array of the user's listings if successful, or undefined if the user is not logged in or an error occurs.
 * @throws {Error} - Logs errors if the API call fails.
 */

import { AUCTION_PROFILES } from '../constants';
import { headers } from '../header';

export async function readProfile(userName) {
  const queryParameter = '?_listings=true&_wins=true';
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
  }
}

export async function readUserListings() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData || !userData.name) {
    console.error('User not logged in or name is missing in localStorage');
    return;
  }

  const { name } = userData;

  try {
    const response = await fetch(`${AUCTION_PROFILES}/${name}/listings`, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.data;
    } else {
      console.error('Failed to fetch listings:', response.status);
    }
  } catch (error) {
    console.error('Error reading profile:', error);
  }
}

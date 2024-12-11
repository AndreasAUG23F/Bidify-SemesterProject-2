/**
 * Fetches the user's credits from their profile.
 * Requires the user to be logged in with a valid token in localStorage.
 * @module FetchUserCredits
 * @async
 * @function fetchUserCredits
 * @returns {Promise<number|null>} - Returns the user's credits if successful, or null if an error occurs or the user is not logged in.
 * @throws {Error} - Logs errors if the API call fails.
 */

import { AUCTION_PROFILES } from '../../api/constants';

export const fetchUserCredits = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('User is not logged in');
      return null;
    }

    const userData = localStorage.getItem('userData');
    if (!userData) {
      console.error('Username is missing in localStorage');
      return null;
    }

    const response = await fetch(`${AUCTION_PROFILES}/${userData.name}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data.credits; // Returner kun credits
  } catch (error) {
    console.error('Error fetching user credits:', error);
    return null;
  }
};

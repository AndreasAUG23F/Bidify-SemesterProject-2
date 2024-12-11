/**
 * Updates a user's profile information, including avatar, banner, and bio.
 * Sends a PUT request to the API to update the profile data.
 * @module UpdateProfile
 * @async
 * @function updateProfile
 * @param {string} username - The username of the profile to be updated.
 * @param {string} avatar - The URL of the new avatar image.
 * @param {string} banner - The URL of the new banner image.
 * @param {string} bio - The new bio text for the profile.
 * @returns {Promise<Object|undefined>} - Returns the updated profile data if successful, or undefined if an error occurs.
 * @throws {Error} - Logs errors if the API call fails.
 */

import { AUCTION_PROFILES } from '../constants';
import { headers } from '../header';

export const updateProfile = async (username, avatar, banner, bio) => {
  const body = {
    avatar: avatar,
    banner: banner,
    bio: bio,
  };

  console.log('body', body);

  try {
    const response = await fetch(`${AUCTION_PROFILES}/${username}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      window.location.href = '/profile/';
      return data.data;
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

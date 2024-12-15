/**
 * Handles the process of updating a user's profile.
 *
 * @module UpdateProfile
 * @function onUpdateProfile
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Sends the updated profile data to the API.
 *
 * @description
 * Extracts form data to update the user's profile, including avatar, banner, and bio. Uses the API to save the changes.
 *
 * @example
 * <form onsubmit="onUpdateProfile(event)">
 *   <input type="text" name="avatar" placeholder="Avatar URL" />
 *   <input type="text" name="banner" placeholder="Banner URL" />
 *   <textarea name="bio" placeholder="Your bio"></textarea>
 *   <button type="submit">Update Profile</button>
 * </form>
 */

import { updateProfile } from '../../api/profile/update';

export const onUpdateProfile = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const username = userData.name;
  const avatar = {
    url: formData.get('avatar'),
    alt: 'User Avatar',
  };

  const banner = {
    url: formData.get('banner'),
    alt: 'User Banner',
  };

  const bio = formData.get('bio');

  updateProfile(username, avatar, banner, bio);
};

/**
 * Handles updating the user's profile (avatar, banner, bio).
 * @module UpdateProfile
 * @function onUpdateProfile
 * @async
 * @param {Event} event - Form submission event.
 * @returns {Promise<void>}
 */

import updateProfile from '../../api/profile/updateProfile';

export const onUpdateProfile = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const userData = JSON.parse(localStorage.getItem('userData'));

  if (!userData || !userData.name) {
    console.error('User not logged in or missing username.');
    alert('You must be logged in to update your profile.');
    return;
  }

  const username = userData.name;

  const avatar = {
    url: formData.get('avatar')?.trim(),
    alt: 'User Avatar',
  };

  const banner = {
    url: formData.get('banner')?.trim(),
    alt: 'User Banner',
  };

  const bio = formData.get('bio')?.trim();

  try {
    await updateProfile(username, avatar, banner, bio);
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Failed to update profile:', error);
    alert('An error occurred while updating your profile.');
  }
};

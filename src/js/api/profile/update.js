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

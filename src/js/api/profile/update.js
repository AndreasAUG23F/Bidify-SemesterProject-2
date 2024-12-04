import { headers } from '../header';

export const updateProfile = async (username, avatar, banner, bio) => {
  const body = {
    avatar: avatar,
    banner: banner,
    bio: bio,
  };

  console.log('body', body);

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/profiles/Andypandy321`,
      {
        method: 'PUT',
        header: headers(),
        body: JSON.stringify(body),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

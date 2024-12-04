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

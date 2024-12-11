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

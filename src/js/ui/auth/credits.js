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

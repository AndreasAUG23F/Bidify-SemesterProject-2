// // export async function readProfile(username) {}

// // export async function readProfiles(limit, page) {}

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

export const readUserBids = async (userName) => {
  try {
    const response = await fetch(`${AUCTION_PROFILES}/${userName}/bids`, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.error('Error reading profile:', error);
  }
};

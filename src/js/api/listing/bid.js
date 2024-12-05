import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export const fetchBid = async (bidAmount, id) => {
  const body = {
    amount: bidAmount,
  };

  try {
    console.log('trying to fetch', body);
    const response = await fetch(`${AUCTION_LISTINGS}/${id}/bids`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      window.location.reload();
      return data.data;
    } else {
      console.log('Error fetching', response);
    }
  } catch (error) {
    console.error('Error fetching bid:', error);
  }
};

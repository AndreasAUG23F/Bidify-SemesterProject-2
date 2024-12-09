import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export const fetchBid = async (bidAmount, id) => {
  const parsedAmount = parseInt(bidAmount);
  const body = {
    amount: parsedAmount,
  };

  console.log('body', body);

  try {
    console.log('trying to fetch', body);
    const response = await fetch(`${AUCTION_LISTINGS}/${id}/bids`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });
    console.log('response', response);
    if (response.ok) {
      const data = await response.json();
      console.log('data', data);
      window.location.reload();
      return data.data;
    } else {
      console.log('Error fetching', response);
    }
  } catch (error) {
    console.error('Error fetching bid:', error);
  }
};

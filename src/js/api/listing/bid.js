import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export const placeBid = async (bidAmount, id) => {
  const parsedAmount = parseInt(bidAmount);
  const body = {
    amount: parsedAmount,
  };

  console.log('body', body);

  try {
    console.log('trying to post', body);
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
      console.log('Error posting', response);
    }
  } catch (error) {
    console.error('Error posting bid:', error);
  }
};

export const getBids = async (id) => {
  try {
    const response = await fetch(`${AUCTION_LISTINGS}/${id}/bids`, {
      method: 'GET',
      headers: headers(),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(
        `Failed to fetch bids for listing ID ${id}: ${response.status}`
      );
      return [];
    }
  } catch (error) {
    console.error('Error fetching bids:', error);
    return [];
  }
};

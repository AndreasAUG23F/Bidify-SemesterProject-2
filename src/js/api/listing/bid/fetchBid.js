import { AUCTION_LISTINGS } from '../../constants';
import { headers } from '../../header';

/**
 * Sends a bid to the auction API for a specific listing.
 * Reloads the page upon successful bid placement.
 * @module AuctionBids
 * @async
 * @function fetchBid
 * @param {number} bidAmount - The amount of the bid.
 * @param {string} id - The ID of the auction listing.
 * @returns {Promise<Object|undefined>} - The bid data if successful, or undefined if the request fails.
 * @throws {Error} - Logs errors if the API call fails.
 */
export default async function fetchBid(bidAmount, id) {
  const parsedAmount = parseInt(bidAmount);
  const body = { amount: parsedAmount };

  try {
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
      console.log('Error posting bid:', response);
    }
  } catch (error) {
    console.error('Error fetching bid:', error);
  }
}

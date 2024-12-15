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

/**
 * Fetches all bids for a specific auction listing.
 * @async
 * @function getBids
 * @param {string} id - The ID of the auction listing.
 * @returns {Promise<Array>} - An array of bids for the listing.
 * @throws {Error} - Logs errors if the API call fails.
 */

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

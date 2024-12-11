/**
 * Handles the bidding process for a listing.
 * Prevents default form submission, extracts bid amount and listing ID,
 * and calls the API to place a bid.
 * @module BidHandler
 * @async
 * @function onBid
 * @param {Event} event - The form submission event.
 * @throws {Error} - Logs errors if the bid submission API call fails.
 */

import { fetchBid } from '../../api/listing/bid';

export const onBid = async (event) => {
  event.preventDefault();

  console.log('click');

  const formData = new FormData(event.target);

  const bidAmount = formData.get('bidAmount');

  const listingId = JSON.parse(localStorage.getItem('listingId'));

  const id = listingId.id;

  const amount = Number(bidAmount);

  fetchBid(amount, id);
};

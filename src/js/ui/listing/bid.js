/**
 * Submits a bid for the current listing.
 * @module BidHandler
 * @async
 * @function onBid
 * @param {Event} event - The bid form submission event.
 */

import { fetchBid } from '../../api/listing/bid';

export const onBid = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const amount = Number(formData.get('bidAmount'));

  const listingId = JSON.parse(localStorage.getItem('listingId'));
  const id = listingId?.id || listingId; // fallback if it's not wrapped in an object

  if (!id || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid bid amount.');
    return;
  }

  try {
    await fetchBid(amount, id);
  } catch (error) {
    console.error('Failed to place bid:', error);
  }
};

import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

/**
 * Creates a new listing by sending data to the API.
 *
 * @param {Object} listingData - The data of the listing to be created.
 * Includes title, description, expiryDate, and image URLs.
 */
export async function createListing({
  title,
  description,
  expiryDate,
  images,
}) {
  const listingPayload = {
    title,
    description,
    expiryDate,
    images, // Send URLs directly as JSON array
  };

  try {
    const response = await fetch(AUCTION_LISTINGS, {
      method: 'POST',
      headers: headers(true), // Ensure JSON headers
      body: JSON.stringify(listingPayload), // Send JSON payload
    });

    if (response.ok) {
      const data = await response.json();
      alert('Listing created successfully!');
      console.log(data);
      window.location.href = '/';
    } else {
      const error = await response.json();
      alert(`Failed to create listing: ${error.message}`);
      console.error(error);
    }
  } catch (error) {
    alert('An error occurred while creating the listing.');
    console.error(error);
  }
}

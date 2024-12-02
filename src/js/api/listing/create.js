import { API_LISTING_CREATE } from '../constants';
import { headers } from '../header';

/**
 * Creates a new listing by sending data to the API.
 *
 * @param {Object} listingData - The data of the listing to be created.
 * Includes title, description, expiryDate, and images.
 */
export async function createListing({
  title,
  description,
  expiryDate,
  images,
}) {
  const formData = new FormData();

  formData.append('title', title);
  formData.append('description', description);
  formData.append('expiryDate', expiryDate);

  // Append each image
  images.forEach((image, index) => {
    formData.append(`images[${index}]`, image);
  });

  try {
    const response = await fetch(API_LISTING_CREATE, {
      method: 'POST',
      headers: headers(false), // If you are using FormData, disable JSON headers
      body: formData,
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

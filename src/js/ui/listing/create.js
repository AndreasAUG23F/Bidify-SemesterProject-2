import { createListing } from '../../api/listing/create';

/**
 * Handles the create listing form submission.
 *
 * @param {Event} event - The event object representing the form submission.
 */
export async function onCreateListing(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  // Collect image URLs as an array of strings
  const imageUrls = formData.get('mediaUrl')
    ? formData
        .get('mediaUrl')
        .split(',')
        .map((url) => url.trim())
    : [];

  const listingData = {
    title: formData.get('title'),
    description: formData.get('description'),
    expiryDate: formData.get('expiryDate'),
    images: imageUrls, // Pass image URLs as an array
  };

  await createListing(listingData);
}

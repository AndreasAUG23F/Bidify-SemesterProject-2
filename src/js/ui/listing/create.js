import { createListing } from '../../api/listing/create';
/**
 * Handles the create listing form submission.
 *
 * @param {Event} event - The event object representing the form submission.
 */
export async function onCreateListing(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const listingData = {
    title: formData.get('title'),
    description: formData.get('description'),
    expiryDate: formData.get('expiryDate'),
    images: Array.from(formData.getAll('images')), // Collect multiple images
  };

  createListing(listingData);
}

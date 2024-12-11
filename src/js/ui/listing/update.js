/**
 * Handles the update process for an existing listing.
 *
 * @module UpdateListing
 * @function onUpdateListing
 * @async
 * @param {Event} event - The form submission event.
 * @param {string} listingId - The unique identifier of the listing to be updated.
 * @returns {Promise<void>} Redirects the user to the updated listing page if successful, or shows an alert on failure.
 *
 * @description
 * Extracts form data, processes media and tags, and sends an update request to the API. If the update is successful, the user is redirected to the updated listing's page.
 *
 * @example
 * <form onsubmit="onUpdateListing(event, '12345')">
 *   <input type="text" name="title" placeholder="Title" />
 *   <textarea name="description" placeholder="Description"></textarea>
 *   <button type="submit">Update Listing</button>
 * </form>
 */

import { updateListing } from '../../api/listing/update';

export async function onUpdateListing(event, listingId) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const media = [];
  const existingMediaInputs = formData.getAll('mediaUrl[]');
  existingMediaInputs.forEach((url, index) => {
    if (url) {
      media.push({
        url,
        alt: formData.get(`alt${index + 1}`) || '',
      });
    }
  });

  const editInfo = {
    title: formData.get('title') || undefined,
    description: formData.get('description') || undefined,
    endsAt: formData.get('expiryDate')
      ? new Date(formData.get('expiryDate')).toISOString()
      : undefined,
    tags: formData.get('tags')
      ? formData
          .get('tags')
          .split(',')
          .map((tag) => tag.trim())
      : undefined,
    media: media.length > 0 ? media : undefined,
  };

  const updatedListing = await updateListing(listingId, editInfo);

  if (updatedListing) {
    window.location.href = `/listing/?id=${listingId}`;
  } else {
    alert('Update failed. Your listing remains unchanged.');
  }
}

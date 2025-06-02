/**
 * Handles updating a listing.
 * @module UpdateListing
 * @function onUpdateListing
 * @param {Event} event - Form submission event.
 * @param {string} listingId - ID of the listing to update.
 */

import updateListing from '../../api/listing/updateListings';

export async function onUpdateListing(event, listingId) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const media = formData
    .getAll('mediaUrl[]')
    .map((url, i) => {
      return url
        ? {
            url,
            alt: formData.get(`alt${i + 1}`) || '',
          }
        : null;
    })
    .filter(Boolean);

  const updatedData = {
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

  const result = await updateListing(listingId, updatedData);

  if (result) {
    window.location.href = `/listing/?id=${listingId}`;
  } else {
    alert('Update failed. Your listing remains unchanged.');
  }
}

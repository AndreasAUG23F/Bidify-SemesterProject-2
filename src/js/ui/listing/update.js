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
    window.location.href = `/post/?id=${listingId}`;
  } else {
    alert('Update failed. Your listing remains unchanged.');
  }
}

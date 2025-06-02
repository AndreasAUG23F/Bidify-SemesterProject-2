import { createListing } from './create.js';

export async function onCreateListing(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const mediaItems = document.querySelectorAll('.media-url-item');
  const media = Array.from(mediaItems)
    .map((item) => {
      const urlInput = item.querySelector('input[name="mediaUrl[]"]');
      const altInput = item.querySelector('input[name="altText[]"]');
      const url = urlInput?.value.trim() || '';
      const alt = altInput?.value.trim() || '';
      return url ? { url, alt } : null;
    })
    .filter(Boolean);

  const expiryDate = formData.get('expiryDate');
  const expiryTime = formData.get('expiryTime');
  const endsAt =
    expiryDate && expiryTime
      ? new Date(`${expiryDate}T${expiryTime}`).toISOString()
      : null;

  const createData = {
    title: formData.get('title'),
    description: formData.get('description'),
    endsAt,
    tags: formData.get('tags')
      ? formData
          .get('tags')
          .split(',')
          .map((t) => t.trim())
      : [],
    media,
  };

  try {
    const result = await createListing(
      createData.title,
      createData.description,
      createData.endsAt,
      createData.tags,
      createData.media
    );
    if (result) {
      console.log('Listing opprettet:', result);
      window.location.href = '/';
    } else {
      console.error('Kunne ikke opprette listing. Sjekk input‐feltene.');
    }
  } catch (error) {
    console.error('Feil ved oppretting:', error);
  }
}

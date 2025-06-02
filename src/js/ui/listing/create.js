import { AUCTION_LISTINGS } from '../../api/constants.js';
import { headers } from '../../api/header.js';
import { showLoader, hideLoader } from '../global/loader.js';

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

  showLoader();
  try {
    const response = await fetch(AUCTION_LISTINGS, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(createData),
    });
    const result = await response.json();

    if (!response.ok) {
      console.error('Kunne ikke opprette listing. Status:', response.status);
      console.error('API svar:', result);
      alert(`Feil ved oppretting: ${result.message || 'Ukjent feilmelding'}`);
      return null;
    }

    alert('Listing opprettet!');
    return result;
  } catch (err) {
    console.error('Feil under oppretting:', err);
    alert('En feil oppstod—vennligst prøv igjen senere.');
    return null;
  } finally {
    hideLoader();
  }
}

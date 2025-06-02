/**
 * Handles the creation of a new auction listing.
 * Updates a live preview, validates input, and sends the listing to the API.
 * @module CreateListing
 */

import createListing from '../../api/listing/createListing';

const previewTitle = document.getElementById('previewTitle');
const previewDescription = document.getElementById('previewDescription');
const previewExpiry = document.getElementById('previewExpiry');
const previewImages = document.getElementById('previewImages');
const previewTags = document.createElement('p');
previewTags.id = 'previewTags';
previewTags.className = 'text-sm text-gray-500';
document.getElementById('previewContent').appendChild(previewTags);

function updatePreview() {
  const formData = new FormData(document.forms.createListing);

  previewTitle.textContent = formData.get('title') || 'Listing Title';
  previewDescription.textContent =
    formData.get('description') || 'Listing Description';

  const date = formData.get('expiryDate');
  const time = formData.get('expiryTime');
  previewExpiry.textContent =
    date && time
      ? `Ends At: ${new Date(`${date}T${time}`).toLocaleString()}`
      : 'Expiry Date and Time not set';

  const mediaItems = document.querySelectorAll('.media-url-item');
  previewImages.innerHTML = '';
  mediaItems.forEach((item) => {
    const url = item.querySelector('input[name="mediaUrl[]"]').value.trim();
    const alt = item.querySelector('input[name="altText[]"]').value.trim();
    if (url) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = alt || 'Preview Image';
      img.className = 'w-24 h-24 object-cover rounded';
      previewImages.appendChild(img);
    }
  });

  const tags = formData.get('tags');
  previewTags.textContent = tags
    ? `Tags: ${tags
        .split(',')
        .map((tag) => tag.trim())
        .join(', ')}`
    : 'No tags set';
}

document.forms.createListing.addEventListener('input', updatePreview);

document
  .getElementById('mediaUrlContainer')
  .addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-url')) {
      event.target.closest('.media-url-item').remove();
      setTimeout(updatePreview, 0);
    }
  });

document.getElementById('addMediaUrl').addEventListener('click', () => {
  const container = document.getElementById('mediaUrlContainer');
  const mediaCount = container.querySelectorAll('.media-url-item').length;

  if (mediaCount >= 8) {
    alert('You can only add up to 8 images.');
    return;
  }

  const div = document.createElement('div');
  div.className = 'media-url-item flex items-center space-x-2';
  div.innerHTML = `
    <input type="text" name="mediaUrl[]" placeholder="https://example.com/image.jpg"
      class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required />
    <input type="text" name="altText[]" placeholder="Alt text for the image"
      class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <button type="button" class="remove-url bg-red-500 text-white rounded-full px-3">-</button>
  `;
  container.appendChild(div);
});

export async function onCreateListing(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const mediaItems = document.querySelectorAll('.media-url-item');
  const media = Array.from(mediaItems)
    .map((item) => {
      const url = item.querySelector('input[name="mediaUrl[]"]').value.trim();
      const alt = item.querySelector('input[name="altText[]"]').value.trim();
      return url ? { url, alt } : null;
    })
    .filter((item) => item !== null);

  const expiryDate = formData.get('expiryDate');
  const expiryTime = formData.get('expiryTime');
  const endsAt =
    expiryDate && expiryTime
      ? new Date(`${expiryDate}T${expiryTime}`).toISOString()
      : null;

  const listingData = {
    title: formData.get('title'),
    description: formData.get('description'),
    endsAt,
    tags: formData.get('tags')
      ? formData
          .get('tags')
          .split(',')
          .map((tag) => tag.trim())
      : [],
    media,
  };

  try {
    const result = await createListing(
      listingData.title,
      listingData.description,
      listingData.endsAt,
      listingData.tags,
      listingData.media
    );

    if (result) {
      console.log('Listing created:', result);
      window.location.href = '/';
    } else {
      console.error('Failed to create listing.');
    }
  } catch (error) {
    console.error('Error during creation:', error);
  }
}

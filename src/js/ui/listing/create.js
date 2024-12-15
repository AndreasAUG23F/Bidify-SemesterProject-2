/**
 * Handles the creation of a new auction listing.
 * Includes dynamic updating of a preview section, validation of input fields, and submission of listing data to the server.
 * @module CreateListing
 */

/**
 * Dynamically updates the preview section based on the form input.
 * Displays the title, description, expiry date, images, and tags in real-time.
 * @function updatePreview
 */

/**
 * Handles the addition of new media URL input fields.
 * Limits the total number of media fields to a maximum of 8.
 * @function addMediaUrl
 */

/**
 * Removes a media URL input field and updates the preview.
 * @function removeMediaUrl
 * @param {Event} event - The click event triggered by the remove button.
 */

/**
 * Submits the listing creation form.
 * Collects form data, validates inputs, and sends the data to the server.
 * Redirects the user to the home page upon successful creation.
 * @async
 * @function onCreateListing
 * @param {Event} event - The form submission event.
 * @throws {Error} - Logs errors if the API call or data submission fails.
 */

import { createListing } from '../../api/listing/create';

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

  previewExpiry.textContent =
    formData.get('expiryDate') && formData.get('expiryTime')
      ? `Ends At: ${new Date(
          `${formData.get('expiryDate')}T${formData.get('expiryTime')}`
        ).toLocaleString()}`
      : 'Expiry Date and Time not set';

  const mediaItems = document.querySelectorAll('.media-url-item');
  previewImages.innerHTML = '';
  Array.from(mediaItems).forEach((item) => {
    const urlInput = item.querySelector('input[name="mediaUrl[]"]');
    const altInput = item.querySelector('input[name="altText[]"]');
    const url = urlInput ? urlInput.value.trim() : '';
    const alt = altInput ? altInput.value.trim() : '';
    if (url) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = alt || 'Preview Image';
      img.classList.add('w-24', 'h-24', 'object-cover', 'rounded');
      previewImages.appendChild(img);
    }
  });

  const tags = formData.get('tags') || '';
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
      const inputWrapper = event.target.closest('.media-url-item');
      if (inputWrapper) {
        inputWrapper.remove();
      }
      setTimeout(updatePreview, 0);
    }
  });

document.getElementById('addMediaUrl').addEventListener('click', () => {
  const container = document.getElementById('mediaUrlContainer');
  const currentMediaInputs = container.querySelectorAll('.media-url-item');

  if (currentMediaInputs.length >= 8) {
    alert('You can only add up to 8 images.');
    return;
  }

  const newInput = document.createElement('div');
  newInput.classList.add('media-url-item', 'flex', 'items-center', 'space-x-2');

  newInput.innerHTML = `
    <input
      type="text"
      name="mediaUrl[]"
      placeholder="https://example.com/image.jpg"
      class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required
    />
    <input
      type="text"
      name="altText[]"
      placeholder="Alt text for the image"
      class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <button type="button" class="remove-url bg-red-500 text-white rounded-full px-3">-</button>
  `;

  container.appendChild(newInput);
});

export async function onCreateListing(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const mediaItems = document.querySelectorAll('.media-url-item');
  const media = Array.from(mediaItems)
    .map((item) => {
      const urlInput = item.querySelector('input[name="mediaUrl[]"]');
      const altInput = item.querySelector('input[name="altText[]"]');
      const url = urlInput ? urlInput.value.trim() : '';
      const alt = altInput ? altInput.value.trim() : '';
      if (url) {
        return { url, alt };
      }
      return null;
    })
    .filter((mediaItem) => mediaItem !== null);

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
          .map((tag) => tag.trim())
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
      console.log('Listing created:', result);
      window.location.href = '/';
    } else {
      console.error('Failed to create listing. Please check your input.');
    }
  } catch (error) {
    console.error('Error during creation:', error);
  }
}

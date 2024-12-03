import { createListing } from '../../api/listing/create';

const previewTitle = document.getElementById('previewTitle');
const previewDescription = document.getElementById('previewDescription');
const previewExpiry = document.getElementById('previewExpiry');
const previewImages = document.getElementById('previewImages');

function updatePreview() {
  const formData = new FormData(document.forms.createListing);

  previewTitle.textContent = formData.get('title') || 'Listing Title';
  previewDescription.textContent =
    formData.get('description') || 'Listing Description';
  previewExpiry.textContent = formData.get('expiryDate')
    ? `Ends At: ${new Date(formData.get('expiryDate')).toLocaleDateString()}`
    : 'Expiry Date not set';

  const mediaInputs = document.querySelectorAll('input[name="mediaUrl[]"]');
  previewImages.innerHTML = '';
  Array.from(mediaInputs).forEach((input) => {
    const url = input.value.trim();
    if (url) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Preview Image';
      img.classList.add('w-24', 'h-24', 'object-cover', 'rounded');
      previewImages.appendChild(img);
    }
  });
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
    <button type="button" class="remove-url bg-red-500 text-white rounded-full px-3">-</button>
  `;

  container.appendChild(newInput);
});

export async function onCreateListing(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const mediaInputs = document.querySelectorAll('input[name="mediaUrl[]"]');
  const media = Array.from(mediaInputs)
    .map((input) => input.value.trim())
    .filter((url) => url)
    .slice(0, 8)
    .map((url) => ({ url, alt: '' }));

  const createData = {
    title: formData.get('title'),
    description: formData.get('description'),
    endsAt: formData.get('expiryDate')
      ? new Date(formData.get('expiryDate')).toISOString()
      : null,
    tags: [],
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

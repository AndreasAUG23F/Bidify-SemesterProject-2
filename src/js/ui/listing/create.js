import { createListing } from '../../api/listing/create';

document.getElementById('addMediaUrl').addEventListener('click', () => {
  const container = document.getElementById('mediaUrlContainer');
  const mediaInputs = container.querySelectorAll('input[name="mediaUrl[]"]');

  if (mediaInputs.length >= 8) {
    alert('You can only add up to 8 image URLs.');
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

document
  .getElementById('mediaUrlContainer')
  .addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-url')) {
      const inputWrapper = event.target.closest('.media-url-item');
      inputWrapper.remove();
    }
  });

export async function onCreateListing(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  // Collect all media URLs from dynamically created inputs
  const mediaInputs = document.querySelectorAll('input[name="mediaUrl[]"]');
  const media = Array.from(mediaInputs)
    .map((input) => input.value.trim())
    .filter((url) => url) // Remove empty inputs
    .slice(0, 8) // Ensure no more than 8 URLs are submitted
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

// import { createListing } from '../../api/listing/create';

// /**
//  * Handles the create listing form submission.
//  *
//  * @param {Event} event - The event object representing the form submission.
//  */
// export async function onCreateListing(event) {
//   event.preventDefault();

//   const formData = new FormData(event.target);

//   // Collect image URLs as an array of strings
//   const imageUrls = formData.get('mediaUrl')
//     ? formData
//         .get('mediaUrl')
//         .split(',')
//         .map((url) => url.trim())
//     : [];

//   const listingData = {
//     title: formData.get('title'),
//     description: formData.get('description'),
//     expiryDate: formData.get('expiryDate'),
//     images: imageUrls, // Pass image URLs as an array
//   };

//   await createListing(listingData);
// }

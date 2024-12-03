import { createListing } from '../../api/listing/create';

export async function onCreateListing(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const tags = formData.get('tags')
    ? formData
        .get('tags')
        .split(',')
        .map((tag) => tag.trim())
    : [];

  const media = formData.get('mediaUrl')
    ? formData
        .get('mediaUrl')
        .split(',')
        .map((url) => ({ url: url.trim(), alt: '' }))
    : [];

  const createData = {
    title: formData.get('title'),
    description: formData.get('body'),
    endsAt: formData.get('endsAt')
      ? new Date(formData.get('endsAt')).toISOString()
      : null,
    tags,
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

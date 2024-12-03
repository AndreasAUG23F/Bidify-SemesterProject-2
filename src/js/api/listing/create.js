import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export async function createListing(title, description, endsAt, tags, media) {
  const body = {
    title,
    description,
    endsAt,
    tags,
    media,
  };

  console.log('Request payload:', body);

  try {
    const response = await fetch(AUCTION_LISTINGS, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Failed to create listing. Status:', response.status);
      console.error('API response body:', result);
    }

    return result;
  } catch (error) {
    console.error('Something went wrong while creating the listing:', error);
  }
}

// import { AUCTION_LISTINGS } from '../constants';
// import { headers } from '../header';

// /**
//  * Creates a new listing by sending data to the API.
//  *
//  * @param {Object} listingData - The data of the listing to be created.
//  * Includes title, description, expiryDate, and image URLs.
//  */
// export async function createListing({
//   title,
//   description,
//   expiryDate,
//   images,
// }) {
//   const listingPayload = {
//     title,
//     description,
//     expiryDate,
//     images, // Send URLs directly as JSON array
//   };

//   try {
//     const response = await fetch(AUCTION_LISTINGS, {
//       method: 'POST',
//       headers: headers(true), // Ensure JSON headers
//       body: JSON.stringify(listingPayload), // Send JSON payload
//     });

//     if (response.ok) {
//       const data = await response.json();
//       alert('Listing created successfully!');
//       console.log(data);
//       window.location.href = '/';
//     } else {
//       const error = await response.json();
//       alert(`Failed to create listing: ${error.message}`);
//       console.error(error);
//     }
//   } catch (error) {
//     alert('An error occurred while creating the listing.');
//     console.error(error);
//   }
// }

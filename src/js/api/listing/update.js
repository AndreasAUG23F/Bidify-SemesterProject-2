import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export async function updateListing(
  listingId,
  { title, description, media, expiryDate }
) {
  try {
    const response = await fetch(`${AUCTION_LISTINGS}/${listingId}`, {
      method: 'PUT',
      headers: {
        ...headers(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        media,
        expiryDate,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error(
        'Failed to update the listing:',
        response.status,
        response.statusText,
        errorData
      );
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error updating the listing:', error);
    throw error;
  }
}

// export async function updateProfile(username, { avatar, banner }) {
//     const profileBody = {
//       avatar: avatar,
//       banner: banner,
//     };

//     console.log("request body", profileBody);

//     try {
//       const response = await fetch(API_SOCIAL_PROFILES + "/" + username, {
//         method: "PUT",
//         headers: headers(),
//         body: JSON.stringify(profileBody),
//       });

//       console.log("Request Payload", JSON.stringify(profileBody, null, 2));
//       console.log("Response", response);

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Profile updated", data);
//         window.location.href = "/profile/";
//         return data;
//       }
//     } catch (error) {
//       console.error("An error occurred", error);
//     }
//   }

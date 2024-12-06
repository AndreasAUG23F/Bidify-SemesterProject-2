import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export async function updateListing(
  listingId,
  { title, description, endsAt, tags, media }
) {
  const body = {
    title,
    description,
    endsAt,
    tags,
    media,
  };

  try {
    const response = await fetch(`${AUCTION_LISTINGS}/${listingId}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(
        'Update failed. Server responded with:',
        response.statusText
      );
      return null;
    }

    const data = await response.json();
    alert('Post successfully updated');
    return data;
  } catch (error) {
    console.error('Failed to update the listing', error);
    return null;
  }
}

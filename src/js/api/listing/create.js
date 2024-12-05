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

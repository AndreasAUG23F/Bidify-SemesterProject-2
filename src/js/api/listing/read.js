import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export async function readListing(id) {
  try {
    const response = await fetch(`${AUCTION_LISTINGS}/${id}?_author=true`, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch post:', response.status);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}

export async function readListings(limit = 12, page = 1, tag) {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      ...(tag && { tag: tag }),
      _seller: true,
    });

    const response = await fetch(`${AUCTION_LISTINGS}?${params}`, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const data = await response.json();
      const listings = data.data;
      return listings;
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
}

/*export async function readListingByUser(name, limit = 12, page = 1, tag) {
}*/

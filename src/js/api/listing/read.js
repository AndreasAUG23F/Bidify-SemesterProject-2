import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export async function readListing(id) {
  try {
    const response = await fetch(`${AUCTION_LISTINGS}/${id}?seller=true`, {
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
      _seller: true,
      _bids: true,
      sort: 'created',
      sortOrder: 'desc',
    });

    if (tag) {
      params.append('tag', tag);
    }

    const url = `${AUCTION_LISTINGS}?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(
        `Error! Didnt manage to fetch listings: ${response.status}`
      );
    }

    const data = await response.json();
    const listings = data.data;
    return listings;
  } catch (error) {
    console.error('Error fetching Listings:', error);
    throw error;
  }
}

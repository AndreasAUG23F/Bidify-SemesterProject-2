import { AUCTION_LISTINGS } from '../constants';
import { headers } from '../header';

export async function deleteListing(id) {
  try {
    const response = await fetch(`${AUCTION_LISTINGS}/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });

    if (response.ok) {
      return true;
    } else {
      console.error(`Failed to delete post: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting post:`, error);
    return false;
  }
}

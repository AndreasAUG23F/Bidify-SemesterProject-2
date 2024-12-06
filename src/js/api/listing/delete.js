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
      console.error(`Failed to delete listing: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting listing:`, error);
    return false;
  }
}

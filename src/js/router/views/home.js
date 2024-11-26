import { setLogoutListener } from '../../ui/global/logout';
import { displayListings } from '../../ui/listing/makeListing';
import { readListings } from '../../api/listing/read';

// Set up logout listener
setLogoutListener();

// Fetch and display listings
async function runPage() {
  try {
    const listings = await readListings();
    console.log('Listings fetched:', listings);
    displayListings(listings);
  } catch (error) {
    console.error('Error fetching or displaying listings:', error);
  }
}

runPage();

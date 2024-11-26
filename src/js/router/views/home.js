import { displayListings } from '../../ui/listing/makeListing';
import { readListings } from '../../api/listing/read';
import { initCarousel } from '../../ui/global/carousel';
async function runPage() {
  try {
    const listings = await readListings();
    console.log('Listings data:', listings);
    displayListings(listings);
    await initCarousel('#carouselContainer');
  } catch (error) {
    console.error('Error fetching or displaying listings:', error);
  }
}

runPage();

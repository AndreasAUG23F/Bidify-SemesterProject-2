/**
 * Loads and renders the details of a specific auction listing.
 * Fetches the listing data from the API and passes it to the UI renderer.
 * @module ListingDetails
 * @async
 * @function loadListingDetails
 * @throws {Error} - Logs errors if fetching or rendering fails.
 */

import { readListing } from '../../api/listing/read';
import { renderListingDetails } from '../../ui/listing/listing';

async function loadListingDetails() {
  const listing = await readListing();
  renderListingDetails(listing);
}

loadListingDetails();

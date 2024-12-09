import { readListing } from '../../api/listing/read';
import { renderListingDetails } from '../../ui/listing/listing';

async function loadListingDetails() {
  const listing = await readListing();
  renderListingDetails(listing);
  /* const bidForm = document.getElementById('#bidForm');
   bidForm.addEventListener('submit', (event) => {
    renderListingDetails(listing);
  }); */
}

loadListingDetails();

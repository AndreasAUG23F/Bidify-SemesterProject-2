/**
 * Initializes the create listing page.
 * Attaches the form submission handler and ensures the user is authorized.
 * @module CreateListingPage
 */

import { onCreateListing } from '../../ui/listing/create';
import { authGuard } from '../../utilities/authGuard';

// Ensure user is logged in before allowing access
authGuard();

// Get the form and bind submit event if it exists
const form = document.forms.createListing;

if (form) {
  form.addEventListener('submit', onCreateListing);
} else {
  console.error("Form 'createListing' not found in the DOM.");
}

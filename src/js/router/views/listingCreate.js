/**
 * Initializes the create listing page.
 * Attaches the form submission handler and ensures the user is authorized.
 * @module CreateListingPage
 */

/**
 * Attaches a submission event listener to the create listing form.
 * Redirects unauthorized users to the login page.
 * @function
 */

import { onCreateListing } from '../../ui/listing/create';
import { authGuard } from '../../utilities/authGuard';

const form = document.forms.createListing;

form.addEventListener('submit', onCreateListing);
authGuard();

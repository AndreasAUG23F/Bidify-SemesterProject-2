import { updatePreview } from './preview.js';
import { addMediaUrl, setupMediaFieldRemoval } from './mediaFields.js';
import { onCreateListing } from './create.js';

if (document.forms.createListing) {
  document.forms.createListing.addEventListener('input', updatePreview);
  document.forms.createListing.addEventListener('submit', onCreateListing);
}

const addBtn = document.getElementById('addMediaUrl');
if (addBtn) {
  addBtn.addEventListener('click', addMediaUrl);
}

setupMediaFieldRemoval();

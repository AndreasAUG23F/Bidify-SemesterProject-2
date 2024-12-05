import { deleteListing } from '../../api/listing/delete';

export async function onDeleteListing(event) {
  const listingId = event.target.dataset.listingId;
  const listingElement = event.target.closest('.listing');

  if (!listingId) {
    console.error('listing ID not found.');
    return;
  }

  const confirmed = confirm(
    'Are you sure you want to delete this awesome listing?'
  );
  if (confirmed) {
    const success = await deleteListing(listingId);
    if (success) {
      alert('listing is deleted.');
      localStorage.removeItem('listingId');
      const currentPath = window.location.pathname;

      if (currentPath.includes('listing')) {
        window.location.href = '/';
      } else {
        listingElement.remove();
      }
    } else {
      alert('Failed to delete the listing.');
    }
  }
}

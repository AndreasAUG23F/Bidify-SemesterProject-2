import { updateListing } from '../../api/listing/update';

export async function onUpdateListing(event, listingId) {
  event.preventDefault();

  const title = event.target.title.value;
  const description = event.target.description.value;
  const expiryDate = event.target.expiryDate.value;
  const media = Array.from(
    event.target.querySelectorAll('input[name="mediaUrl[]"]')
  ).map((input) => input.value);

  try {
    const updatedListing = await updateListing(listingId, {
      title,
      description,
      expiryDate,
      media,
    });
    console.log('Listing updated successfully:', updatedListing);
    window.location.href = `/post/view/?id=${listingId}`;
  } catch (error) {
    console.error('Error while updating listing:', error);
  }
}

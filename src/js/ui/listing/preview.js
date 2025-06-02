export function updatePreview() {
  const previewTitle = document.getElementById('previewTitle');
  const previewDescription = document.getElementById('previewDescription');
  const previewExpiry = document.getElementById('previewExpiry');
  const previewImages = document.getElementById('previewImages');
  const previewTags = document.getElementById('previewTags');

  const formData = new FormData(document.forms.createListing);

  previewTitle.textContent = formData.get('title') || 'Listing Title';
  previewDescription.textContent =
    formData.get('description') || 'Listing Description';
  previewExpiry.textContent =
    formData.get('expiryDate') && formData.get('expiryTime')
      ? `Ends At: ${new Date(
          `${formData.get('expiryDate')}T${formData.get('expiryTime')}`
        ).toLocaleString()}`
      : 'Expiry Date and Time not set';

  previewImages.innerHTML = '';
  const mediaItems = document.querySelectorAll('.media-url-item');
  mediaItems.forEach((item) => {
    const urlInput = item.querySelector('input[name="mediaUrl[]"]');
    const altInput = item.querySelector('input[name="altText[]"]');
    const url = urlInput?.value.trim() || '';
    const alt = altInput?.value.trim() || '';
    if (url) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = alt || 'Preview Image';
      img.classList.add('w-24', 'h-24', 'object-cover', 'rounded');
      previewImages.appendChild(img);
    }
  });

  const tags = formData.get('tags') || '';
  previewTags.textContent = tags
    ? `Tags: ${tags
        .split(',')
        .map((t) => t.trim())
        .join(', ')}`
    : 'No tags set';
}

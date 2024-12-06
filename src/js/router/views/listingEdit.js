import { authGuard } from '../../utilities/authGuard';
import { readListing } from '../../api/listing/read';
import { onUpdateListing } from '../../ui/listing/update';

authGuard();

async function loadListing() {
  const listingId = new URLSearchParams(window.location.search).get('id');
  const editForm = document.forms['editListing'];

  if (!listingId) {
    console.error('No listing ID provided.');
    document.body.innerHTML = '<p>The listing could not be found.</p>';
    return;
  }

  try {
    const listing = await readListing(listingId);

    if (listing && listing.data) {
      const { title, description, endsAt, media } = listing.data;

      editForm.title.value = title || '';
      editForm.description.value = description || '';

      const expiryDate = endsAt
        ? new Date(endsAt).toISOString().split('T')[0]
        : '';
      editForm.expiryDate.value = expiryDate;

      const mediaContainer = document.getElementById('mediaUrlContainer');
      mediaContainer.innerHTML = '';

      (media || []).forEach((item, index) => {
        const mediaField = document.createElement('div');
        mediaField.className = 'media-url-item flex items-center space-x-2';
        mediaField.innerHTML = `
                    <input
                        type="text"
                        name="mediaUrl[]"
                        placeholder="https://example.com/image.jpg"
                        class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100"
                        value="${item.url || ''}"
                    />
                    <input
                        type="text"
                        name="alt${index + 1}"
                        placeholder="Alt text"
                        class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100"
                        value="${item.alt || ''}"
                    />
                    <button
                        type="button"
                        class="remove-url bg-red-500 text-white rounded-full px-3"
                    >
                        -
                    </button>`;
        mediaContainer.appendChild(mediaField);
      });

      document.getElementById('addMediaUrl').addEventListener('click', () => {
        const mediaField = document.createElement('div');
        mediaField.className = 'media-url-item flex items-center space-x-2';
        mediaField.innerHTML = `
                    <input
                        type="text"
                        name="mediaUrl[]"
                        placeholder="https://example.com/image.jpg"
                        class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100"
                    />
                    <input
                        type="text"
                        name="alt"
                        placeholder="Alt text"
                        class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100"
                    />
                    <button
                        type="button"
                        class="remove-url bg-red-500 text-white rounded-full px-3"
                    >
                        -
                    </button>`;
        mediaContainer.appendChild(mediaField);
      });

      mediaContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-url')) {
          event.target.parentElement.remove();
        }
      });

      editForm.addEventListener('submit', (event) =>
        onUpdateListing(event, listingId)
      );
    } else {
      console.error('Listing not found.');
      document.body.innerHTML = '<p>The listing could not be found.</p>';
    }
  } catch (error) {
    console.error('Error loading listing:', error);
    document.body.innerHTML = '<p>Failed to load the listing.</p>';
  }
}

loadListing();

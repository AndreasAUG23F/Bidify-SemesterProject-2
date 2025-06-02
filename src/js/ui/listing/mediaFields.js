export function addMediaUrl() {
  const container = document.getElementById('mediaUrlContainer');
  const currentMediaInputs = container.querySelectorAll('.media-url-item');

  if (currentMediaInputs.length >= 8) {
    alert('Du kan kun legge til opptil 8 bilder.');
    return;
  }

  const newInput = document.createElement('div');
  newInput.classList.add('media-url-item', 'flex', 'items-center', 'space-x-2');
  newInput.innerHTML = `
    <input
      type="text"
      name="mediaUrl[]"
      placeholder="https://eksempel.com/bilde.jpg"
      class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required
    />
    <input
      type="text"
      name="altText[]"
      placeholder="Alt‐tekst for bildet"
      class="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <button type="button" class="remove-url bg-red-500 text-white rounded-full px-3">−</button>
  `;

  container.appendChild(newInput);
}

export function setupMediaFieldRemoval() {
  document
    .getElementById('mediaUrlContainer')
    .addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-url')) {
        const inputWrapper = event.target.closest('.media-url-item');
        if (inputWrapper) inputWrapper.remove();
      }
    });
}

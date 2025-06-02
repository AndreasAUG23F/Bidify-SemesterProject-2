/**
 * Initializes a carousel with auction listings.
 * Supports autoplay, manual navigation, and swipe gestures.
 * @module Carousel
 * @async
 * @function initCarousel
 * @param {string} carouselSelector - CSS selector for the carousel container.
 */

import readListings from '../../api/listing/read/readListings';

export const initCarousel = async (carouselSelector) => {
  const carouselContainer = document.querySelector(carouselSelector);
  if (!carouselContainer)
    return console.error(`Carousel selector "${carouselSelector}" not found.`);

  try {
    const listings = await readListings(5);
    if (!listings?.length) {
      carouselContainer.innerHTML =
        '<div class="text-center text-gray-500">No listings available.</div>';
      return;
    }

    carouselContainer.innerHTML = '';

    listings.forEach((listing, index) => {
      const slide = document.createElement('div');
      slide.className = `carousel-slide ${index === 0 ? 'block' : 'hidden'} w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg relative overflow-hidden group`;

      const image = document.createElement('img');
      image.className =
        'listingImage w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-110 group-hover:blur-sm group-hover:brightness-75';
      image.src = listing.media?.[0]?.url || '';
      image.alt = listing.media?.[0]?.alt || 'Listing image';

      const title = document.createElement('div');
      title.className =
        'absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-sm sm:text-base lg:text-lg px-4 py-2 rounded-lg text-center shadow-lg backdrop-blur-md';
      title.innerText = listing.title || 'No Title';

      const button = document.createElement('button');
      button.innerText = 'View Listing';
      button.className =
        'absolute inset-x-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-lg sm:text-xl py-3 px-8 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-transform duration-300 hover:scale-105';
      button.addEventListener('click', () => {
        localStorage.setItem('listingId', JSON.stringify(listing.id));
        window.location.href = `/listing/?id=${listing.id}`;
      });

      slide.append(image, title, button);
      carouselContainer.appendChild(slide);
    });

    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer) return console.error('Dots container not found.');

    dotsContainer.innerHTML = '';
    const dots = listings.map((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot h-3 w-3 rounded-full cursor-pointer transition';
      dot.classList.add(i === 0 ? 'bg-gray-500' : 'bg-gray-300');
      dot.addEventListener('click', () => {
        currentSlide = i;
        update();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    const update = () => {
      slides.forEach((s, i) => s.classList.toggle('block', i === currentSlide));
      dots.forEach((d, i) => {
        d.classList.toggle('bg-gray-500', i === currentSlide);
        d.classList.toggle('bg-gray-300', i !== currentSlide);
      });
    };

    document.querySelector('.next-button2')?.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      update();
    });

    document.querySelector('.prev-button2')?.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      update();
    });

    let startX = 0;
    carouselContainer.addEventListener(
      'touchstart',
      (e) => (startX = e.touches[0].clientX)
    );
    carouselContainer.addEventListener('touchend', (e) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      if (deltaX < -50) currentSlide = (currentSlide + 1) % slides.length;
      else if (deltaX > 50)
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      update();
    });

    update();
  } catch (error) {
    console.error('Error initializing carousel:', error);
  }
};

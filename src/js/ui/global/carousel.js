import { readListings } from '../../api/listing/read';

export const initCarousel = async (carouselSelector) => {
  const carouselContainer = document.querySelector(carouselSelector);
  if (!carouselContainer) {
    console.error(`Element with selector ${carouselSelector} not found.`);
    return;
  }

  try {
    const listings = await readListings(5);
    if (!listings || listings.length === 0) {
      console.error('No listings found for carousel.');
      carouselContainer.innerHTML =
        '<div class="text-center text-gray-500">No listings available.</div>';
      return;
    }

    carouselContainer.innerHTML = '';

    listings.forEach((listing, index) => {
      const slide = document.createElement('div');
      slide.className = `carousel-slide ${
        index === 0 ? 'block' : 'hidden'
      } w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg relative overflow-hidden group`;
      slide.style.position = 'relative';

      const image = document.createElement('img');
      image.className =
        'listingImage w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-110 group-hover:blur-sm group-hover:brightness-75';
      if (Array.isArray(listing.media) && listing.media.length > 0) {
        const mediaItem = listing.media[0];
        image.src = mediaItem.url || '';
        image.alt = mediaItem.alt || 'Listing image';
      } else {
        image.alt = 'No image available';
        image.style.background = '#f0f0f0';
      }

      const title = document.createElement('div');
      title.className =
        'absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-sm sm:text-base lg:text-lg px-4 py-2 rounded-lg text-center shadow-lg backdrop-blur-md';
      title.innerText = listing.title || 'No Title';

      const viewButton = document.createElement('button');
      viewButton.innerText = 'View Listing';
      viewButton.className =
        'absolute inset-x-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-lg sm:text-xl py-3 px-8 rounded shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-transform duration-300 ease-in-out hover:scale-105 flex items-center justify-center';
      viewButton.style.minWidth = '150px';
      viewButton.addEventListener('click', async () => {
        window.location.href = `/post/?id=${listing.id}`;
        localStorage.setItem('listingId', JSON.stringify(listing.id));
      });

      slide.append(image, title, viewButton);
      carouselContainer.appendChild(slide);
    });

    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    const dotsContainer = document.querySelector(
      '.flex.justify-center.space-x-2.py-4.bg-white'
    );
    if (!dotsContainer) {
      console.error('Dots container not found.');
      return;
    }

    dotsContainer.innerHTML = '';
    const dots = Array.from({ length: totalSlides }, (_, index) => {
      const dot = document.createElement('span');
      dot.className =
        'dot h-3 w-3 bg-gray-300 rounded-full transition cursor-pointer hover:bg-gray-400';

      if (index === 0) {
        dot.classList.add('bg-gray-500');
      }

      dot.addEventListener('click', () => {
        currentSlide = index;
        updatePosition();
      });

      dotsContainer.appendChild(dot);
      return dot;
    });

    const updateDots = () => {
      dots.forEach((dot, index) => {
        dot.classList.toggle('bg-gray-500', index === currentSlide);
        dot.classList.toggle('bg-gray-300', index !== currentSlide);
      });
    };

    const updatePosition = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('hidden', index !== currentSlide);
        slide.classList.toggle('block', index === currentSlide);
      });
      updateDots();
    };

    const nextBtn = document.querySelector('.next-button2');
    const prevBtn = document.querySelector('.prev-button2');

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updatePosition();
      });

      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updatePosition();
      });
    } else {
      console.error('Navigation buttons not found.');
    }

    let startX = 0;
    let endX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        // Swipe left
        currentSlide = (currentSlide + 1) % totalSlides;
        updatePosition();
      } else if (endX - startX > 50) {
        // Swipe right
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updatePosition();
      }
    });

    updatePosition();
  } catch (error) {
    console.error('Error initializing carousel:', error);
  }
};

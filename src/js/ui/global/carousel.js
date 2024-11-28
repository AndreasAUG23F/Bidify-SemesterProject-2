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
      return;
    }

    carouselContainer.innerHTML = '';

    listings.forEach((listing, index) => {
      const slide = document.createElement('div');
      slide.className = `carousel-slide ${
        index === 0 ? 'block' : 'hidden'
      } object-cover w-full h-[500px] max-w-full rounded-2xl`;
      slide.style.position = 'relative';

      const image = document.createElement('img');
      image.className = 'listingImage';
      image.style.width = '100%';
      image.style.height = '100%';
      image.style.objectFit = 'cover';
      image.style.borderRadius = '8px';

      if (Array.isArray(listing.media) && listing.media.length > 0) {
        const mediaItem = listing.media[0];
        image.src = mediaItem.url || '';
        image.alt = mediaItem.alt || 'Listing image';
      } else {
        console.warn(`Listing ${listing.title || 'unknown'} has no media URL.`);
        image.alt = 'No image available';
        image.style.background = '#f0f0f0';
      }

      const title = document.createElement('div');
      title.className = 'carousel-title';
      title.innerText = listing.title || 'No Title';
      title.style.position = 'absolute';
      title.style.bottom = '20px';
      title.style.left = '50%';
      title.style.transform = 'translateX(-50%)';
      title.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      title.style.color = 'white';
      title.style.padding = '10px 20px';
      title.style.borderRadius = '5px';
      title.style.fontSize = '16px';
      title.style.textAlign = 'center';
      title.style.width = 'auto';

      slide.append(image, title);
      carouselContainer.appendChild(slide);
    });

    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    const dotsContainer = document.querySelector(
      '.flex.justify-center.space-x-2.py-4.bg-white'
    );
    dotsContainer.innerHTML = '';

    const dots = Array.from({ length: totalSlides }, (_, index) => {
      const dot = document.createElement('span');
      dot.className = 'dot h-3 w-3 bg-gray-300 rounded-full transition';
      dot.style.cursor = 'pointer';
      dot.style.display = 'inline-block';

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

    updatePosition();
  } catch (error) {
    console.error('Error initializing carousel:', error);
  }
};

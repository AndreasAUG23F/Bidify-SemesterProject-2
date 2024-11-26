import { readListings } from '../../api/listing/read';

export const initCarousel = async (carouselSelector) => {
  const carouselContainer = document.querySelector(carouselSelector);
  if (!carouselContainer) {
    console.error(`Element with selector ${carouselSelector} not found.`);
    return;
  }

  try {
    // Fetch the latest 5 listings
    const listings = await readListings(5);
    if (!listings || listings.length === 0) {
      console.error('No listings found for carousel.');
      return;
    }

    // Clear existing content
    carouselContainer.innerHTML = '';

    // Create carousel slides
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
        image.style.background = '#f0f0f0'; // Optional fallback styling
      }

      const title = document.createElement('div');
      title.className = 'carousel-title';
      title.innerText = listing.title || 'No Title';
      title.style.position = 'absolute';
      title.style.bottom = '20px';
      title.style.left = '20px';
      title.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      title.style.color = 'white';
      title.style.padding = '10px 15px';
      title.style.borderRadius = '5px';
      title.style.fontSize = '16px';

      slide.append(image, title);
      carouselContainer.appendChild(slide);
    });

    // Navigation logic
    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    const updatePosition = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('hidden', index !== currentSlide);
        slide.classList.toggle('block', index === currentSlide);
      });
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

    // Initialize visibility
    updatePosition();
  } catch (error) {
    console.error('Error initializing carousel:', error);
  }
};

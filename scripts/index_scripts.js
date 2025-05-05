const sliderContainer = document.querySelector('#home-slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;
let totalSlides = slides.length;

// Clone slides function
function cloneSlides() {
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    sliderContainer.appendChild(clone);
  });
  // Update list after clonation
  totalSlides = document.querySelectorAll('.slide').length;
}

// Update the slider
function updateSlider() {
  const visibleSlides = 3;
  const centerIndex = Math.floor(visibleSlides / 2);

  const allSlides = document.querySelectorAll('.slide');
  allSlides.forEach(slide => slide.classList.remove('active', 'hidden'));

  const activeSlideIndex = (currentIndex + centerIndex) % totalSlides;
  allSlides[activeSlideIndex].classList.add('active');
  for (let i = 0; i < totalSlides; i++) {
    if (i < activeSlideIndex - centerIndex || i > activeSlideIndex + centerIndex) {
      allSlides[i].classList.add('hidden');
    }
  }
  console.log(activeSlideIndex)
}

// Clone the slides if necessary
function checkAndCloneSlides() {
  if (currentIndex + Math.floor(3 / 2) >= totalSlides - slides.length) {
    cloneSlides();
  }
}

cloneSlides(); // First clonation
updateSlider();

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
  checkAndCloneSlides(); // Verify and clone if necessary
  updateSlider();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  checkAndCloneSlides(); // Verifica e clona le slide se necessario
  updateSlider();
});

let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.hamburger-menu');

hamburger.addEventListener("click", function () {
  menu.classList.toggle('open'); // Alterna la classe direttamente al menu
});



//slider
const sliderContainer = document.querySelector('#home-slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;
let totalSlides = slides.length;

// Funzione per determinare quante slide sono visibili (1 su mobile, 3 su desktop)
function getVisibleSlides() {
  return window.innerWidth <= 835 ? 1 : 3;
}

// Funzione per clonare le slide per effetto infinito
function cloneSlides() {
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    sliderContainer.appendChild(clone);
  });
  // Aggiorna il numero totale di slide dopo la clonazione
  totalSlides = document.querySelectorAll('.slide').length;
}

// Aggiorna la visualizzazione delle slide
function updateSlider() {
  const visibleSlides = getVisibleSlides();
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
}

// Clona le slide se necessario quando si scorre
function checkAndCloneSlides() {
  if (currentIndex + Math.floor(getVisibleSlides() / 2) >= totalSlides - slides.length) {
    cloneSlides();
  }
}

// Prima clonazione e aggiornamento slider
cloneSlides();
updateSlider();

// Eventi per i pulsanti di navigazione
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
  checkAndCloneSlides();
  updateSlider();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  checkAndCloneSlides();
  updateSlider();
});

// Aggiorna la slider quando la finestra cambia dimensione
window.addEventListener('resize', updateSlider);

let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.hamburger-menu');

hamburger.addEventListener("click", function () {
  menu.classList.toggle('open'); // Alterna la classe direttamente al menu
});

//button hovered function
const btn = document.querySelector('.btn');
const btn1 = document.querySelector('.btn1');

// Quando passi il mouse su "Read More", cambia anche "Contact Us"
btn.addEventListener('mouseenter', () => {
  btn1.classList.add('hovered1');
});
btn.addEventListener('mouseleave', () => {
  btn1.classList.remove('hovered1');
});

// Quando passi il mouse su "Contact Us", cambia anche "Read More"
btn1.addEventListener('mouseenter', () => {
  btn.classList.add('hovered');
});
btn1.addEventListener('mouseleave', () => {
  btn.classList.remove('hovered');
});



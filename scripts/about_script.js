//Info square active

/**document.addEventListener('DOMContentLoaded', function () {
  const squares = document.querySelectorAll('.square');
  const sections = document.querySelectorAll('.cliccable');

  squares.forEach(square => {
    square.addEventListener('click', function () {
      // Remove the 'active' class from all squares
      squares.forEach(sq => sq.classList.remove('active'));

      // Add the 'active' class to the clicked square
      this.classList.add('active');

      // Hide all sections
      sections.forEach(section => section.style.display = 'none');

      // Show the corresponding section
      const sectionId = this.id.replace('-square', '');
      document.getElementById(sectionId).style.display = 'flex';
    });
  });
});**/

document.addEventListener('DOMContentLoaded', function () {
  const images = [
    'img/history.jpg',      // Prima immagine
    'img/contact-hero.jpg', // Seconda immagine
    'img/history1.jpg',     // Terza immagine
    'img/Hero-content.jpg'  // Quarta immagine
  ];

  let currentInd = 0; // Indice dell'immagine corrente
  const aboutPhotoContainer = document.querySelector('#about-photo'); // Contenitore immagine
  const aboutPhotoImg = aboutPhotoContainer.querySelector('img'); // Immagine principale
  const arrowContainer = document.querySelector('.arrow'); // Contenitore della freccia

  // Verifica che gli elementi siano stati trovati
  if (!aboutPhotoImg || !arrowContainer) return;

  // Aggiungi il listener al clic sul contenitore dell'immagine
  aboutPhotoContainer.addEventListener('click', function () {
    // Cambia immagine nella sequenza
    currentInd = (currentInd + 1) % images.length; // Incrementa l'indice e torna a 0 alla fine
    aboutPhotoImg.src = images[currentInd]; // Cambia la sorgente dell'immagine principale

    // Aggiungi la classe per la rotazione della freccia
    arrowContainer.classList.add('rotate-arrow');

    // Rimuovi la classe dopo l'animazione
    arrowContainer.addEventListener('animationend', function () {
      arrowContainer.classList.remove('rotate-arrow');
    }, { once: true });
  });
});

//Circle slider
const sliderContainer = document.querySelector('#team-slider-container');
const circles = Array.from(document.querySelectorAll('.team-circle'));
const prevButton = document.querySelector('.team-prev');
const nextButton = document.querySelector('.team-next');

let currentIndex = 0;
let totalCircles = circles.length;

// Clone slides function
function cloneCircles() {
  circles.forEach(circle => {
    const clone = circle.cloneNode(true);
    sliderContainer.appendChild(clone);
  });
  // Update list after clonation
  totalCircles = document.querySelectorAll('.team-circle').length;
}

// Update the slider
function updateSlider() {
  const visibleCircles = 3;
  const centerIndex = Math.floor(visibleCircles / 2);

  const allCircles = document.querySelectorAll('.team-circle');
  allCircles.forEach(circle => circle.classList.remove('active', 'hidden'));

  const activeSlideIndex = (currentIndex + centerIndex) % totalCircles;
  allCircles[activeSlideIndex].classList.add('active');
  for (let i = 0; i < totalCircles; i++) {
    if (i < activeSlideIndex - centerIndex || i > activeSlideIndex + centerIndex) {
      allCircles[i].classList.add('hidden');
    }
  }
}

// Clone the slides if necessary
function checkAndCloneSlides() {
  if (currentIndex + Math.floor(3 / 2) >= totalCircles - circles.length) {
    cloneCircles();
  }
}

cloneCircles(); // First clonation
updateSlider();

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? totalCircles - 1 : currentIndex - 1;
  checkAndCloneSlides(); // Verify and clone if necessary
  updateSlider();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalCircles;
  checkAndCloneSlides(); // Verify and clone if necessary
  updateSlider();
});
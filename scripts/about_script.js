//change image on click
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

// Funzione per determinare quante "team-circle" sono visibili (1 su mobile, 3 su desktop)
function getVisibleCircles() {
  return window.innerWidth <= 835 ? 1 : 3;
}

// Funzione per clonare le "team-circle" per effetto infinito
function cloneCircles() {
  circles.forEach(circle => {
    const clone = circle.cloneNode(true);
    sliderContainer.appendChild(clone);
  });
  // Aggiorna il numero totale dopo la clonazione
  totalCircles = document.querySelectorAll('.team-circle').length;
}

// Aggiorna la visualizzazione delle "team-circle"
function updateSlider() {
  const visibleCircles = getVisibleCircles();
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

// Clona le "team-circle" se necessario quando si scorre
function checkAndCloneCircles() {
  if (currentIndex + Math.floor(getVisibleCircles() / 2) >= totalCircles - circles.length) {
    cloneCircles();
  }
}

// Prima clonazione e aggiornamento slider
cloneCircles();
updateSlider();

// Eventi per i pulsanti di navigazione
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? totalCircles - 1 : currentIndex - 1;
  checkAndCloneCircles();
  updateSlider();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalCircles;
  checkAndCloneCircles();
  updateSlider();
});

// Aggiorna la slider quando la finestra cambia dimensione
window.addEventListener('resize', updateSlider);

// Hamburger menu
let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.hamburger-menu');

hamburger.addEventListener("click", function () {
  menu.classList.toggle('open');
});

//Open hide-history
document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.querySelector('.open-history');
  const closeBtn = document.querySelector('.close-history');
  const historyBlock = document.querySelector('.hide-history');

  // All'inizio, nascondi il blocco (se non già nascosto via CSS)
  historyBlock.style.display = 'none';

  openBtn.addEventListener('click', function (e) {
    e.preventDefault();
    historyBlock.style.display = 'block';
    openBtn.style.display = 'none';
  });

  closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    historyBlock.style.display = 'none';
    openBtn.style.display = 'inline-block';
  });
});

//Open hide-content
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('about-slider-track');
  const squares = slider.querySelectorAll('.about-square');
  const readMoreBtns = slider.querySelectorAll('.comm-btn');
  const closeBtns = slider.querySelectorAll('.close-detail');

  readMoreBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // Trova la card su cui hai cliccato
      const aboutSquare = btn.closest('.about-square');
      // Nascondi tutte le card
      squares.forEach(sq => sq.classList.remove('detail-view'));
      // Attiva la classe di dettaglio SOLO su quella cliccata
      aboutSquare.classList.add('detail-view');
      // Attiva il layout di dettaglio
      slider.classList.add('show-detail');
    });
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // Rimuovi la classe di dettaglio da tutte le card
      squares.forEach(sq => sq.classList.remove('detail-view'));
      // Torna alla griglia
      slider.classList.remove('show-detail');
    });
  });
});
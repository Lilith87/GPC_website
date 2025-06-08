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
let circles = Array.from(document.querySelectorAll('.team-circle'));
const prevButton = document.querySelector('.team-prev');
const nextButton = document.querySelector('.team-next');

let currentIndex = 0;
let totalCircles = circles.length;

// Quante slide visibili (1 su mobile, 3 su desktop)
function getVisibleCircles() {
  return window.innerWidth <= 825 ? 1 : 3;
}

// Clona per effetto infinito
function cloneCircles() {
  circles.forEach(circle => {
    const clone = circle.cloneNode(true);
    sliderContainer.appendChild(clone);
  });
  circles = Array.from(document.querySelectorAll('.team-circle'));
  totalCircles = circles.length;
}

// Ordina le slide su mobile (team2 → 0, team3 → 1, il resto a seguire)
function updateMobileOrder() {
  const isMobile = window.innerWidth <= 825;
  const allCircles = Array.from(document.querySelectorAll('.team-circle'));
  if (isMobile) {
    let orderCounter = 2;
    allCircles.forEach(circle => {
      if (circle.classList.contains('team2')) {
        circle.style.order = 0;
      } else if (circle.classList.contains('team3')) {
        circle.style.order = 1;
      } else {
        circle.style.order = orderCounter++;
      }
    });
  } else {
    allCircles.forEach(circle => {
      circle.style.order = '';
    });
  }
}

// Imposta la slide iniziale (parte da team2 su mobile)
function setInitialSlide() {
  const isMobile = window.innerWidth <= 825;
  const allCircles = Array.from(document.querySelectorAll('.team-circle'));
  if (isMobile) {
    // Trova l'indice di .team2
    const team2Index = allCircles.findIndex(circle => circle.classList.contains('team2'));
    if (team2Index !== -1) currentIndex = team2Index;
  } else {
    currentIndex = 0;
  }
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
  updateMobileOrder();
}

// Clona se necessario quando si scorre
function checkAndCloneCircles() {
  if (currentIndex + Math.floor(getVisibleCircles() / 2) >= totalCircles - circles.length) {
    cloneCircles();
  }
}

// Inizializzazione
cloneCircles();
setInitialSlide();
updateSlider();

// Pulsanti navigazione
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

// Su resize aggiorna slide iniziale e slider
window.addEventListener('resize', () => {
  setInitialSlide();
  updateSlider();
});

//Collaboration slider
const collabContainer = document.querySelector('#about-slider-container');
const collabCircle = Array.from(document.querySelectorAll('#about-slider-container .circle'));
const prevBtn = document.querySelector('#about-slider .prev');
const nextBtn = document.querySelector('#about-slider .next');

let currentInd = 0;
let totalCollabCircle = collabCircle.length;

// Quanti elementi visibili: 1 su mobile, 3 su desktop
function getVisCircles() {
  return window.innerWidth <= 825 ? 1 : 3;
}

// Clona le .circle per effetto infinito
function cloneCollabCircles() {
  collabCircle.forEach(circle => {
    const clone = circle.cloneNode(true);
    collabContainer.appendChild(clone);
  });
  totalCollabCircle = document.querySelectorAll('#about-slider-container .circle').length;
}

// Aggiorna la visualizzazione
function updSlider() {
  const visCircles = getVisCircles();
  const centerInd = Math.floor(visCircles / 2);
  const allCollabCircles = document.querySelectorAll('#about-slider-container .circle');
  allCollabCircles.forEach(circle => circle.classList.remove('active', 'hidden'));

  const actSlideInd = (currentInd + centerInd) % totalCollabCircle;
  allCollabCircles[actSlideInd].classList.add('active');
  for (let i = 0; i < totalCollabCircle; i++) {
    if (i < actSlideInd - centerInd || i > actSlideInd + centerInd) {
      allCollabCircles[i].classList.add('hidden');
    }
  }
}

// Clona se necessario quando si scorre
function checkAndCloneCollabCircles() {
  if (currentInd + Math.floor(getVisCircles() / 2) >= totalCollabCircle - collabCircle.length) {
    cloneCollabCircles();
  }
}

// Avvio
cloneCollabCircles();
updSlider();

// Eventi pulsanti
prevBtn.addEventListener('click', () => {
  currentInd = (currentInd === 0) ? totalCollabCircle - 1 : currentInd - 1;
  checkAndCloneCollabCircles();
  updSlider();
});

nextBtn.addEventListener('click', () => {
  currentInd = (currentInd + 1) % totalCollabCircle;
  checkAndCloneCollabCircles();
  updSlider();
});

// Aggiorna slider su resize
window.addEventListener('resize', updSlider);



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

//info square
document.addEventListener("DOMContentLoaded", function () {
  // Get all squares
  const squares = document.querySelectorAll('.infosquare-container .square');

  squares.forEach(square => {
    square.addEventListener('click', function (e) {
      // Remove 'active' from all squares
      squares.forEach(sq => sq.classList.remove('active'));
      // Add 'active' to the clicked square
      this.classList.add('active');
    });
  });
});
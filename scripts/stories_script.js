document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector('.stories-content');
  const squares = grid.querySelectorAll('.story-square');
  const hiddens = grid.querySelectorAll('.story-hidden');

  // Nascondi tutte le .story-hidden all'inizio
  hiddens.forEach(hidden => hidden.style.display = 'none');

  // Funzione per tornare alla griglia
  function showGrid() {
    grid.style.display = 'grid';
    squares.forEach(sq => sq.style.display = '');
    hiddens.forEach(hidden => hidden.style.display = 'none');
  }

  // Collega ogni square al suo hidden
  squares.forEach(square => {
    square.addEventListener('click', function () {
      const classes = Array.from(square.classList);
      const itemClass = classes.find(c => c.startsWith('grid-item'));
      if (!itemClass) return;
      const num = itemClass.replace('grid-item', '');
      const hiddenSelector = `.story-hidden${num}`;
      const hidden = grid.querySelector(hiddenSelector);

      if (hidden) {
        grid.style.display = 'block';
        squares.forEach(sq => sq.style.display = 'none');
        hiddens.forEach(h => h.style.display = 'none');
        hidden.style.display = 'block';
      }
    });
  });

  // Gestione di tutti i pulsanti/link di chiusura
  hiddens.forEach(hidden => {
    hidden.addEventListener('click', function (e) {
      if (
        e.target.classList.contains('close-detail') ||
        e.target.classList.contains('close-hidden')
      ) {
        e.preventDefault();
        showGrid();
      }
    });
  });
});

let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.hamburger-menu');

hamburger.addEventListener("click", function () {
  menu.classList.toggle('open'); // Alterna la classe direttamente al menu
});
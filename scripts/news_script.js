document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector('.news-content');
  const squares = grid.querySelectorAll('.news-square');
  const hiddens = grid.querySelectorAll('.news-hidden');

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
      const itemClass = classes.find(c => c.startsWith('news-grid-item'));
      if (!itemClass) return;
      const num = itemClass.replace('news-grid-item', '');
      const hiddenSelector = `.news-hidden${num}`;
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
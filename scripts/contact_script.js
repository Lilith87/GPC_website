document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const fields = ['email', 'name', 'birthdate', 'subject', 'message'];
  const resultDiv = document.getElementById('form-result');

  // Crea elementi per messaggi di errore
  fields.forEach(field => {
    const input = document.getElementById(field);
    if (input) {
      const error = document.createElement('div');
      error.className = 'error-message';
      error.style.display = 'none';
      error.id = `${field}-error`;
      input.parentElement.appendChild(error);
    }
  });

  // Messaggio di conferma
  let confirmMsg = document.createElement('div');
  confirmMsg.className = 'confirm-message';
  confirmMsg.style.display = 'none';
  form.appendChild(confirmMsg);

  // Validazione avanzata
  function validateEmail(email) {
    // Regex RFC 5322 semplificata
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  }

  function validateDate(dateString) {
    // Deve essere una data valida e non nel futuro
    const date = new Date(dateString);
    const now = new Date();
    return !isNaN(date.getTime()) && date < now;
  }

  function validateName(name) {
    // Solo lettere, spazi, almeno 2 caratteri
    return /^[a-zA-ZàèéìòùÀÈÉÌÒÙ'’\s\-]{2,}$/.test(name.trim());
  }

  function validateMessage(message) {
    // Almeno 10 caratteri significativi
    return message.trim().length >= 10;
  }

  function showError(field, message) {
    const error = document.getElementById(`${field}-error`);
    if (error) {
      error.textContent = message;
      error.style.display = 'block';
    }
  }

  function clearErrors() {
    fields.forEach(field => {
      const error = document.getElementById(`${field}-error`);
      if (error) error.style.display = 'none';
    });
    confirmMsg.style.display = 'none';
  }

  document.getElementById('subject').selectedIndex = 0;

  form.addEventListener('reset', function () {
    document.getElementById('subject').selectedIndex = 0;
    clearErrors();
    resultDiv.innerHTML = "";
  });

  // Validazione in tempo reale (opzionale)
  form.email.addEventListener('input', function () {
    if (!validateEmail(this.value)) {
      showError('email', 'Enter a valid email');
    } else {
      document.getElementById('email-error').style.display = 'none';
    }
  });
  form.name.addEventListener('input', function () {
    if (!validateName(this.value)) {
      showError('name', 'The name must contain only letters and at least 2 characters');
    } else {
      document.getElementById('name-error').style.display = 'none';
    }
  });
  form.birthdate.addEventListener('input', function () {
    if (!validateDate(this.value)) {
      showError('birthdate', 'Please enter a valid date of birth');
    } else {
      document.getElementById('birthdate-error').style.display = 'none';
    }
  });
  form.message.addEventListener('input', function () {
    if (!validateMessage(this.value)) {
      showError('message', 'The message must be at least 10 characters long');
    } else {
      document.getElementById('message-error').style.display = 'none';
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    let hasError = false;
    const email = form.email.value.trim();
    const name = form.name.value.trim();
    const birthdate = form.birthdate.value.trim();
    const subject = form.subject.value;
    const message = form.message.value.trim();

    if (!validateEmail(email)) {
      showError('email', 'Enter a valid email');
      hasError = true;
    }
    if (!validateName(name)) {
      showError('name', 'The name must contain only letters and at least 2 characters');
      hasError = true;
    }
    if (!validateDate(birthdate)) {
      showError('birthdate', 'Please enter a valid date of birth');
      hasError = true;
    }
    if (!subject || subject === "") {
      showError('subject', 'Select the subject');
      hasError = true;
    }
    if (!validateMessage(message)) {
      showError('message', 'The message must be at least 10 characters long');
      hasError = true;
    }

    if (hasError) return;

    // Invio con AJAX
    confirmMsg.textContent = 'Sending...';
    confirmMsg.style.display = 'block';

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(text => {
        confirmMsg.textContent = text;
        confirmMsg.style.display = 'block';
        if (text.toLowerCase().includes('successfully')) {
          form.reset();
          document.getElementById('subject').selectedIndex = 0;
        }
      })
      .catch(() => {
        confirmMsg.textContent = "Error sending. Please try again later.";
        confirmMsg.style.display = 'block';
      });
  });
});

let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.hamburger-menu');

hamburger.addEventListener("click", function () {
  menu.classList.toggle('open'); // Alterna la classe direttamente al menu
});
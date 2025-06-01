<?php
// Sanifica i dati dal form
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$name = htmlspecialchars($_POST['name'] ?? '');
$birthdate = htmlspecialchars($_POST['birthdate'] ?? '');
$subject = htmlspecialchars($_POST['subject'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

// Validazione basilare
if (
    empty($email) ||
    empty($name) ||
    empty($birthdate) ||
    empty($subject) ||
    empty($message)
) {
    echo "Tutti i campi sono obbligatori.";
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email non valida.";
    exit;
}

// Dati per la mail
$to = "info@girlsonthepathofchange.com";
$mail_subject = "Contact Form: $subject";
$body = "Nome: $name\nEmail: $email\nData di nascita: $birthdate\nSoggetto: $subject\nMessaggio:\n$message";
$headers = "From: $name <$email>\r\nReply-To: $email\r\n";

// Invio mail
if (mail($to, $mail_subject, $body, $headers)) {
    echo "Messaggio inviato con successo!";
} else {
    echo "Errore nell'invio del messaggio. Riprova più tardi.";
}
?>
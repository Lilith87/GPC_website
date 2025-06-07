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
    echo "All fields are required.";
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email.";
    exit;
}

// Dati per la mail
$to = "info@girlsonthepathofchange.com";
$mail_subject = "Messagge from the website, subject: $subject";
$body = "Name: $name\nEmail: $email\nDate of birth: $birthdate\nSubject: $subject\nMessagge:\n$message";
$headers = "From: $name <$email>\r\nReply-To: $email\r\n";

// Invio mail
if (mail($to, $mail_subject, $body, $headers)) {
    echo "Message sent successfully!";
} else {
    echo "Error sending message. Try again later.";
}
?>
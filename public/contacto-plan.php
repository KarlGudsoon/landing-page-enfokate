<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $destinatario = "maturana.or.adrian@gmail.com";  // <--- Cambia esto por tu correo real

    $nombre = htmlspecialchars($_POST["nombre"]);
    $email = htmlspecialchars($_POST["email"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);
    $plan = htmlspecialchars($_POST["plan"]);

    $asunto = "Nueva cotización de plan de marketing";
    $contenido = "Nombre: $nombre\n";
    $contenido .= "Correo: $email\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Plan de interés: $plan\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    $cabeceras = "From: $email";

    if (mail($destinatario, $asunto, $contenido, $cabeceras)) {
        header("Location:/index.html?id=mensaje_enviado");
    } else {
        echo "Error al enviar el mensaje. Verifica la configuración de correo en XAMPP.";
    }
}
?>


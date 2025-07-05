<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $destinatario = "maturana.or.adrian@gmail.com";  // <--- Cambia esto por tu correo real

    $nombre = htmlspecialchars($_POST["nombre"]);
    $email = htmlspecialchars($_POST["email"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);
    $sesion = htmlspecialchars($_POST["sesion"]);

    $asunto = "Nueva cotizacion de sesión de asesoría o mentoría";
    $contenido = "Nombre: $nombre\n";
    $contenido .= "Correo: $email\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Curso/Asesoria/Mentoría: $sesion\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    $cabeceras = "From: $email";

    if (mail($destinatario, $asunto, $contenido, $cabeceras)) {
        header("Location:/index.html?id=mensaje_enviado");
    } else {
        echo "Error al enviar el mensaje. Verifica la configuración de correo en XAMPP.";
    }
}
?>


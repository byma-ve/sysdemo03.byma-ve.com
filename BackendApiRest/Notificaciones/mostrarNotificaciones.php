<?php
//include_once "../services/cors.php";
//include_once "funciones.php";

//$id_usuario = $_GET['id_usuario'];
//$notificaciones = mostrarNotificaciones($id_usuario);
//echo json_encode($notificaciones);

// Asegúrate de que los errores se registren en el log en lugar de mostrarse
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Establece el tipo de contenido a JSON
header('Content-Type: application/json');

try {
    include_once "../services/cors.php";
    include_once "funciones.php";

    // Verifica si id_usuario está presente
    if (!isset($_GET['id_usuario'])) {
        throw new Exception("El parámetro id_usuario es requerido");
    }

    $id_usuario = $_GET['id_usuario'];

    // Asegúrate de que id_usuario sea un número
    if (!is_numeric($id_usuario)) {
        throw new Exception("id_usuario debe ser un número");
    }

    $notificaciones = mostrarNotificaciones($id_usuario);

    // Verifica si $notificaciones es null o un array vacío
    if ($notificaciones === null || (is_array($notificaciones) && empty($notificaciones))) {
        echo json_encode(["message" => "No se encontraron notificaciones"]);
    } else {
        echo json_encode($notificaciones);
    }

} catch (Exception $e) {
    // Registra el error en el log
    error_log("Error en mostrarNotificaciones.php: " . $e->getMessage());

    // Devuelve un JSON con el mensaje de error
    echo json_encode(["error" => $e->getMessage()]);
}
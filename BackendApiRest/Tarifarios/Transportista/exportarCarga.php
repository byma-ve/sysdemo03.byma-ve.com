<?php
include_once "../../services/cors.php";
include_once "funciones.php";
$id_transportista = $_GET['id_transportista'];

$exportar = exportarCarga($id_transportista);
echo json_encode($exportar);
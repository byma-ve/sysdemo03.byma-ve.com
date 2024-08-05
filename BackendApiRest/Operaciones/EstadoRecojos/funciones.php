<?php
require_once('../../services/api_google_drive/api-google/vendor/autoload.php');
putenv('GOOGLE_APPLICATION_CREDENTIALS=../../services/api_google_drive/bymavearchivos-f8c2d3d5790f.json');

function crearEstructuraCarpetasMensual($servicio, $idCarpetaRaiz, $anio, $mes, $cliente)
{
    $nombreCarpetaAnio = $anio;

    // Crear la carpeta del año si no existe
    $idCarpetaAnio = crearCarpetaSinoExiste($servicio, $idCarpetaRaiz, $nombreCarpetaAnio);

    // Crear la carpeta del mes si no existe
    $idCarpetaMes = crearCarpetaSinoExiste($servicio, $idCarpetaAnio, obtenerNombreMes($mes));

    // Crear la carpeta de imágenes si no existe
    $idCarpetaImagenes = crearCarpetaSinoExiste($servicio, $idCarpetaMes, "Imágenes Recojos");

    $idCarpetaCliente = crearCarpetaSinoExiste($servicio, $idCarpetaImagenes, $cliente);

    return $idCarpetaCliente;
}

function obtenerNombreMes($numeroMes) {
    $meses = array(
        1 => 'Enero',
        2 => 'Febrero',
        3 => 'Marzo',
        4 => 'Abril',
        5 => 'Mayo',
        6 => 'Junio',
        7 => 'Julio',
        8 => 'Agosto',
        9 => 'Septiembre',
        10 => 'Octubre',
        11 => 'Noviembre',
        12 => 'Diciembre'
    );

    return $meses[$numeroMes];
}

function crearCarpetaSinoExiste($service, $idCarpetaPadre, $nombreCarpeta) {
    $carpetasExistentes = $service->files->listFiles(array(
        'q' => "name='" . $nombreCarpeta . "' and '" . $idCarpetaPadre . "' in parents",
        'fields' => 'files(id, name)'
    ))->getFiles();
    if (count($carpetasExistentes) > 0) {
        return $carpetasExistentes[0]->getId();
    } else {
        $carpeta = new Google_Service_Drive_DriveFile();
        $carpeta->setName($nombreCarpeta);
        $carpeta->setMimeType('application/vnd.google-apps.folder');
        $carpeta->setParents(array($idCarpetaPadre));

        $carpetaCreada = $service->files->create($carpeta, array(
            'fields' => 'id'
        ));
        return $carpetaCreada->id;
    }
}

function guardarImagen($imagen_estado_recojo, $id_orden_servicio_estado_recojo, $cliente)
{
    $rutaMrLogistik = '102f9jn9wkOvcf0nXssDMa1cateurVJ9-';    
    $imagen_temporal = $imagen_estado_recojo['tmp_name'];
    $imagen = imagecreatefromstring(file_get_contents($imagen_temporal));
    $imagen_nueva = imagecreatetruecolor(500, 500);
    imagecopyresampled($imagen_nueva, $imagen, 0, 0, 0, 0, 500, 500, imagesx($imagen), imagesy($imagen));
    $ruta_imagen = $id_orden_servicio_estado_recojo . '_' . $cliente . '.jpg';
    imagejpeg($imagen_nueva, $ruta_imagen, 100);
    $client = new Google_Client();
    $client->useApplicationDefaultCredentials();
    $client->SetScopes(['https://www.googleapis.com/auth/drive.file']);
    $service = new Google_Service_Drive($client);
    $anioActual = date('Y');
    $mesActual = date('n');
    $IdCarpeta = crearEstructuraCarpetasMensual($service, $rutaMrLogistik, $anioActual, $mesActual, $cliente);
    $file = new Google_Service_Drive_DriveFile();
    $file->setName($id_orden_servicio_estado_recojo . ' / ' . $cliente);
    $file->setParents(array($IdCarpeta));
    $file->setDescription("Imagen de Recojo cargada / CLIENTE : " . $cliente);
    $file->setMimeType('image/jpeg');
    $resultado = $service->files->create(
        $file,
        array(
            'data' => file_get_contents($ruta_imagen),
            'uploadType' => 'media'
        )
    );
    $ruta = 'https://drive.google.com/uc?id=' . $resultado->id;

    // Eliminar imagen temporal
    unlink($ruta_imagen);
    return $ruta;
}


function guardarRecojo($recojo)
{
    $bd = obtenerConexion();
    $validacion_db = $bd->prepare("SELECT COUNT(*) as total FROM estados_recojos WHERE id_orden_servicio_estado_recojo = ?");
    $validacion_db->execute([$recojo->id_orden_servicio_estado_recojo]);
    $validacion_db = $validacion_db->fetch(PDO::FETCH_ASSOC);

    $cliente_db = $bd->prepare("SELECT c.razon_social_cliente FROM programaciones p
    INNER JOIN clientes c
    ON c.id = p.id_cliente_programacion
    WHERE p.id_orden_servicio = ?");
    $cliente_db->execute([$recojo->id_orden_servicio_estado_recojo]);
    $cliente = $cliente_db->fetch(PDO::FETCH_ASSOC)['razon_social_cliente'];

    if ($validacion_db['total'] > 0) {
        if (!empty($recojo->imagen_estado_recojo)) {
            $rutaDB = guardarImagen($recojo->imagen_estado_recojo, $recojo->id_orden_servicio_estado_recojo, $cliente);
            $sentencia = $bd->prepare("UPDATE estados_recojos SET comentario_estado_recojo = ?, imagen_estado_recojo = ? WHERE id_orden_servicio_estado_recojo = ?");
            if ($sentencia->execute([
                $recojo->comentario_estado_recojo,
                $rutaDB,
                $recojo->id_orden_servicio_estado_recojo
            ])) {
                return ['success' => true, 'message' => 'Se actualizó correctamente el estado', 'datos' => $recojo];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo actualizar el estado!', 'datos' => $recojo];
            }
        } else {
            $sentencia = $bd->prepare("UPDATE estados_recojos SET comentario_estado_recojo = ? WHERE id_orden_servicio_estado_recojo = ?");
            if ($sentencia->execute([
                $recojo->comentario_estado_recojo,
                $recojo->id_orden_servicio_estado_recojo
            ])) {
                return ['success' => true, 'message' => 'Se actualizó correctamente el estado', 'datos' => $recojo];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo actualizar el estado!', 'datos' => $recojo];
            }
        }
    } else {
        if (!empty($recojo->imagen_estado_recojo)) {
            $rutaDB = guardarImagen($recojo->imagen_estado_recojo, $recojo->id_orden_servicio_estado_recojo, $cliente);

            $sentencia = $bd->prepare("INSERT INTO estados_recojos(id_orden_servicio_estado_recojo,proceso_estado_recojo, estado_mercancia_estado_recojo, comentario_estado_recojo, fecha_creado, id_creador_estado_recojo, imagen_estado_recojo) VALUES (? ,?, ?, ?, ?, ?, ?)");
            if ($sentencia->execute([
                $recojo->id_orden_servicio_estado_recojo,
                $recojo->proceso_estado_recojo,
                $recojo->estado_mercancia_estado_recojo,
                $recojo->comentario_estado_recojo,
                $recojo->fecha_creado,
                $recojo->id_creador_estado_recojo,
                $rutaDB
            ])) {
                return ['success' => true, 'message' => 'Se registró correctamente el estado', 'datos' => $recojo];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo registrar el estado!', 'datos' => $recojo];
            }
        } else {
            $sentencia = $bd->prepare("INSERT INTO estados_recojos(id_orden_servicio_estado_recojo,proceso_estado_recojo, estado_mercancia_estado_recojo, comentario_estado_recojo, fecha_creado,id_creador_estado_recojo) VALUES (? ,?, ?, ?, ?, ?)");
            if ($sentencia->execute([
                $recojo->id_orden_servicio_estado_recojo,
                $recojo->proceso_estado_recojo,
                $recojo->estado_mercancia_estado_recojo,
                $recojo->comentario_estado_recojo,
                $recojo->fecha_creado,
                $recojo->id_creador_estado_recojo
            ])) {
                return ['success' => true, 'message' => 'Se registró correctamente el estado', 'datos' => $recojo];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo registrar el estado!', 'datos' => $recojo];
            }
        }
    }
}

function obtenerRecojo($id_orden_servicio)
{
    $bd = obtenerConexion();
    $recojo = $bd->prepare(
        "SELECT * FROM asignacion_recojos a
        LEFT JOIN estados_recojos e
        ON e.id_orden_servicio_estado_recojo = a.id_orden_servicio_recojo
        WHERE a.id_orden_servicio_recojo = :id_orden_servicio;"
    );
    $recojo->bindParam(':id_orden_servicio', $id_orden_servicio);
    $recojo->execute();
    $result = $recojo->fetch(PDO::FETCH_ASSOC);

    return $result;
}


function obtenerRecojos()
{
    $bd = obtenerConexion();
    $stmt = $bd->query("SELECT * FROM asignacion_recojos a
    LEFT JOIN estados_recojos e
    ON e.id_orden_servicio_estado_recojo = a.id_orden_servicio_recojo
    ORDER BY a.id DESC;");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

function obtenerVariableDelEntorno($key)
{
    if (defined("_ENV_CACHE")) {
        $vars = _ENV_CACHE;
    } else {
        $file = "../../services/env.php";
        if (!file_exists($file)) {
            throw new Exception("El archivo de las variables de entorno ($file) no existe. Favor de crearlo");
        }
        $vars = parse_ini_file($file);
        define("_ENV_CACHE", $vars);
    }
    if (isset($vars[$key])) {
        return $vars[$key];
    } else {
        throw new Exception("La clave especificada (" . $key . ") no existe en el archivo de las variables de entorno");
    }
}

function obtenerConexion()
{
    $password = obtenerVariableDelEntorno("MYSQL_PASSWORD");
    $user = obtenerVariableDelEntorno("MYSQL_USER");
    $dbName = obtenerVariableDelEntorno("MYSQL_DATABASE_NAME");
    $database = new PDO('mysql:host=161.132.42.147;dbname=' . $dbName, $user, $password);
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
}

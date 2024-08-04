<?php
require_once('../../services/api_google_drive/api-google/vendor/autoload.php');
putenv('GOOGLE_APPLICATION_CREDENTIALS=../../services/api_google_drive/bymavearchivos-f8c2d3d5790f.json');
function exportarLiquidacionTransportista($id_transportista, $fechaDesde, $fechaHasta)
{
    $bd = obtenerConexion();
    if ($id_transportista == '') {
        $stmt = $bd->prepare("SELECT
        d.id,
        lt.estado_documento_liquidacion_transportista AS estado_documento,
        lt.tipo_documento_liquidacion_transportista AS tipo_documento,
        lt.num_documento_liquidacion_transportista AS numero_documento,
        d.fecha_creado,
        d.id_num_manifiesto_despacho,
        prov.razon_social_proveedor,
        CONCAT(ub_transportista.DEPARTAMENTO, ', ', ub_transportista.PROVINCIA, ', ', ub_transportista.DESTINO) AS destino_origen,
        CONCAT(ub_destino.DEPARTAMENTO, ', ', ub_destino.PROVINCIA, ', ', ub_destino.DESTINO) AS destino_llegada,
        d.cantidad_bultos_despacho,
        d.peso_total_despacho,
            CASE
                WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
                THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
                ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
            END AS costo_envio,
            ROUND(((CASE
        WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
        THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
        ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
        END) * 1.18) - (CASE
            WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
            THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
            ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
        END), 2) AS igv,
    
        ROUND(((CASE
            WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
            THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
            ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
        END) * 1.18), 2) AS precio_total,
            lt.pdf_liquidacion_transportista AS pdf
        FROM despachos d
        LEFT JOIN proveedores prov ON  prov.id = d.id_transportista_despacho
        LEFT JOIN despachos_envios de ON de.id_num_manifiesto_despacho_envio = d.id_num_manifiesto_despacho AND de.id_agente_despacho_envio IS NULL
        LEFT JOIN registros_cargas rg ON rg.id_num_guia_registro_carga = de.id_num_guia_despacho_envio
        LEFT JOIN cotizaciones_destinos cd ON cd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'C1-%'
        LEFT JOIN punto_ventas_destinos pvd ON pvd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'C2-%'
        LEFT JOIN registro_envio_destinos red ON red.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'OS1-%'
        LEFT JOIN registro_masivo_destinos rmd ON rmd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'OS2-%'
        LEFT JOIN ubigeo ub_destino ON ub_destino.UBIGEO = d.ubigeo_despacho
        LEFT JOIN tarifarios_transportistas_cargas tcc ON tcc.id_transportista_tarifario_transportista_carga = d.id_transportista_despacho AND tcc.ubigeo_tarifario_transportista_carga = d.ubigeo_despacho
        LEFT JOIN liquidaciones_transportistas lt ON lt.num_manifiesto_liquidacion_transportista = d.id_num_manifiesto_despacho
        LEFT JOIN ubigeo ub_transportista ON ub_transportista.UBIGEO = prov.ubigeo_proveedor
        WHERE d.id_transportista_despacho IS NOT NULL AND d.fecha_creado BETWEEN :fechaDesde AND :fechaHasta
        GROUP BY 
        d.id_num_manifiesto_despacho
        ORDER BY d.id DESC  
        HAVING 
        (SUM(COALESCE(cd.peso_mercancia_cotizacion_destino, 0)) +
        SUM(COALESCE(pvd.peso_mercancia_punto_venta_destino, 0)) +
        SUM(COALESCE(red.peso_mercancia_registro_envio_destino, 0)) +
        SUM(COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0))) > 0;
        ");
    } else {
        $stmt = $bd->prepare("SELECT
        d.id,
        lt.estado_documento_liquidacion_transportista AS estado_documento,
        lt.tipo_documento_liquidacion_transportista AS tipo_documento,
        lt.num_documento_liquidacion_transportista AS numero_documento,
        d.fecha_creado,
        d.id_num_manifiesto_despacho,
        prov.razon_social_proveedor,
        CONCAT(ub_transportista.DEPARTAMENTO, ', ', ub_transportista.PROVINCIA, ', ', ub_transportista.DESTINO) AS destino_origen,
        CONCAT(ub_destino.DEPARTAMENTO, ', ', ub_destino.PROVINCIA, ', ', ub_destino.DESTINO) AS destino_llegada,
        d.cantidad_bultos_despacho,
        d.peso_total_despacho,
            CASE
                WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
                THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
                ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
            END AS costo_envio,
            ROUND(((CASE
        WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
        THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
        ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
        END) * 1.18) - (CASE
            WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
            THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
            ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
        END), 2) AS igv,
    
        ROUND(((CASE
            WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
            THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
            ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
        END) * 1.18), 2) AS precio_total,
            lt.pdf_liquidacion_transportista AS pdf
        FROM despachos d
        LEFT JOIN proveedores prov ON  prov.id = d.id_transportista_despacho
        LEFT JOIN despachos_envios de ON de.id_num_manifiesto_despacho_envio = d.id_num_manifiesto_despacho AND de.id_agente_despacho_envio IS NULL
        LEFT JOIN registros_cargas rg ON rg.id_num_guia_registro_carga = de.id_num_guia_despacho_envio
        LEFT JOIN cotizaciones_destinos cd ON cd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'C1-%'
        LEFT JOIN punto_ventas_destinos pvd ON pvd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'C2-%'
        LEFT JOIN registro_envio_destinos red ON red.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'OS1-%'
        LEFT JOIN registro_masivo_destinos rmd ON rmd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'OS2-%'
        LEFT JOIN ubigeo ub_destino ON ub_destino.UBIGEO = d.ubigeo_despacho
        LEFT JOIN tarifarios_transportistas_cargas tcc ON tcc.id_transportista_tarifario_transportista_carga = d.id_transportista_despacho AND tcc.ubigeo_tarifario_transportista_carga = d.ubigeo_despacho
        LEFT JOIN liquidaciones_transportistas lt ON lt.num_manifiesto_liquidacion_transportista = d.id_num_manifiesto_despacho
        LEFT JOIN ubigeo ub_transportista ON ub_transportista.UBIGEO = prov.ubigeo_proveedor
        WHERE d.id_transportista_despacho IS NOT NULL AND d.id_transportista_despacho = :id_transportista AND d.fecha_creado BETWEEN :fechaDesde AND :fechaHasta
        GROUP BY 
        d.id_num_manifiesto_despacho
        HAVING 
        (SUM(COALESCE(cd.peso_mercancia_cotizacion_destino, 0)) +
        SUM(COALESCE(pvd.peso_mercancia_punto_venta_destino, 0)) +
        SUM(COALESCE(red.peso_mercancia_registro_envio_destino, 0)) +
        SUM(COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0))) > 0
        ORDER BY d.id DESC;
        ");
        $stmt->bindParam(':id_transportista', $id_transportista);
    }
    $stmt->bindParam(':fechaDesde', $fechaDesde);
    $stmt->bindParam(':fechaHasta', $fechaHasta);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}
function crearEstructuraCarpetasMensual($servicio, $idCarpetaRaiz, $anio, $mes, $proveedor)
{
    $nombreCarpetaAnio = $anio;

    // Crear la carpeta del año si no existe
    $idCarpetaAnio = crearCarpetaSinoExiste($servicio, $idCarpetaRaiz, $nombreCarpetaAnio);

    // Crear la carpeta del mes si no existe
    $idCarpetaMes = crearCarpetaSinoExiste($servicio, $idCarpetaAnio, obtenerNombreMes($mes));

    // Crear la carpeta de imágenes si no existe
    $idCarpetaPdfs = crearCarpetaSinoExiste($servicio, $idCarpetaMes, "Documentos PDF");

    $idCarpetaProveedores = crearCarpetaSinoExiste($servicio, $idCarpetaPdfs, "Proveedores");

    $idCarpetaProveedor = crearCarpetaSinoExiste($servicio, $idCarpetaProveedores, $proveedor);

    return $idCarpetaProveedor;
}

function obtenerNombreMes($numeroMes)
{
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

function crearCarpetaSinoExiste($service, $idCarpetaPadre, $nombreCarpeta)
{
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

function guardarImagen($pdf_liquidacion_transportista, $num_manifiesto_liquidacion_transportista, $transportista, $num_documento)
{
    $rutaMrLogistik = '102f9jn9wkOvcf0nXssDMa1cateurVJ9-';

    $client = new Google_Client();
    $client->useApplicationDefaultCredentials();
    $client->SetScopes(['https://www.googleapis.com/auth/drive.file']);
    $service = new Google_Service_Drive($client);
    $anioActual = date('Y');
    $mesActual = date('n');
    $IdCarpeta = crearEstructuraCarpetasMensual($service, $rutaMrLogistik, $anioActual, $mesActual, $transportista);
    $file_path = $pdf_liquidacion_transportista['tmp_name'];
    $file = new Google_Service_Drive_DriveFile();
    $file->setName($num_manifiesto_liquidacion_transportista . ' / ' . $transportista . ' / ' . $num_documento); // Nombre del Archivo
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_file($finfo, $file_path);
    $file->setParents(array($IdCarpeta)); #Aca hay que cambiar el ID de la carpeta
    $file->setMimeType($mime_type);
    $resultado = $service->files->create(
        $file,
        array(
            'data' => file_get_contents($file_path),
            'mimeType' => $mime_type,
            'uploadType' => 'media'
        )
    );
    $ruta = 'https://drive.google.com/uc?id=' . $resultado->id;

    return $ruta;
}


function guardarLiquidacionTransportista($datos)
{
    date_default_timezone_set('America/Lima');
    $fecha_actual = date("Y-m-d");

    $bd = obtenerConexion();
    $validacion_db = $bd->prepare("SELECT COUNT(*) as total FROM liquidaciones_transportistas WHERE num_manifiesto_liquidacion_transportista = ?");
    $validacion_db->execute([$datos->num_manifiesto_liquidacion_transportista]);
    $validacion_db = $validacion_db->fetch(PDO::FETCH_ASSOC);

    if ($validacion_db['total'] > 0) {
        if (!empty($datos->pdf_liquidacion_transportista)) {
            $rutaDB = guardarImagen($datos->pdf_liquidacion_transportista, $datos->num_manifiesto_liquidacion_transportista, $datos->nombre_transportista, $datos->num_documento_liquidacion_transportista);
            $sentencia = $bd->prepare("UPDATE liquidaciones_transportistas SET num_documento_liquidacion_transportista = ?, tipo_documento_liquidacion_transportista = ?, estado_documento_liquidacion_transportista = ? , pdf_liquidacion_transportista = ? WHERE num_manifiesto_liquidacion_transportista = ?");
            if ($sentencia->execute([
                $datos->num_documento_liquidacion_transportista,
                $datos->tipo_documento_liquidacion_transportista,
                $datos->estado_documento_liquidacion_transportista,
                $rutaDB,
                $datos->num_manifiesto_liquidacion_transportista
            ])) {
                return ['success' => true, 'message' => 'Se actualizó correctamente', 'datos' => $datos];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo actualizar!', 'datos' => $datos];
            }
        } else {
            $sentencia = $bd->prepare("UPDATE liquidaciones_transportistas SET num_documento_liquidacion_transportista = ?, tipo_documento_liquidacion_transportista = ?, estado_documento_liquidacion_transportista = ? WHERE num_manifiesto_liquidacion_transportista = ?");
            if ($sentencia->execute([
                $datos->num_documento_liquidacion_transportista,
                $datos->tipo_documento_liquidacion_transportista,
                $datos->estado_documento_liquidacion_transportista,
                $datos->num_manifiesto_liquidacion_transportista
            ])) {
                return ['success' => true, 'message' => 'Se actualizó correctamente', 'datos' => $datos];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo actualizar!', 'datos' => $datos];
            }
        }
    } else {
        if (!empty($datos->pdf_liquidacion_transportista)) {
            $rutaDB = guardarImagen($datos->pdf_liquidacion_transportista, $datos->num_manifiesto_liquidacion_transportista, $datos->nombre_transportista, $datos->num_documento_liquidacion_transportista);

            $sentencia = $bd->prepare("INSERT INTO liquidaciones_transportistas(tipo_documento_liquidacion_transportista, num_manifiesto_liquidacion_transportista,num_documento_liquidacion_transportista, estado_documento_liquidacion_transportista, pdf_liquidacion_transportista, fecha_creado) VALUES (?, ? ,?, ?, ?, ?)");
            if ($sentencia->execute([
                $datos->tipo_documento_liquidacion_transportista,
                $datos->num_manifiesto_liquidacion_transportista,
                $datos->num_documento_liquidacion_transportista,
                $datos->estado_documento_liquidacion_transportista,
                $rutaDB,
                $fecha_actual
            ])) {
                return ['success' => true, 'message' => 'Se registró correctamente', 'datos' => $datos];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo registrar!', 'datos' => $datos];
            }
        } else {
            $sentencia = $bd->prepare("INSERT INTO liquidaciones_transportistas(tipo_documento_liquidacion_transportista, num_manifiesto_liquidacion_transportista,num_documento_liquidacion_transportista, estado_documento_liquidacion_transportista, fecha_creado) VALUES (?, ? ,?, ?, ?)");
            if ($sentencia->execute([
                $datos->tipo_documento_liquidacion_transportista,
                $datos->num_manifiesto_liquidacion_transportista,
                $datos->num_documento_liquidacion_transportista,
                $datos->estado_documento_liquidacion_transportista,
                $fecha_actual
            ])) {
                return ['success' => true, 'message' => 'Se registró correctamente', 'datos' => $datos];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo registrar!', 'datos' => $datos];
            }
        }
    }
}

function ObtenerLiquidaciones()
{
    $bd = obtenerConexion();
    $stmt = $bd->query("SELECT
    d.id,
    lt.estado_documento_liquidacion_transportista AS estado_documento,
    lt.tipo_documento_liquidacion_transportista AS tipo_documento,
    lt.num_documento_liquidacion_transportista AS numero_documento,
    d.fecha_creado,
    d.id_num_manifiesto_despacho,
    prov.razon_social_proveedor,
	CONCAT(ub_transportista.DEPARTAMENTO, ', ', ub_transportista.PROVINCIA, ', ', ub_transportista.DESTINO) AS destino_origen,
    CONCAT(ub_destino.DEPARTAMENTO, ', ', ub_destino.PROVINCIA, ', ', ub_destino.DESTINO) AS destino_llegada,
    d.cantidad_bultos_despacho,
    d.peso_total_despacho,
        CASE
            WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
            THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
            ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
        END AS costo_envio,
        ROUND(((CASE
    WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
    THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
    ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
    END) * 1.18) - (CASE
        WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
        THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
        ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
    END), 2) AS igv,

    ROUND(((CASE
        WHEN d.peso_total_despacho <= tcc.kg_maximo_tarifario_transportista_carga
        THEN d.cantidad_bultos_despacho * tcc.paquete_tarifario_transportista_carga
        ELSE d.peso_total_despacho * tcc.kg_base_adicional_tarifario_transportista_carga
    END) * 1.18), 2) AS precio_total,
        lt.pdf_liquidacion_transportista AS pdf
    FROM despachos d
    LEFT JOIN proveedores prov ON  prov.id = d.id_transportista_despacho
    LEFT JOIN despachos_envios de ON de.id_num_manifiesto_despacho_envio = d.id_num_manifiesto_despacho AND de.id_agente_despacho_envio IS NULL
    LEFT JOIN registros_cargas rg ON rg.id_num_guia_registro_carga = de.id_num_guia_despacho_envio
    LEFT JOIN cotizaciones_destinos cd ON cd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'C1-%'
    LEFT JOIN punto_ventas_destinos pvd ON pvd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'C2-%'
    LEFT JOIN registro_envio_destinos red ON red.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'OS1-%'
    LEFT JOIN registro_masivo_destinos rmd ON rmd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'OS2-%'
    LEFT JOIN ubigeo ub_destino ON ub_destino.UBIGEO = d.ubigeo_despacho
    LEFT JOIN tarifarios_transportistas_cargas tcc ON tcc.id_transportista_tarifario_transportista_carga = d.id_transportista_despacho AND tcc.ubigeo_tarifario_transportista_carga = d.ubigeo_despacho
    LEFT JOIN liquidaciones_transportistas lt ON lt.num_manifiesto_liquidacion_transportista = d.id_num_manifiesto_despacho
	LEFT JOIN ubigeo ub_transportista ON ub_transportista.UBIGEO = prov.ubigeo_proveedor
    WHERE d.id_transportista_despacho IS NOT NULL
    GROUP BY 
    d.id_num_manifiesto_despacho
    HAVING 
    (SUM(COALESCE(cd.peso_mercancia_cotizacion_destino, 0)) +
    SUM(COALESCE(pvd.peso_mercancia_punto_venta_destino, 0)) +
    SUM(COALESCE(red.peso_mercancia_registro_envio_destino, 0)) +
    SUM(COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0))) > 0
    ORDER BY d.id DESC
    ;
    ");
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
    $database = new PDO('mysql:host=161.132.42.146;dbname=' . $dbName, $user, $password);
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
}

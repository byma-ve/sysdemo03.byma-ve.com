<?php
require_once('../../services/api_google_drive/api-google/vendor/autoload.php');
putenv('GOOGLE_APPLICATION_CREDENTIALS=../../services/api_google_drive/bymavearchivos-f8c2d3d5790f.json');
function exportarLiquidacionAgente($id_agente, $fechaDesde, $fechaHasta)
{
    $bd = obtenerConexion();
    if ($id_agente == '') {
        $stmt = $bd->prepare("SELECT 
        la.estado_documento_liquidacion_agente AS estado_documento,
        la.tipo_documento_liquidacion_agente as tipo_documento,
        la.num_documento_liquidacion_agente as num_documento,
        id_num_manifiesto_despacho_envio AS num_manifiesto,
        de.fecha_creado as fecha_emision,
        CONCAT(ub.DEPARTAMENTO, ', ', ub.PROVINCIA, ', ', ub.DESTINO) AS destino_entrega,
        prov.razon_social_proveedor as agente,
        de.id_num_guia_despacho_envio as guia_tracking,
        (SELECT count(*) FROM estados_guias WHERE id_num_guia_estado_guia = de.id_num_guia_despacho_envio) AS num_intentos,
        CASE 
            WHEN de.id_num_guia_despacho_envio IS NULL THEN ''
            WHEN eg3.proceso_estado_guia IS NOT NULL THEN CONCAT(UPPER(LEFT(eg3.proceso_estado_guia, 1)), LOWER(SUBSTRING(eg3.proceso_estado_guia, 2)))
            WHEN eg2.proceso_estado_guia IS NOT NULL THEN CONCAT(UPPER(LEFT(eg2.proceso_estado_guia, 1)), LOWER(SUBSTRING(eg2.proceso_estado_guia, 2)))
            WHEN eg1.proceso_estado_guia IS NOT NULL THEN CONCAT(UPPER(LEFT(eg1.proceso_estado_guia, 1)), LOWER(SUBSTRING(eg1.proceso_estado_guia, 2)))
            ELSE ''
        END AS estado_ultimo_intento,
        
        SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
        ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0))) AS costos_envios,
        ROUND((
                SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
                ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))
        ) * 1.18 - (
                SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
                ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))
        ), 2) AS igv,
                ROUND(
                SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
                ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))
                +
                (
                SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
                ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))
            ) * 1.18 - (
                SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
                ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))
            )
                ,2) AS precio_total
        FROM despachos_envios de
        LEFT JOIN proveedores prov ON prov.id = de.id_agente_despacho_envio 
        LEFT JOIN registros_cargas rc ON rc.id_num_guia_registro_carga = de.id_num_guia_despacho_envio
        LEFT JOIN estados_guias eg1 ON eg1.id_num_guia_estado_guia = rc.id_num_guia_registro_carga AND eg1.num_intento_estado_guia = 'intento 1'
        LEFT JOIN estados_guias eg2 ON eg2.id_num_guia_estado_guia = rc.id_num_guia_registro_carga AND eg2.num_intento_estado_guia = 'intento 2'
        LEFT JOIN estados_guias eg3 ON eg3.id_num_guia_estado_guia = rc.id_num_guia_registro_carga AND eg3.num_intento_estado_guia = 'intento 3' 
        LEFT JOIN cotizaciones_destinos cd ON cd.id = rc.id_destino_registro_carga AND rc.id_orden_servicio_registro_carga LIKE 'C1-%'
        LEFT JOIN punto_ventas_destinos pvd ON pvd.id = rc.id_destino_registro_carga AND rc.id_orden_servicio_registro_carga LIKE 'C2-%'
        LEFT JOIN registro_envio_destinos red ON red.id = rc.id_destino_registro_carga AND rc.id_orden_servicio_registro_carga LIKE 'OS1-%'
        LEFT JOIN registro_masivo_destinos rmd ON rmd.id = rc.id_destino_registro_carga AND rc.id_orden_servicio_registro_carga LIKE 'OS2-%'
        LEFT JOIN ubigeo ub ON ub.UBIGEO = COALESCE(cd.ubigeo_cotizacion_destino, pvd.ubigeo_punto_venta_destino, red.ubigeo_registro_envio_destino, rmd.ubigeo_registro_masivo_destino)
        LEFT JOIN tarifarios_agentes_courriers tc ON prov.id = tc.id_agente_tarifario_agente_courrier AND tc.ubigeo_tarifario_agente_courrier = COALESCE(cd.ubigeo_cotizacion_destino, pvd.ubigeo_punto_venta_destino, red.ubigeo_registro_envio_destino, rmd.ubigeo_registro_masivo_destino) AND prov.tipo_servicio_proveedor = 'terrestre'
        LEFT JOIN tarifarios_agentes_aereos ta ON  prov.id = ta.id_agente_tarifario_agente_aereo AND ta.ubigeo_tarifario_agente_aereo = COALESCE(cd.ubigeo_cotizacion_destino, pvd.ubigeo_punto_venta_destino, red.ubigeo_registro_envio_destino, rmd.ubigeo_registro_masivo_destino) AND prov.tipo_servicio_proveedor = 'aereo'
        LEFT JOIN liquidaciones_agentes la ON la.id_agente_liquidacion_agente = prov.id AND num_manifiesto_liquidacion_agente = de.id_num_manifiesto_despacho_envio
        WHERE de.id_agente_despacho_envio IS NOT NULL AND de.id_num_manifiesto_despacho_envio <> '0' AND de.fecha_creado BETWEEN :fechaDesde AND :fechaHasta
        GROUP BY de.id_num_guia_despacho_envio
        ORDER BY de.id_num_manifiesto_despacho_envio DESC
        ;");
    } else {
        $stmt = $bd->prepare("SELECT 
        la.estado_documento_liquidacion_agente AS estado_documento,
        la.tipo_documento_liquidacion_agente as tipo_documento,
        la.num_documento_liquidacion_agente as num_documento,
        id_num_manifiesto_despacho_envio AS num_manifiesto,
        de.fecha_creado as fecha_emision,
        CONCAT(ub.DEPARTAMENTO, ', ', ub.PROVINCIA, ', ', ub.DESTINO) AS destino_entrega,
        prov.razon_social_proveedor as agente,
        de.id_num_guia_despacho_envio as guia_tracking,
        (SELECT count(*) FROM estados_guias WHERE id_num_guia_estado_guia = de.id_num_guia_despacho_envio) AS num_intentos,
        CASE 
            WHEN de.id_num_guia_despacho_envio IS NULL THEN ''
            WHEN eg3.proceso_estado_guia IS NOT NULL THEN CONCAT(UPPER(LEFT(eg3.proceso_estado_guia, 1)), LOWER(SUBSTRING(eg3.proceso_estado_guia, 2)))
            WHEN eg2.proceso_estado_guia IS NOT NULL THEN CONCAT(UPPER(LEFT(eg2.proceso_estado_guia, 1)), LOWER(SUBSTRING(eg2.proceso_estado_guia, 2)))
            WHEN eg1.proceso_estado_guia IS NOT NULL THEN CONCAT(UPPER(LEFT(eg1.proceso_estado_guia, 1)), LOWER(SUBSTRING(eg1.proceso_estado_guia, 2)))
            ELSE ''
        END AS estado_ultimo_intento,
        
        SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
        ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0))) AS costos_envios,
        ROUND((
                SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
                ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))
        ) * 1.18 - (
                SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
                ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))
        ), 2) AS igv,
                ROUND(
                SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
                ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))
                +
                (
                SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
                ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))
            ) * 1.18 - (
                SUM(COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
                    (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
                    COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
                    COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
                    COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
                    - 1
                ) * SUM(COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))
            )
                ,2) AS precio_total
        FROM despachos_envios de
        LEFT JOIN proveedores prov ON prov.id = de.id_agente_despacho_envio 
        LEFT JOIN registros_cargas rc ON rc.id_num_guia_registro_carga = de.id_num_guia_despacho_envio
        LEFT JOIN estados_guias eg1 ON eg1.id_num_guia_estado_guia = rc.id_num_guia_registro_carga AND eg1.num_intento_estado_guia = 'intento 1'
        LEFT JOIN estados_guias eg2 ON eg2.id_num_guia_estado_guia = rc.id_num_guia_registro_carga AND eg2.num_intento_estado_guia = 'intento 2'
        LEFT JOIN estados_guias eg3 ON eg3.id_num_guia_estado_guia = rc.id_num_guia_registro_carga AND eg3.num_intento_estado_guia = 'intento 3' 
        LEFT JOIN cotizaciones_destinos cd ON cd.id = rc.id_destino_registro_carga AND rc.id_orden_servicio_registro_carga LIKE 'C1-%'
        LEFT JOIN punto_ventas_destinos pvd ON pvd.id = rc.id_destino_registro_carga AND rc.id_orden_servicio_registro_carga LIKE 'C2-%'
        LEFT JOIN registro_envio_destinos red ON red.id = rc.id_destino_registro_carga AND rc.id_orden_servicio_registro_carga LIKE 'OS1-%'
        LEFT JOIN registro_masivo_destinos rmd ON rmd.id = rc.id_destino_registro_carga AND rc.id_orden_servicio_registro_carga LIKE 'OS2-%'
        LEFT JOIN ubigeo ub ON ub.UBIGEO = COALESCE(cd.ubigeo_cotizacion_destino, pvd.ubigeo_punto_venta_destino, red.ubigeo_registro_envio_destino, rmd.ubigeo_registro_masivo_destino)
        LEFT JOIN tarifarios_agentes_courriers tc ON prov.id = tc.id_agente_tarifario_agente_courrier AND tc.ubigeo_tarifario_agente_courrier = COALESCE(cd.ubigeo_cotizacion_destino, pvd.ubigeo_punto_venta_destino, red.ubigeo_registro_envio_destino, rmd.ubigeo_registro_masivo_destino) AND prov.tipo_servicio_proveedor = 'terrestre'
        LEFT JOIN tarifarios_agentes_aereos ta ON  prov.id = ta.id_agente_tarifario_agente_aereo AND ta.ubigeo_tarifario_agente_aereo = COALESCE(cd.ubigeo_cotizacion_destino, pvd.ubigeo_punto_venta_destino, red.ubigeo_registro_envio_destino, rmd.ubigeo_registro_masivo_destino) AND prov.tipo_servicio_proveedor = 'aereo'
        LEFT JOIN liquidaciones_agentes la ON la.id_agente_liquidacion_agente = prov.id AND num_manifiesto_liquidacion_agente = de.id_num_manifiesto_despacho_envio
        WHERE de.id_agente_despacho_envio IS NOT NULL AND de.id_num_manifiesto_despacho_envio <> '0' AND de.id_agente_despacho_envio = :id_agente AND de.fecha_creado BETWEEN :fechaDesde AND :fechaHasta
        GROUP BY de.id_num_guia_despacho_envio
        ORDER BY de.id_num_manifiesto_despacho_envio DESC
        ;
        ");
        $stmt->bindParam(':id_agente', $id_agente);
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

function guardarImagen($pdf_liquidacion_agente, $num_manifiesto_liquidacion_agente, $agente, $num_documento)
{
    $rutaMrLogistik = '102f9jn9wkOvcf0nXssDMa1cateurVJ9-';
    $client = new Google_Client();
    $client->useApplicationDefaultCredentials();
    $client->SetScopes(['https://www.googleapis.com/auth/drive.file']);
    $service = new Google_Service_Drive($client);
    $anioActual = date('Y');
    $mesActual = date('n');
    $IdCarpeta = crearEstructuraCarpetasMensual($service, $rutaMrLogistik, $anioActual, $mesActual, $agente);
    $file_path = $pdf_liquidacion_agente['tmp_name'];
    $file = new Google_Service_Drive_DriveFile();
    $file->setName($num_manifiesto_liquidacion_agente . ' / ' . $agente . ' / ' . $num_documento); // Nombre del Archivo
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


function guardarLiquidacionAgente($datos)
{
    date_default_timezone_set('America/Lima');
    $fecha_actual = date("Y-m-d");

    $bd = obtenerConexion();
    $validacion_db = $bd->prepare("SELECT COUNT(*) as total FROM liquidaciones_agentes WHERE num_manifiesto_liquidacion_agente = ? AND id_agente_liquidacion_agente = ?");
    $validacion_db->execute([$datos->num_manifiesto_liquidacion_agente, $datos->id_agente_liquidacion_agente]);
    $validacion_db = $validacion_db->fetch(PDO::FETCH_ASSOC);

    if ($validacion_db['total'] > 0) {
        if (!empty($datos->pdf_liquidacion_agente)) {
            $rutaDB = guardarImagen($datos->pdf_liquidacion_agente, $datos->num_manifiesto_liquidacion_agente, $datos->nombre_agente, $datos->num_documento_liquidacion_agente);
            $sentencia = $bd->prepare("UPDATE liquidaciones_agentes SET num_documento_liquidacion_agente = ?, tipo_documento_liquidacion_agente = ?, estado_documento_liquidacion_agente = ? , pdf_liquidacion_agente = ? WHERE num_manifiesto_liquidacion_agente = ? AND id_agente_liquidacion_agente = ?");
            if ($sentencia->execute([
                $datos->num_documento_liquidacion_agente,
                $datos->tipo_documento_liquidacion_agente,
                $datos->estado_documento_liquidacion_agente,
                $rutaDB,
                $datos->num_manifiesto_liquidacion_agente,
                $datos->id_agente_liquidacion_agente
            ])) {
                return ['success' => true, 'message' => 'Se actualizó correctamente', 'datos' => $datos];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo actualizar!', 'datos' => $datos];
            }
        } else {
            $sentencia = $bd->prepare("UPDATE liquidaciones_agentes SET num_documento_liquidacion_agente = ?, tipo_documento_liquidacion_agente = ?, estado_documento_liquidacion_agente = ? WHERE num_manifiesto_liquidacion_agente = ? AND id_agente_liquidacion_agente = ?");
            if ($sentencia->execute([
                $datos->num_documento_liquidacion_agente,
                $datos->tipo_documento_liquidacion_agente,
                $datos->estado_documento_liquidacion_agente,
                $datos->num_manifiesto_liquidacion_agente,
                $datos->id_agente_liquidacion_agente
            ])) {
                return ['success' => true, 'message' => 'Se actualizó correctamente', 'datos' => $datos];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo actualizar!', 'datos' => $datos];
            }
        }
    } else {
        if (!empty($datos->pdf_liquidacion_agente)) {
            $rutaDB = guardarImagen($datos->pdf_liquidacion_agente, $datos->num_manifiesto_liquidacion_agente, $datos->nombre_agente, $datos->num_documento_liquidacion_agente);

            $sentencia = $bd->prepare("INSERT INTO liquidaciones_agentes(id_agente_liquidacion_agente,tipo_documento_liquidacion_agente, num_manifiesto_liquidacion_agente,num_documento_liquidacion_agente, estado_documento_liquidacion_agente, pdf_liquidacion_agente, fecha_creado) VALUES (?, ?, ? ,?, ?, ?, ?)");
            if ($sentencia->execute([
                $datos->id_agente_liquidacion_agente,
                $datos->tipo_documento_liquidacion_agente,
                $datos->num_manifiesto_liquidacion_agente,
                $datos->num_documento_liquidacion_agente,
                $datos->estado_documento_liquidacion_agente,
                $rutaDB,
                $fecha_actual
            ])) {
                return ['success' => true, 'message' => 'Se registró correctamente', 'datos' => $datos];
            } else {
                return ['success' => false, 'message' => 'Error: ¡No se pudo registrar!', 'datos' => $datos];
            }
        } else {
            $sentencia = $bd->prepare("INSERT INTO liquidaciones_agentes(id_agente_liquidacion_agente, tipo_documento_liquidacion_agente, num_manifiesto_liquidacion_agente,num_documento_liquidacion_agente, estado_documento_liquidacion_agente, fecha_creado) VALUES (?, ?, ? ,?, ?, ?)");
            if ($sentencia->execute([
                $datos->id_agente_liquidacion_agente,
                $datos->tipo_documento_liquidacion_agente,
                $datos->num_manifiesto_liquidacion_agente,
                $datos->num_documento_liquidacion_agente,
                $datos->estado_documento_liquidacion_agente,
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
    de.id,
    la.estado_documento_liquidacion_agente,
    la.tipo_documento_liquidacion_agente,
    la.num_documento_liquidacion_agente,
    de.fecha_creado AS fecha_emision,
    de.id_num_manifiesto_despacho_envio AS num_manifiesto, 
    prov.razon_social_proveedor AS agente,
    de.id_agente_despacho_envio,
    COALESCE(CONCAT(ub_transportista.DEPARTAMENTO, ', ', ub_transportista.PROVINCIA, ', ', ub_transportista.DESTINO), 'Lima, Lima, Lima') AS destino_origen,
    CONCAT(ub.DEPARTAMENTO, ', ', ub.PROVINCIA, ', ', ub.DESTINO) AS destino_agente,
    (SELECT COUNT(*) FROM despachos_envios WHERE id_num_manifiesto_despacho_envio = de.id_num_manifiesto_despacho_envio AND id_agente_despacho_envio = de.id_agente_despacho_envio) AS cantidad_guias,
    (SELECT COUNT(*) AS total_count
    FROM despachos_envios rc 
    WHERE rc.id_num_manifiesto_despacho_envio = de.id_num_manifiesto_despacho_envio AND rc.id_agente_despacho_envio = de.id_agente_despacho_envio
    AND rc.id_num_guia_despacho_envio NOT IN (
        SELECT eg.id_num_guia_estado_guia
        FROM estados_guias eg
        WHERE eg.proceso_estado_guia = 'entregado'
        OR eg.num_intento_estado_guia = 'intento 3'
    )) AS guias_proceso,
        SUM((COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
            (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
            COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
            COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
            COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
            - 1
        ) * (COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0)))) AS costos_envios,
    
    ROUND((
        SUM((COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
            (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
            COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
            COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
            COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
            - 1
        ) * (COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0))))
    ) * 1.18 - (
        SUM((COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
            (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
            COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
            COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
            COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
            - 1
        ) * (COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0))))
    ), 2) AS igv,

        ROUND(
        SUM((COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
            (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
            COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
            COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
            COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
            - 1
        ) * (COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0))))
        +
        (
        SUM((COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
            (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
            COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
            COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
            COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
            - 1
        ) * (COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0))))
    ) * 1.18 - (
        SUM((COALESCE(tc.kg_tarifario_agente_courrier, 0) + COALESCE(ta.kg_tarifario_agente_aereo, 0)) + (
            (COALESCE(cd.peso_mercancia_cotizacion_destino, 0) +
            COALESCE(pvd.peso_mercancia_punto_venta_destino, 0) +
            COALESCE(red.peso_mercancia_registro_envio_destino, 0) +
            COALESCE(rmd.peso_mercancia_registro_masivo_destino, 0)
            - 1
        ) * (COALESCE(tc.kg_adicional_tarifario_agente_courrier, 0) + COALESCE(ta.kg_adicional_tarifario_agente_aereo, 0))))
    )
        ,2) AS precio_total,
    la.pdf_liquidacion_agente
    FROM despachos_envios de
    LEFT JOIN despachos desp ON desp.id_num_manifiesto_despacho = de.id_num_manifiesto_despacho_envio
    LEFT JOIN proveedores prov_transportista ON prov_transportista.id = desp.id_transportista_despacho
    LEFT JOIN ubigeo ub_transportista ON ub_transportista.UBIGEO = prov_transportista.ubigeo_proveedor
    LEFT JOIN registros_cargas rg ON rg.id_num_guia_registro_carga = de.id_num_guia_despacho_envio
    LEFT JOIN proveedores prov ON prov.id = de.id_agente_despacho_envio
    LEFT JOIN ubigeo ub ON ub.UBIGEO = prov.ubigeo_proveedor
    LEFT JOIN cotizaciones_destinos cd ON cd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'C1-%'
    LEFT JOIN punto_ventas_destinos pvd ON pvd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'C2-%'
    LEFT JOIN registro_envio_destinos red ON red.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'OS1-%'
    LEFT JOIN registro_masivo_destinos rmd ON rmd.id = rg.id_destino_registro_carga AND rg.id_orden_servicio_registro_carga LIKE 'OS2-%'
    LEFT JOIN liquidaciones_agentes la ON la.id_agente_liquidacion_agente = de.id_agente_despacho_envio AND la.num_manifiesto_liquidacion_agente = de.id_num_manifiesto_despacho_envio
    LEFT JOIN tarifarios_agentes_courriers tc ON prov.id = tc.id_agente_tarifario_agente_courrier AND tc.ubigeo_tarifario_agente_courrier = COALESCE(cd.ubigeo_cotizacion_destino, pvd.ubigeo_punto_venta_destino, red.ubigeo_registro_envio_destino, rmd.ubigeo_registro_masivo_destino) AND prov.tipo_servicio_proveedor = 'terrestre'
    LEFT JOIN tarifarios_agentes_aereos ta ON  prov.id = ta.id_agente_tarifario_agente_aereo AND ta.ubigeo_tarifario_agente_aereo = COALESCE(cd.ubigeo_cotizacion_destino, pvd.ubigeo_punto_venta_destino, red.ubigeo_registro_envio_destino, rmd.ubigeo_registro_masivo_destino) AND prov.tipo_servicio_proveedor = 'aereo'
    WHERE 
        de.id_agente_despacho_envio IS NOT NULL 
        AND de.id_agente_despacho_envio <> '' 
        AND de.id_num_manifiesto_despacho_envio IS NOT NULL 
        AND de.id_num_manifiesto_despacho_envio <> '0'
    GROUP BY 
        de.id_agente_despacho_envio, 
        de.id_num_manifiesto_despacho_envio    
    ORDER BY de.id DESC
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

<?php
function obtenerInstancia($id_num_guia)
{
    $bd = obtenerConexion();

    $query_registro = 'SELECT * FROM registros_cargas WHERE id_num_guia_registro_carga = :id_num_guia';
    $obtenerRegistro = $bd->prepare($query_registro);
    $obtenerRegistro->bindParam(':id_num_guia', $id_num_guia);
    $obtenerRegistro->execute();
    $datosRegistro = $obtenerRegistro->fetch(PDO::FETCH_ASSOC);

    $query_despacho = 'SELECT * FROM despachos_envios de 
    LEFT JOIN proveedores p ON p.id = de.id_agente_despacho_envio
    WHERE de.id_num_guia_despacho_envio = :id_num_guia AND de.id_num_manifiesto_despacho_envio != "0"
    ;';
    $obtenerDespacho = $bd->prepare($query_despacho);
    $obtenerDespacho->bindParam(':id_num_guia', $id_num_guia);
    $obtenerDespacho->execute();
    $datosDespacho = $obtenerDespacho->fetch(PDO::FETCH_ASSOC);

    $query_estado = 'SELECT * FROM estados_guias WHERE id_num_guia_estado_guia = :id_num_guia ORDER BY num_intento_estado_guia DESC
    LIMIT 1';
    $obtenerEstado = $bd->prepare($query_estado);
    $obtenerEstado->bindParam(':id_num_guia', $id_num_guia);
    $obtenerEstado->execute();
    $datosEstado = $obtenerEstado->fetch(PDO::FETCH_ASSOC);

    if (!$datosDespacho) {
        $datosConAdicional = array(
            'info' => array(
                'instancia' => 'Registrado',
                'estado_mercancia' => 'En registro',
                'fecha_estado' => $datosRegistro['fecha_creado'],
                'comentario' => 'Mercancia Registrada',
            )
        );
        return $datosConAdicional;
    } elseif ($datosDespacho && !$datosEstado) {
        $datosConAdicional = array(
            'info' => array(
                'agente' => $datosDespacho['razon_social_proveedor'],
                'manifiesto' => $datosDespacho['id_num_manifiesto_despacho_envio'],
                'instancia' => 'Despacho',
                'estado_mercancia' => 'En Ruta',
                'fecha_estado' => $datosDespacho['fecha_creado'],
                'comentario' => 'Se encuentra en ruta',
            )
        );
        return $datosConAdicional;
    } else {
        $datosConAdicional = array(
            'info' => array(
                'agente' => $datosDespacho['razon_social_proveedor'],
                'manifiesto' => $datosDespacho['id_num_manifiesto_despacho_envio'],
                'instancia' => ucfirst($datosEstado['num_intento_estado_guia']),
                'estado_mercancia' => ucfirst($datosEstado['estado_mercancia_estado_guia']),
                'fecha_estado' => $datosEstado['fecha_proceso_estado_guia'],
                'comentario' => ucfirst($datosEstado['comentario_estado_guia']),
                'imagen_1' => ucfirst($datosEstado['imagen_1_estado_guia']),
                'imagen_2' => ucfirst($datosEstado['imagen_2_estado_guia']),
                'imagen_3' => ucfirst($datosEstado['imagen_3_estado_guia']),
                'imagen_4' => ucfirst($datosEstado['imagen_4_estado_guia']),
                'imagen_5' => ucfirst($datosEstado['imagen_5_estado_guia']),
                'imagen_6' => ucfirst($datosEstado['imagen_6_estado_guia']),
            )
        );
        return $datosConAdicional;
    }
}
function obtenerConsulta($id_num_guia)
{
    $bd = obtenerConexion();

    $query = 'SELECT * FROM registros_cargas WHERE id_num_guia_registro_carga = :id_num_guia';
    $obtenerOrden = $bd->prepare($query);
    $obtenerOrden->bindParam(':id_num_guia', $id_num_guia);
    $obtenerOrden->execute();
    $datosGuia = $obtenerOrden->fetch(PDO::FETCH_ASSOC);

    $orden_servicio = $datosGuia['id_orden_servicio_registro_carga'];
    $id_destino = $datosGuia['id_destino_registro_carga'];

    if (substr($orden_servicio, 0, 2) === "C1") {
        $datosOrden = $bd->prepare(
            "SELECT 
            cd.id AS id,
            cd.id_cotizacion_cotizacion_destino AS id_orden_servicio,
            cd.id_cliente_cotizacion_destino AS id_cliente,
            cd.id_area_cotizacion_destino AS id_area,
            cd.consignado_cotizacion_destino AS consignado,
            cd.dni_ruc_cotizacion_destino AS dni_ruc,
            cd.telefono_cotizacion_destino AS telefono,
            cd.telefono_exc_cotizacion_destino AS telefono_exc,
            cd.direccion_cotizacion_destino AS direccion,
            cd.referencias_cotizacion_destino AS referencias,
            cd.tarifario_cotizacion_destino AS tarifario,
            cd.ubigeo_cotizacion_destino AS ubigeo,
            cd.tmin_entrega_cotizacion_destino AS tmin_entrega,
            cd.tmax_entrega_cotizacion_destino AS tmax_entrega,
            cd.tipo_envio_cotizacion_destino AS tipo_envio,
            cd.contenido_mercancia_cotizacion_destino AS contenido_mercancia,
            cd.peso_mercancia_cotizacion_destino AS peso_mercancia,
            cd.total_metros_cubicos_cotizacion_destino AS total_metros_cubicos,
            cd.total_tarifa_cotizacion_destino AS total_tarifa,
            cd.tipo_logistica_cotizacion_destino AS tipo_logistica,
            cd.cantidad_mercancia_cotizacion_destino AS cantidad_mercancia,
            cd.largo_cotizacion_destino AS largo,
            cd.ancho_cotizacion_destino AS ancho,
            cd.alto_cotizacion_destino AS alto,
            cd.total_peso_volumen_cotizacion_destino AS total_peso_volumen,
            cd.valor_mercancia_cotizacion_destino AS valor_mercancia,
            cd.packing_cotizacion_destino AS packing,
            cd.seguro_cotizacion_destino AS seguro,
            cd.monta_carga_cotizacion_destino AS monta_carga,
            cd.total_adicional_cotizacion_destino AS total_adicional,
            cd.retorno_cotizacion_destino AS retorno,
            cd.estiba_desestiba_cotizacion_destino AS estiba_desestiba,
            cd.transporte_extra_cotizacion_destino AS transporte_extra,
            cd.guia_transportista_cotizacion_destino AS guia_transportista,
            cd.guia_remision_cotizacion_destino AS guia_remision,
            cd.documento_1_cotizacion_destino AS documento_1,
            cd.documento_2_cotizacion_destino AS documento_2,
            cd.id_creador_cotizacion_destino AS id_creador,
            cd.estado AS estado,
            cd.fecha_creado AS fecha_creado,
            cd.fecha_actualizado AS fecha_actualizado,
            ar.nombre_area AS nombre_area,
            c.razon_social_cliente AS razon_social_cliente,
            c.dni_cliente, 
            c.contacto_cliente, 
            c.telefono_cliente, 
            c.email_cliente, 
            c.direccion_cliente AS direccion_cliente,
            ub.DEPARTAMENTO, 
            ub.PROVINCIA, 
            ub.DESTINO,
            ub_cd.DEPARTAMENTO AS 'departamento_destino',
            ub_cd.PROVINCIA AS 'provincia_destino',
            ub_cd.DESTINO AS 'distrito_destino'
        FROM cotizaciones_destinos cd
        INNER JOIN clientes c ON cd.id_cliente_cotizacion_destino = c.id
        INNER JOIN ubigeo ub ON ub.UBIGEO = c.ubigeo_cliente
        INNER JOIN ubigeo ub_cd ON ub_cd.UBIGEO = cd.ubigeo_cotizacion_destino
        INNER JOIN areas ar ON cd.id_area_cotizacion_destino = ar.id        
        WHERE cd.id_cotizacion_cotizacion_destino = :orden_servicio AND cd.id = :id_destino"
        );
    } elseif (substr($orden_servicio, 0, 2) === "C2") {
        $datosOrden = $bd->prepare(
            "SELECT 
            cd.id AS id,
            cd.id_punto_venta_destino AS id_orden_servicio,
            cd.id_cliente_punto_venta_destino AS id_cliente,
            cd.id_area_punto_venta_destino AS id_area,
            cd.consignado_punto_venta_destino AS consignado,
            cd.dni_ruc_punto_venta_destino AS dni_ruc,
            cd.telefono_punto_venta_destino AS telefono,
            cd.telefono_exc_punto_venta_destino AS telefono_exc,
            cd.direccion_punto_venta_destino AS direccion,
            cd.referencias_punto_venta_destino AS referencias,
            cd.tarifario_punto_venta_destino AS tarifario,
            cd.ubigeo_punto_venta_destino AS ubigeo,
            cd.tmin_entrega_punto_venta_destino AS tmin_entrega,
            cd.tmax_entrega_punto_venta_destino AS tmax_entrega,
            cd.tipo_envio_punto_venta_destino AS tipo_envio,
            cd.contenido_mercancia_punto_venta_destino AS contenido_mercancia,
            cd.peso_mercancia_punto_venta_destino AS peso_mercancia,
            cd.total_metros_cubicos_punto_venta_destino AS total_metros_cubicos,
            cd.total_tarifa_punto_venta_destino AS total_tarifa,
            cd.tipo_logistica_punto_venta_destino AS tipo_logistica,
            cd.cantidad_mercancia_punto_venta_destino AS cantidad_mercancia,
            cd.largo_punto_venta_destino AS largo,
            cd.ancho_punto_venta_destino AS ancho,
            cd.alto_punto_venta_destino AS alto,
            cd.total_peso_volumen_punto_venta_destino AS total_peso_volumen,
            cd.valor_mercancia_punto_venta_destino AS valor_mercancia,
            cd.packing_punto_venta_destino AS packing,
            cd.seguro_punto_venta_destino AS seguro,
            cd.monta_carga_punto_venta_destino AS monta_carga,
            cd.total_adicional_punto_venta_destino AS total_adicional,
            cd.retorno_punto_venta_destino AS retorno,
            cd.estiba_desestiba_punto_venta_destino AS estiba_desestiba,
            cd.transporte_extra_punto_venta_destino AS transporte_extra,
            cd.guia_transportista_punto_venta_destino AS guia_transportista,
            cd.guia_remision_punto_venta_destino AS guia_remision,
            cd.documento_1_punto_venta_destino AS documento_1,
            cd.documento_2_punto_venta_destino AS documento_2,
            cd.id_creador_punto_venta_destino AS id_creador,
            cd.estado AS estado,
            cd.fecha_creado AS fecha_creado,
            cd.fecha_actualizado AS fecha_actualizado,
            ar.nombre_area AS nombre_area,
            c.razon_social_cliente AS razon_social_cliente,
            c.dni_cliente, 
            c.contacto_cliente, 
            c.telefono_cliente, 
            c.email_cliente, 
            c.direccion_cliente AS direccion_cliente,
            ub.DEPARTAMENTO, 
            ub.PROVINCIA, 
            ub.DESTINO,
            ub_cd.DEPARTAMENTO AS 'departamento_destino',
            ub_cd.PROVINCIA AS 'provincia_destino',
            ub_cd.DESTINO AS 'distrito_destino'
        FROM punto_ventas_destinos cd
        INNER JOIN clientes c ON cd.id_cliente_punto_venta_destino = c.id
        INNER JOIN ubigeo ub ON ub.UBIGEO = c.ubigeo_cliente
        INNER JOIN ubigeo ub_cd ON ub_cd.UBIGEO = cd.ubigeo_punto_venta_destino
        INNER JOIN areas ar ON cd.id_area_punto_venta_destino = ar.id
        WHERE cd.id_punto_venta_destino = :orden_servicio AND cd.id = :id_destino"
        );
    } elseif (substr($orden_servicio, 0, 3) === "OS1") {
        $datosOrden = $bd->prepare(
            "SELECT 
            cd.id AS id,
            cd.id_registro_envio_destino AS id_orden_servicio,
            cd.id_cliente_registro_envio_destino AS id_cliente,
            cd.id_area_registro_envio_destino AS id_area,
            cd.consignado_registro_envio_destino AS consignado,
            cd.dni_ruc_registro_envio_destino AS dni_ruc,
            cd.telefono_registro_envio_destino AS telefono,
            cd.telefono_exc_registro_envio_destino AS telefono_exc,
            cd.direccion_registro_envio_destino AS direccion,
            cd.referencias_registro_envio_destino AS referencias,
            cd.tarifario_registro_envio_destino AS tarifario,
            cd.ubigeo_registro_envio_destino AS ubigeo,
            cd.tmin_entrega_registro_envio_destino AS tmin_entrega,
            cd.tmax_entrega_registro_envio_destino AS tmax_entrega,
            cd.tipo_envio_registro_envio_destino AS tipo_envio,
            cd.contenido_mercancia_registro_envio_destino AS contenido_mercancia,
            cd.peso_mercancia_registro_envio_destino AS peso_mercancia,
            cd.total_metros_cubicos_registro_envio_destino AS total_metros_cubicos,
            cd.total_tarifa_registro_envio_destino AS total_tarifa,
            cd.tipo_logistica_registro_envio_destino AS tipo_logistica,
            cd.cantidad_mercancia_registro_envio_destino AS cantidad_mercancia,
            cd.largo_registro_envio_destino AS largo,
            cd.ancho_registro_envio_destino AS ancho,
            cd.alto_registro_envio_destino AS alto,
            cd.total_peso_volumen_registro_envio_destino AS total_peso_volumen,
            cd.valor_mercancia_registro_envio_destino AS valor_mercancia,
            cd.packing_registro_envio_destino AS packing,
            cd.seguro_registro_envio_destino AS seguro,
            cd.monta_carga_registro_envio_destino AS monta_carga,
            cd.total_adicional_registro_envio_destino AS total_adicional,
            cd.retorno_registro_envio_destino AS retorno,
            cd.estiba_desestiba_registro_envio_destino AS estiba_desestiba,
            cd.transporte_extra_registro_envio_destino AS transporte_extra,
            cd.guia_transportista_registro_envio_destino AS guia_transportista,
            cd.guia_remision_registro_envio_destino AS guia_remision,
            cd.documento_1_registro_envio_destino AS documento_1,
            cd.documento_2_registro_envio_destino AS documento_2,
            cd.id_creador_registro_envio_destino AS id_creador,
            cd.estado AS estado,
            cd.fecha_creado AS fecha_creado,
            cd.fecha_actualizado AS fecha_actualizado,
            ar.nombre_area AS nombre_area,
            c.razon_social_cliente AS razon_social_cliente,
            c.dni_cliente, 
            c.contacto_cliente, 
            c.telefono_cliente, 
            c.email_cliente, 
            c.direccion_cliente AS direccion_cliente,
            ub.DEPARTAMENTO, 
            ub.PROVINCIA, 
            ub.DESTINO,
            ub_cd.DEPARTAMENTO AS 'departamento_destino',
            ub_cd.PROVINCIA AS 'provincia_destino',
            ub_cd.DESTINO AS 'distrito_destino'
        FROM registro_envio_destinos cd
        INNER JOIN clientes c ON cd.id_cliente_registro_envio_destino = c.id
        INNER JOIN ubigeo ub ON ub.UBIGEO = c.ubigeo_cliente
        INNER JOIN ubigeo ub_cd ON ub_cd.UBIGEO = cd.ubigeo_registro_envio_destino
        INNER JOIN areas ar ON cd.id_area_registro_envio_destino = ar.id
        WHERE cd.id_registro_envio_destino = :orden_servicio AND cd.id = :id_destino"
        );
    } elseif (substr($orden_servicio, 0, 3) === "OS2") {
        $datosOrden = $bd->prepare(
            "SELECT 
            cd.id AS id,
            cd.id_registro_masivo_destino AS id_orden_servicio,
            cd.id_cliente_registro_masivo_destino AS id_cliente,
            cd.id_area_registro_masivo_destino AS id_area,
            cd.consignado_registro_masivo_destino AS consignado,
            cd.dni_ruc_registro_masivo_destino AS dni_ruc,
            cd.telefono_registro_masivo_destino AS telefono,
            cd.telefono_exc_registro_masivo_destino AS telefono_exc,
            cd.direccion_registro_masivo_destino AS direccion,
            cd.referencias_registro_masivo_destino AS referencias,
            cd.tarifario_registro_masivo_destino AS tarifario,
            cd.ubigeo_registro_masivo_destino AS ubigeo,
            cd.tmin_entrega_registro_masivo_destino AS tmin_entrega,
            cd.tmax_entrega_registro_masivo_destino AS tmax_entrega,
            cd.tipo_envio_registro_masivo_destino AS tipo_envio,
            cd.contenido_mercancia_registro_masivo_destino AS contenido_mercancia,
            cd.peso_mercancia_registro_masivo_destino AS peso_mercancia,
            cd.total_metros_cubicos_registro_masivo_destino AS total_metros_cubicos,
            cd.total_tarifa_registro_masivo_destino AS total_tarifa,
            cd.tipo_logistica_registro_masivo_destino AS tipo_logistica,
            cd.cantidad_mercancia_registro_masivo_destino AS cantidad_mercancia,
            cd.largo_registro_masivo_destino AS largo,
            cd.ancho_registro_masivo_destino AS ancho,
            cd.alto_registro_masivo_destino AS alto,
            cd.total_peso_volumen_registro_masivo_destino AS total_peso_volumen,
            cd.valor_mercancia_registro_masivo_destino AS valor_mercancia,
            cd.packing_registro_masivo_destino AS packing,
            cd.seguro_registro_masivo_destino AS seguro,
            cd.monta_carga_registro_masivo_destino AS monta_carga,
            cd.total_adicional_registro_masivo_destino AS total_adicional,
            cd.retorno_registro_masivo_destino AS retorno,
            cd.estiba_desestiba_registro_masivo_destino AS estiba_desestiba,
            cd.transporte_extra_registro_masivo_destino AS transporte_extra,
            cd.guia_transportista_registro_masivo_destino AS guia_transportista,
            cd.guia_remision_registro_masivo_destino AS guia_remision,
            cd.documento_1_registro_masivo_destino AS documento_1,
            cd.documento_2_registro_masivo_destino AS documento_2,
            cd.id_creador_registro_masivo_destino AS id_creador,
            cd.estado AS estado,
            cd.fecha_creado AS fecha_creado,
            cd.fecha_actualizado AS fecha_actualizado,
            ar.nombre_area AS nombre_area,
            c.razon_social_cliente AS razon_social_cliente,
            c.dni_cliente, 
            c.contacto_cliente, 
            c.telefono_cliente, 
            c.email_cliente, 
            c.direccion_cliente,
            ub.DEPARTAMENTO, 
            ub.PROVINCIA, 
            ub.DESTINO,
            ub_cd.DEPARTAMENTO AS 'departamento_destino',
            ub_cd.PROVINCIA AS 'provincia_destino',
            ub_cd.DESTINO AS 'distrito_destino'
        FROM registro_masivo_destinos cd
        INNER JOIN clientes c ON cd.id_cliente_registro_masivo_destino = c.id
        INNER JOIN ubigeo ub ON ub.UBIGEO = c.ubigeo_cliente
        INNER JOIN ubigeo ub_cd ON ub_cd.UBIGEO = cd.ubigeo_registro_masivo_destino
        INNER JOIN areas ar ON cd.id_area_registro_masivo_destino = ar.id        
        WHERE cd.id_registro_masivo_destino = :orden_servicio AND cd.id = :id_destino"
        );
    }
    $datosOrden->bindParam(':orden_servicio', $orden_servicio);
    $datosOrden->bindParam(':id_destino', $id_destino);
    $datosOrden->execute();
    $data = $datosOrden->fetch(PDO::FETCH_ASSOC);

    return $data;
}

function obtenerConsultas()
{
    $bd = obtenerConexion();
    $stmt = $bd->query("SELECT * FROM registros_cargas ORDER BY id DESC");
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
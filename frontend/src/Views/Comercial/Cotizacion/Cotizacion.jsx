import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Home from "../../../Layout/Home";
import SearchComercial from "./Components/SearchComercial";
import Table from "./Components/Table";
import DatosRemitente from "./Components/DatosRemitente";
import CalcularEnvio from "./Components/CalcularEnvio";
import ListaDestinos from "./Components/ListaDestinos";
import EncabezadoCotizacion from "./Modals/EncabezadoCotizacion";
const Cotizacion = () => {
  const [showModal, setShowModal] = useState(false);
  // Estado de cliente elegido en false
  const [clienteElegido, setClienteElegido] = useState(null);
  // Visibilidad del Modal VISTA DE ENCABEZADOS
  const [modalVisible3, setModalVisible3] = useState(false);
  // Estado del area elegida en false
  const [areaElegida, setAreaElegida] = useState(null);
  // Estado del modal por fila
  const [selectedRow, setSelectedRow] = useState(null);
  // FUNCIONALIDAD DE LAS COLUMNAS
  const [columnasVisibles, setColumnasVisibles] = useState({
    Fecha: true,
    "Numero Cotizacion": true,
    "Cantidad Destinos": true,
    Cliente: true,
    "Contacto Repre": true,
    Telefono: true,
    "Correo Electronico": true,
    Validacion: true,
  });

  const handleGuardarColumnas = (columnas) => {
    setColumnasVisibles(columnas);
  };
  const [selectedClienteData, setSelectedClienteData] = useState(null); //Seleccionar Cliente

  // Evento Hover para Btn-Hamburguesa (Modal)
  const handleIconHover = (e, id) => {
    setShowModal(true);
    setSelectedRow(id);
    const selectedCliente = cotizaciones.find(
      (cotizacion) => cotizacion.id === id
    );
    setSelectedClienteData(selectedCliente);
  };
  const handleIconHoverExit = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Funcionalidad VISTA DE ENCABEZADOS
  const mostrarModal3 = () => {
    handleCloseModal();
    setModalVisible3(true);
  };

  const [opcionesSelect, setOpcionesSelect] = useState([]);

  const cargarListaEnvios = async () => {
    try {
      const response = await fetch(
        `https://sysdemo03.byma-ve.com/BackendApiRest/Comercial/Cotizacion/obtenerListaDestinos.php?id_cliente=${clienteElegido}&id_area=${areaElegida}`
      );
      const data = await response.json();
      setOpcionesSelect(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [dataEnvio, setDataEnvio] = useState({});

  const fetchData = async () => {
    if (clienteElegido && areaElegida) {
      try {
        const response = await fetch(
          `https://sysdemo03.byma-ve.com/BackendApiRest/Comercial/Cotizacion/obtenerCalculoTotal.php?id_cliente=${clienteElegido}&id_area=${areaElegida}`
        );
        const data = await response.json();
        setDataEnvio(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const [tipoComprobante, setTipoComprobante] = useState("");

  // Estado y efecto para obtener datos de la API
  const [cotizaciones, setCotizaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const actualizarTabla = () => {
    cargarTabla();
  };

  const cargarTabla = async () => {
    try {
      const response = await fetch(
        "https://sysdemo03.byma-ve.com/BackendApiRest/Comercial/Cotizacion/obtenerCotizaciones.php"
      );
      const data = await response.json();
      setCotizaciones(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    cargarTabla();
  }, []);

  // Maneja la búsqueda de cotizaciones
  const handleSearch = (term) => {
    setCurrentPage(1);
    setSearchTerm(term);
  };

  // Filtra cotizaciones según el término de búsqueda
  const filteredCotizaciones = cotizaciones.filter((cotizacion) =>
    Object.values(cotizacion).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCotizaciones.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calcula números de páginas para la paginación
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredCotizaciones.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  // Maneja el cambio de página en la paginación
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalItems = filteredCotizaciones.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const eliminarCotizacion = async (id) => {
    try {
      const response = await fetch(
        `https://sysdemo03.byma-ve.com/BackendApiRest/Comercial/Cotizacion/eliminarCotizacion.php?id_cotizacion=${id}`,
        {
          method: "GET",
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        Swal.fire({
          icon: "success",
          title: responseData.mensaje,
        });
      } else {
        console.error("Error al eliminar la Cotizacion");
        Swal.fire({
          icon: "error",
          title: responseData.mensaje,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la solicitud de eliminación",
      });
      console.log(error);
    }
    cargarTabla();
  };

  const handleEliminarCotizacion = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCotizacion(id);
      }
    });
  };

  const enviarValidacion = async (id) => {
    // ESTILOS DE PRECARGADO
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      background: "transparent",
      html: `
      <div class="papapa"> 
        <div class="loader1"> 
        <h1 class="guardado" >Guardando...</h1>
        </div>
      
        <div class="loader2">
          <div class="justify-content-center jimu-primary-loading"></div>
        </div>
      </div>
    `,
      onBeforeOpen: () => {
        // Función que se ejecuta antes de que se abra la ventana modal
        Swal.showLoading(); // Muestra una animación de carga dentro de la ventana modal
      },
    });
    try {
      const response = await fetch(
        `https://sysdemo03.byma-ve.com/BackendApiRest/Comercial/Validacion/enviarValidacion.php?id_cotizacion=${id}&id_creador=${localStorage.getItem(
          "id_usuario"
        )}`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        Swal.fire({
          icon: "success",
          title: responseData.mensaje,
        });
      } else {
        console.error("Error al enviar la Cotizacion");
        Swal.fire({
          icon: "error",
          title: responseData.mensaje,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud de enviar:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la solicitud de enviar",
      });
    }
    cargarTabla();
  };

  const handleEnviarValidacion = (id) => {
    Swal.fire({
      title: "¿Estás seguro de que deseas Enviar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Enviar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        enviarValidacion(id);
      }
    });
  };

  return (
    <>
      <Home
        children1={
          <>
            <SearchComercial
              actualizarTabla={actualizarTabla}
              titlle={"Cotización"}
              tipoComprobante={tipoComprobante}
              clienteElegido={clienteElegido}
              areaElegida={areaElegida}
              onFetchData={fetchData}
              cargarListaEnvios={cargarListaEnvios}
              onSearch={handleSearch}
            />
            <EncabezadoCotizacion
              modalEncabezados={modalVisible3}
              setModalEncabezados={setModalVisible3}
              onGuardarColumnas={handleGuardarColumnas}
              setColumnasVisibles={setColumnasVisibles}
            />
          </>
        }
        children2={
          <>
            <div className="contenido flex">
              <div className="tabla w-[76%]">
                <Table
                  handleEnviarValidacion={handleEnviarValidacion}
                  handleEliminarCotizacion={handleEliminarCotizacion}
                  totalItems={totalItems} //Paginacion
                  itemsPerPage={itemsPerPage} //Paginacion
                  currentPage={currentPage} //Paginacion
                  handlePageChange={handlePageChange} //Paginacion
                  cotizacionesActuales={currentItems} // Pasar datos a la tabla
                  cotizacionesFiltrados={filteredCotizaciones} // Pasar datos a la tabla
                  mostrarModal={mostrarModal3}
                  handleIconHover={handleIconHover}
                  handleIconHoverExit={handleIconHoverExit}
                  selectedRow={selectedRow}
                  showModal={showModal}
                  columnasVisibles={columnasVisibles}
                />
              </div>
              <div className="ml-4 w-[30%] xl:w-[24%]">
                <DatosRemitente
                  onClienteElegido={setClienteElegido}
                  onAreaElegida={setAreaElegida}
                />

                <ListaDestinos
                  clienteElegido={clienteElegido}
                  areaElegida={areaElegida}
                  onFetchData={fetchData}
                  cargarListaEnvios={cargarListaEnvios}
                  opcionesSelect={opcionesSelect}
                />

                <CalcularEnvio
                  id_cliente={clienteElegido}
                  id_area={areaElegida}
                  onFetchData={fetchData}
                  data={dataEnvio}
                  onTipoComprobante={setTipoComprobante}
                />
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default Cotizacion;

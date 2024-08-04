import {
  IconoHamburguesa,
  IconoConfig,
  IconoAdministracion,
  IconoMuñeco,
  IconoBox,
  Imprimir,
} from "../../../../Iconos/Iconos-NavBar";
import { useState } from "react";
import LogoLogis from "../../../../Static/Img_Pred/Icons.png";
import jsPDF from "jspdf";
import Pagination from "../../../Administración/Usuario/Components/PaginacionAdmin";

export const Table = ({
  columnasVisibles,
  mostrarModalEncabezados,
  mostrarModalAgente,
  totalItems,
  itemsPerPage,
  currentPage,
  handlePageChange,
  despachosActuales,
  despachosFiltrados,
  handleIconHoverExitAgentes,
  handleIconHoverAgentes,
}) => {
  // Mostrar el pequeño modal
  const [showModal, setShowModal] = useState(false);
  // seleccionamos la fila a mostrar el modal
  const [selectedRow, setSelectedRow] = useState(null);
  // Visibilidad del Modal Eliminar e Imprimir
  const [modalVisible2, setModalVisible2] = useState(false);
  // Columnas seleccionadas
  const columnas = Object.keys(columnasVisibles);

  // Evento Hover para Btn-Hamburguesa (Modal)
  const handleIconHover = (e, dni) => {
    setShowModal(true);
    setSelectedRow(dni);
  };

  const handleIconHoverExit = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Funcionalidad Eliminar e Imprimir
  const mostrarModal2 = () => {
    handleCloseModal();
    setModalVisible2(true);
  };

  // FUNCION IMPRIMIR

  const idprincipal = {
    ID: 20610314644,
    cliente: "Nombre empresa cliente",
    contacto: "Nombre",
    ciudad: "Lima",
    telefono: 1234567891254879,
    direccion: {
      ciudad: "lima",
      zip: 15103,
      lat: 25.4548,
      lng: 391.1425,
    },
    email: "contacto@contacto",
    fecha: "2024/03/06",
    pago: "contado",
  };

  const atributo1 = {
    id: 1,
    lugar: "amazonas,amazonas,uctubamba",
    cant: 5,
    p: 25.5,
    pv: 35.8,
    coste: 150.0,
    costx: 50,
    tt: 200.0,
  };

  const atributo2 = { ...atributo1 };
  atributo2.id = 2;
  atributo2.lugar = "Lambayeque,Lambayeque,Lambayeque";
  atributo2.cant = 10;
  atributo2.p = 80.75;
  atributo2.pv = 40.6;
  atributo2.coste = 300.0;
  atributo2.costx = 30;
  atributo2.tt = 330;

  const atributo3 = { ...atributo2 };
  atributo3.id = 3;
  atributo3.lugar = "Madre de dios , tahuamanu";
  atributo3.cant = 3;
  atributo3.p = 10.65;
  atributo3.pv = 20.55;
  atributo3.coste = 50.0;
  atributo3.costx = 10.0;
  atributo3.tt = 60;

  const atributov = {
    id: " ",
    lugar: "",
    cant: "",
    p: "",
    pv: "",
    coste: "",
    costx: "",
    tt: 0.0,
  };
  let imp = atributo1.tt + atributo2.tt + atributo3.tt;
  let igv = imp * 0.18;
  let ttl = imp + igv;

  const printPDF = () => {
    const doc = new jsPDF();
    const contxt = [
      { content: "", styles: { cellWidth: 150, fillColor: [255, 255, 255] } },
      {
        content: "N° Cotizacion",
        styles: { cellWidth: 30, lineColor: [0, 0, 0], lineWidth: 0.1 },
      },
    ];
    var c = 1;
    if (c < 10) c = "A-000" + c;
    if (c < 100) c = "A-00" + c;
    if (c < 1000) c = "A-0" + c;
    let conteo = [
      { content: "", styles: { cellWidth: 150, fillColor: [255, 255, 255] } },
      {
        content: c,
        style: { cellWidth: 30, lineColor: [0, 0, 0], lineWidth: 0.1 },
      },
    ];
    const addContentToFirstPage = (doc, data) => {
      if (data.pageCount === 1) {
        doc.addImage(LogoLogis, "PNG", 10, 0, 35, 40);
        doc.setTextColor(0, 102, 153);
        doc.setFont("Arial");
        doc.setFontSize(18);
        doc.text("Transportes Mr Logistik S.A.C", 65, 20);
        doc.setFont("Arial");
        doc.setTextColor(0, 102, 153);
        doc.setFontSize(10);
        doc.text(
          "Nuestra experiencia en logistica garantiza que tus entregas sean eficientes y",
          50,
          38
        );
        doc.text("confiable.", 100, 43);
      }
    };
    const titul0 = ["Ruc/DNI", "Cliente", "Contacto", "Ciudad"];
    const line0 = [
      [
        `${idprincipal.ID}`,
        `${idprincipal.cliente}`,
        `${idprincipal.contacto}`,
        `${idprincipal.ciudad}`,
      ],
    ];

    const titul1 = ["Teléfono", "Direccion", "Email", "Fecha", "Forma de pago"];
    const line1 = [
      [
        `${idprincipal.telefono}`,
        `${idprincipal.direccion.ciudad}`,
        `${idprincipal.email}`,
        `${idprincipal.fecha}`,
        `${idprincipal.pago}`,
      ],
    ];

    const titul2 = [
      "Item",
      "Destino de entrega",
      "Cant",
      "Peso",
      "Peso vol",
      "Costo envio",
      "Costo extra",
      "Valor Total",
    ];
    const line2 = [
      [
        { content: `${atributo1.id}`, styles: { fillColor: [192, 192, 192] } }, // Gris claro para atributo1.id
        `${atributo1.lugar}`,
        `${atributo1.cant}`,
        `${atributo1.p}`,
        `${atributo1.pv}`,
        `s/.${atributo1.coste}`,
        `s/.${atributo1.costx}`,
        {
          content: `s/.${(atributo1.coste + atributo1.costx).toFixed(2)}`,
          styles: { fillColor: [192, 192, 192] },
        }, // Cambia el color de fondo de la celda para la suma de atributo1.coste y atributo1.costx
      ],

      [
        { content: `${atributo2.id}`, styles: { fillColor: [192, 192, 192] } }, // Gris claro para atributo2.id
        `${atributo2.lugar}`,
        `${atributo2.cant}`,
        `${atributo2.p}`,
        `${atributo2.pv}`,
        `s/.${atributo2.coste}`,
        `s/.${atributo2.costx}`,
        {
          content: `s/.${(atributo2.coste + atributo2.costx).toFixed(2)}`,
          styles: { fillColor: [192, 192, 192] },
        }, // Cambia el color de fondo de la celda para la suma de atributo2.coste y atributo2.costx
      ],
      [
        { content: `${atributo3.id}`, styles: { fillColor: [192, 192, 192] } },
        `${atributo3.lugar}`,
        `${atributo3.cant}`,
        `${atributo3.p}`,
        `${atributo3.pv}`,
        `s/.${atributo3.coste}`,
        `s/.${atributo3.costx}`,
        {
          content: `s/.${(atributo3.coste + atributo3.costx).toFixed(2)}`,
          styles: { fillColor: [192, 192, 192] },
        },
      ],

      ...Array.from({ length: 15 }, () => [
        { content: `${atributov.id}`, styles: { fillColor: [192, 192, 192] } },
        `${atributov.lugar}`,
        `${atributov.cant}`,
        `${atributov.p}`,
        `${atributov.pv}`,
        `${atributov.coste}`,
        `${atributov.costx}`,
        {
          content: `s/.${(atributov.tt * 0.0).toFixed(2)}`,
          styles: { fillColor: [192, 192, 192] },
        },
      ]),
    ];

    const pie = [
      [
        {
          content: "Observaciones:",
          styles: { cellWidth: 140, lineColor: [0, 0, 0], lineWidth: 0.1 },
        },
        {
          content: "Importe",
          styles: {
            cellWidth: 22,
            halign: "center",
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
          },
        },
        {
          content: imp.toFixed(2),
          styles: {
            fillColor: [192, 192, 192],
            halign: "center",
            cellWidth: 19.8,
            textColor: [0, 0, 0],
            theme: "grid",
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
          },
        },
      ],
      [
        { content: "", styles: { cellWidth: 140, fillColor: [240, 248, 255] } },
        {
          content: "IGV(18%)",
          styles: {
            cellWidth: 22,
            halign: "center",
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
          },
        },
        {
          content: igv.toFixed(2),
          styles: {
            fillColor: [192, 192, 192],
            cellWidth: 19.8,
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            halign: "center",
            textColor: [0, 0, 0],
          },
        },
      ],
      [
        { content: "", styles: { cellWidth: 140, fillColor: [240, 248, 255] } },
        {
          content: "TOTAL",
          styles: {
            cellWidth: 22,
            halign: "center",
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
          },
        },
        {
          content: ttl.toFixed(2),
          styles: {
            cellWidth: 19.8,
            halign: "center",
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
          },
        },
      ],
    ];
    doc.autoTable({
      startY: 5,
      head: [contxt],
      styles: {
        halign: "center",
      },
      body: [conteo],
    });

    doc.autoTable({
      startY: 50,
      head: [titul0],
      headStyles: {
        fillColor: [93, 182, 251],
      },
      body: line0,
      bodyStyles: {
        fillColor: [243, 247, 246],
      },
      theme: "grid",
      styles: {
        halign: "center",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      afterPageContent: (data) => addContentToFirstPage(doc, data),
    });
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      head: [titul1],
      headStyles: {
        fillColor: [93, 182, 251],
      },
      body: line1,
      bodyStyles: {
        fillColor: [243, 247, 246],
      },
      theme: "grid",
      styles: {
        halign: "center",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
    });
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      head: [titul2],
      headStyles: {
        fillColor: [25, 81, 144],
      },
      body: line2,

      theme: "grid",
      styles: {
        halign: "center",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
    });
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      head: pie,
      theme: "grid",
      styles: {
        fillColor: [25, 81, 144],
      },
    });
    doc.save(`Reporte_${idprincipal.ID}`);
  };

  return (
    <>
      <div className="mr-2">
        <div className="  relative  overflow-x-auto  bg-[#fff]   ScrollTable rounded-t-2xl ">
          <table className="w-[100%] table-fixed   text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {despachosFiltrados.length === 0 ? (
              <span className="  text-center flex justify-center mt-3 text-base">
                No se encontraron resultados
              </span>
            ) : (
              <tbody className="block text-[#535c69] whitespace-nowrap ">
                <thead className=" text-md   border-b border-gray-300 text-gray-600 whitespace-nowrap ">
                  <tr className="">
                    {/* <th></th> */}
                    <th className="px-5 py-3 w-1/6">Fecha</th>
                    {columnas.map(
                      (header, index) =>
                        columnasVisibles[header] && (
                          <th
                            key={index}
                            scope="col"
                            className="px-10 py-3 w-1/6"
                          >
                            {header}
                          </th>
                        )
                    )}
                  </tr>
                </thead>
                {despachosFiltrados &&
                  despachosActuales.map((despacho, index) => (
                    <tr
                      key={despacho.id_num_manifiesto_despacho}
                      className=" bg-[#fff] text-left border-b border-gray-300 hover:bg-gray-300 "
                    >
                      {/* <th
                        scope="row"
                        className=" p-[0.75rem_1.5rem] font-medium  z-50 whitespace-nowrap text-gray-900 w-[4rem] max-w-[64px]"
                      >
                        <button
                          onClick={printPDF}
                          className="items-center text-[16px] align-middle pb-[2px] cursor-pointer  text-[#535c69]"
                        >
                          <Imprimir />
                        </button>
                      </th> */}

                      <td className="px-5 py-4 ">{despacho.fecha_creado}</td>
                      <td className="px-10 py-4 ">
                        {despacho.id_num_manifiesto_despacho}
                      </td>
                      <td className="px-10 py-4 ">
                        {despacho.guia_transportista_despacho}
                      </td>
                      <td className="px-10 py-4 ">
                        {despacho.id_transportista_despacho}
                      </td>
                      <td className="px-10 py-4 ">{despacho.destino}</td>
                      <td className="px-10 py-4 ">
                        {despacho.cantidad_bultos_despacho}
                      </td>
                      <td className="px-10 py-4 ">{despacho.total_guias}</td>
                      <td className="px-9 py-1  w-full ">
                        <button
                          className="cursor-pointer flex text-center  items-center  justify-items-center "
                          onClick={mostrarModalAgente}
                          onMouseEnter={(e) =>
                            handleIconHoverAgentes(
                              e,
                              despacho.id_num_manifiesto_despacho
                            )
                          }
                          onMouseLeave={handleIconHoverExitAgentes}
                        >
                          <IconoBox className=" ml-[15px] absolute mt-1" />
                          <IconoMuñeco className="ml-[22px]" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

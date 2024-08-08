import React, { useState } from "react";
import Home from "../../../Layout/Home";
import ModalUbigeo from "./Modales/ModalUbigeo";
import Select from "react-select";
import { IconoHamburguesa } from "../../../Iconos/Iconos-NavBar";
import { Link } from "react-router-dom";
import {
  IconoLupa1,
  IconoAgregar,
  IconoPDF,
  IconoFolder,
} from "../../../Iconos/Iconos-NavBar";

const HomeGuiaEmision = () => {
  const OpcionesGuias = [
    { label: "Guia Remision Remitente", value: "Guia Remision Remitente" },
    {
      label: "Guia Remision Transportista",
      value: "Guia Remision Transportista",
    },
  ];
  const OpcionDocumento = [
    { label: "DNI", value: "DNI" },
    { label: "Carnet de Exntrajeria", value: "Carnet de Exntrajeria" },
    { label: "RUC", value: "RUC" },
    { label: "Pasaporte", value: "Pasaporte" },
    {
      label: "Cedula Diplomatica de Identidad",
      value: "Cedula Diplomatica de Identidad",
    },
    {
      label: "TAM- Tarjeta Andina de Migracion",
      value: "TAM- Tarjeta Andina de Migracion",
    },
  ];
  const OpcionVehiculo = [
    { label: "Transporte Pubico", value: "Transporte Pubico" },
    {
      label: "Transporte Privado",
      value: "Transporte Privado",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openInfoAdicional, setOpenInfoAdicional] = useState(false);
  const [openInfoAdicional2, setOpenInfoAdicional2] = useState(false);
  const [selectedTab, setSelectedTab] = useState("remitter");
  const [selectedOption, setSelectedOption] = useState(OpcionesGuias[0]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const OpenModalInfo = () => {
    setOpenInfoAdicional(!openInfoAdicional);
  };

  const OpenModalInfo2 = () => {
    setOpenInfoAdicional2(!openInfoAdicional2);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // FUNCION SELECT
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      maxHeight: "23px",
      minHeight: "30px",
      height: "10px",
      fontSize: "12px",
      backgroundColor: "transparent",
      borderRadius: "5px",
      marginTop: "0",
      border: "none",
    }),
    // caja de opciones
    menu: (provided) => ({
      ...provided,
      borderRadius: "5px",
      fontSize: "12px",
      margin: "6px 0",
      padding: "2px 0px",
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      padding: "4px 12px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0px 20px 1px 2px",
      marginTop: "-2px",
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      display: "none", // Oculta el indicador
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none", // Oculta la barrita al lado del indicador
    }),
  };

  return (
    <>
      {" "}
      <Home
        children1={
          <>
            {" "}
            <ModalUbigeo
              isOpen={isModalOpen}
              onClose={closeModal}
            ></ModalUbigeo>{" "}
          </>
        }
        children2={
          <>
            {" "}
            <div className=" ">
              <ul className="flex flex-wrap w-full justify-start text-lg font-medium text-gray-700 mb-4 lg:mb-0 pt-2">
                <li
                  className={`group transition-transform duration-300 p-2 px-4 rounded-t-xl ${
                    selectedTab === "remitter"
                      ? "bg-white text-blue-500"
                      : "bg-blue-500 text-white"
                  }`}
                  onClick={() => handleTabClick("remitter")}
                >
                  <Link
                    to=""
                    className="elmnts relative text-[15px] font-semibold no-underline transition-all overflow-hidden pb-1"
                  >
                    GR. Remitente
                    <span
                      className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform ${
                        selectedTab === "remitter"
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      } transition-transform duration-300`}
                    ></span>
                  </Link>
                </li>
                <li
                  className={`group transition-transform duration-300 p-2 px-4 rounded-t-xl ${
                    selectedTab === "reports"
                      ? "bg-white text-blue-500"
                      : "bg-blue-500 text-white"
                  }`}
                  onClick={() => handleTabClick("reports")}
                >
                  <Link
                    to=""
                    className="elmnts relative text-[15px] font-semibold no-underline transition-all overflow-hidden pb-1"
                  >
                    Reportes
                    <span
                      className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform ${
                        selectedTab === "reports"
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      } transition-transform duration-300`}
                    ></span>
                  </Link>
                </li>
              </ul>
              {selectedTab === "remitter" && (
                <div className=" GUIAREMISION">
                  <div className=" mx-auto p-6  bg-white shadow-md rounded-t-xl rounded-tl-none">
                    <div className="flex  justify-between gap-x-8">
                      <div className="w-full">
                        <h2 className="text-xl font-bold  text-blue-600  ">
                          + {selectedOption.value}
                        </h2>
                      </div>
                      <div className="flex justify-between gap-x-6 w-[100%] items-center">
                        <div className="flex-1 rounded-md  bg-white  outline-none  focus:ring-2  text-xs border border-gray-400">
                          <Select
                            defaultValue={selectedOption}
                            options={OpcionesGuias}
                            onChange={handleSelect}
                            styles={customStyles}
                          ></Select>
                        </div>
                        <div className="flex-1 rounded-md  bg-white outline-none  focus:ring-2  text-xs border border-gray-400">
                          <Select
                            placeholder="Seleccione..."
                            styles={customStyles}
                          ></Select>
                        </div>
                        <div className="flex-1    focus:ring-2  text-xs ">
                          <input
                            type="date"
                            className=" w-full rounded-md outline-none px-2 py-[6px] focus:ring-1 border border-gray-400 text-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" font-bold  text-blue-600 border-b-[3px] border-blue-500 pb-2 "></div>
                  </div>
                  <div className=" mx-auto px-6 bg-white shadow-lg rounded-b-xl">
                    <div className="DATOSREMITENTE border-2 border-sky-400 rounded-md p-4 mb-6">
                      <h2 className="text-sky-500 font-semibold text-lg mb-4 ">
                        Datos Remitente
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-[0.3fr,0.3fr,.8fr,1fr,0.1fr] gap-6">
                        <Select
                          className="  rounded-md outline-none   focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                          placeholder="Seleccione..."
                          options={OpcionDocumento}
                          styles={customStyles}
                        />
                        <input
                          type="search"
                          placeholder="Buscar RUC..."
                          className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                        />
                        <input
                          type="text"
                          placeholder="Razón Social"
                          className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                        />
                        <input
                          type="text"
                          placeholder="Dirección"
                          className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                        />
                        <input
                          type="text"
                          placeholder="Codigo"
                          className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                        />
                      </div>

                      <h2 className="text-sky-500 font-semibold text-lg mt-4 mb-4">
                        Datos de la Ubicación
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-[0.1fr,2fr,.5fr,1.5fr] gap-x-4">
                        <input
                          type="search"
                          className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                        />

                        <Select
                          className="  rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                          placeholder="Seleccione..."
                          styles={customStyles}
                        />
                        <input
                          type="text"
                          onClick={openModal}
                          placeholder="Ubigeo LLeg."
                          className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                        />
                        <input
                          type="text"
                          placeholder="Dirección de Llegada"
                          className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                        />
                      </div>
                    </div>

                    <div className="DATOSVEHICULOPRINCIPAL mb-4">
                      <button
                        type="text"
                        onClick={OpenModalInfo}
                        className="  w-full text-start  rounded-md py-[6px]   outline-none   hover:bg-gray-100 active:border-b-none  border-t-2 border-r-2 border-l-2 border-b-2 border-sky-400 rounded-b-none"
                      >
                        <h2 className="text-sky-500 font-semibold text-lg px-4 ">
                          Datos del Vehiculo Principal
                        </h2>
                      </button>
                      <div
                        className={`transform origin-top transition-all  duration-300 ease-in-out   ${
                          openInfoAdicional
                            ? "scale-y-100 opacity-100 max-h-[1000px] border-r-2 border-l-2 border-b-2 border-sky-400 rounded-b-lg  "
                            : "scale-y-0 opacity-0 max-h-0 "
                        }`}
                      >
                        <div className=" p-4 mb-6 ">
                          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-[.6fr,.4fr,1fr,1.2fr] gap-4">
                            <Select
                              className="  rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                              placeholder="Seleccione..."
                              options={OpcionVehiculo}
                              styles={customStyles}
                            />
                            <Select
                              className="  rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                              placeholder="Tipo de Documento"
                              options={OpcionDocumento}
                              styles={customStyles}
                            />
                            <input
                              type="search"
                              placeholder="Buscar RUC Transportista"
                              className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                            />
                            <input
                              type="text"
                              placeholder="Razón Social"
                              className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                            />
                          </div>

                          <h2 className="text-sky-500 font-semibold text-lg mt-4 mb-4">
                            Datos Conductor
                            <span className="mx-2 text-red-500">
                              (Opcional)
                            </span>
                          </h2>
                          <div className="grid grid-cols-2 md:grid-cols-[1fr,1fr,1fr,1fr,1fr,.5fr] gap-x-4">
                            <Select
                              type="text"
                              placeholder="Tipo de Documento"
                              styles={customStyles}
                              options={OpcionDocumento}
                              className=" rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400  "
                            />

                            <input
                              type="search"
                              placeholder="Buscar Documento"
                              className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                            />
                            <input
                              type="search"
                              placeholder="Buscar Nombre"
                              className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                            />
                            <input
                              type="text"
                              placeholder="Apellidos"
                              className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                            />
                            <input
                              type="text"
                              placeholder="Licencia"
                              className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                            />
                            <button className="px-2 rounded-lg  flex justify-center items-center  bg-gradient-to-t  from-yellow-400 via-yellow-500 to-yellow-500 hover:bg-gradient-to-br active:scale-95 text-white  shadow ">
                              Agregar
                            </button>
                          </div>
                          <table className="w-full mt-4 bg-slate-100  ">
                            <thead className="font-medium text-sm text-gray-600">
                              <tr className=" ">
                                <td className="ps-4 py-2 text-left"></td>
                                <td className="px-4 py-2 text-left">
                                  Tipo Conductor
                                </td>
                                <td className="px-4 py-2 text-left">
                                  Tipo Documento
                                </td>
                                <td className="px-4 py-2 text-left">
                                  Documento
                                </td>
                                <td className="px-4 py-2 text-left">Nombre</td>
                                <td className="px-4 py-2 text-left">
                                  Apellido
                                </td>
                                <td className="px-4 py-2 text-left">
                                  Licencia
                                </td>
                              </tr>
                            </thead>
                            <tbody className="w-full mt-4 text-sm">
                              <tr className="border-b bg-white  ">
                                <td
                                  scope="row"
                                  className="ps-4 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                  <div className="relative group w-[10%]">
                                    <button className="text-[#535c69] focus:outline-none">
                                      <IconoHamburguesa />
                                    </button>
                                    <div className="absolute top-0 hidden group-hover:flex flex-col z-50 bg-slate-100  text-slate-700 rounded-md shadow-md text-left  ml-6 colita-modal    mt-[-23px]">
                                      <button className="text-sm hover:bg-gray-200 px-2 py-1 w-24 text-left rounded-sm z-50">
                                        Editar
                                      </button>
                                      <button className="text-sm hover:bg-gray-200 px-2 py-1 w-24 text-left rounded-sm z-50">
                                        Eliminar
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td className=" px-4 py-2 text-gray-500">1</td>
                                <td className=" px-4 py-2 text-gray-500">
                                  asd
                                </td>
                                <td className=" px-4 py-2 text-gray-500">
                                  asd
                                </td>
                                <td className=" px-4 py-2 text-gray-500">
                                  asd
                                </td>
                                <td className=" px-4 py-2 text-gray-500">
                                  asd
                                </td>
                                <td className=" px-4 py-2 text-gray-500">os</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="DATOSDEGUIAREMISION mb-4">
                      <button
                        type="text"
                        onClick={OpenModalInfo2}
                        className="  w-full text-start  rounded-md py-[6px]   outline-none   hover:bg-gray-100 active:border-b-none  border-t-2 border-r-2 border-l-2 border-b-2 border-sky-400 rounded-b-none"
                      >
                        <h2 className="text-sky-500 font-semibold text-lg px-4 ">
                          Datos de la Guia de Remision
                        </h2>
                      </button>
                      <div
                        className={`transform origin-top transition-all  duration-300 ease-in-out overflow-hidden ${
                          openInfoAdicional2
                            ? "scale-y-100 opacity-100 max-h-[1000px] border-r-2 border-l-2 border-b-2 border-sky-400 rounded-b-lg "
                            : "scale-y-0 opacity-0 max-h-0 "
                        }`}
                      >
                        <div className=" rounded-lg p-4 mb-6">
                          <div className="grid grid-cols-2 md:grid-cols-[0.2fr,1fr,1fr,1fr,1.8fr] gap-x-4 ">
                            <div className=" text-gray-400 w-full">
                              <input
                                type="search"
                                placeholder="Peso bruto(KG)"
                                className="px-2 py-[6px] rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                              />{" "}
                              <p className="  hidden text-green-500 absolute ps-2  font-semibold text-[12px]">
                                Perfecto
                              </p>
                            </div>
                            <div className=" text-gray-400 w-full">
                              <input
                                type="date"
                                placeholder="Fecha de Inicio "
                                className="px-2 py-[6px] rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 w-full "
                              />
                            </div>
                            <div className=" text-gray-400 w-full">
                              <input
                                type="date"
                                placeholder="Fecha de Inicio "
                                className="px-2 py-[6px] rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 w-full "
                              />
                            </div>
                            <div className=" text-gray-400 w-full">
                              <input
                                type="date"
                                placeholder="Fecha de Inicio "
                                className="px-2 py-[6px] rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 w-full "
                              />
                            </div>
                            <div className=" text-gray-400 w-full">
                              <input
                                type="date"
                                placeholder="Fecha de Inicio "
                                className="px-2 py-[6px] rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 w-full "
                              />
                            </div>
                          </div>
                          <div className="w-full mt-4   ">
                            <textarea
                              name=""
                              id=""
                              placeholder="Informacion adicional..."
                              className="px-2 py-[2px] rounded-md outline-none  focus:ring-2  text-md border border-gray-400 text-gray-700 w-[30%] nax-h-14 "
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ITEMS border-2 border-sky-400 rounded-md p-4 mb-6">
                      <h2 className="text-sky-500 font-semibold text-lg  mb-4">
                        Items
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-[1.5fr,1fr] gap-x-4">
                        <div className="grid grid-cols-5 gap-x-4">
                          <input
                            type="search"
                            placeholder="DNI"
                            value={1}
                            className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400  "
                          />
                          <input
                            type="search"
                            placeholder="C. Int. "
                            className="px-2 py-[6px] rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                          />
                          <input
                            type="text"
                            placeholder="C. SUN. "
                            className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                          />
                          <input
                            type="text"
                            placeholder="C. Barra "
                            className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                          />
                          <input
                            type="number"
                            placeholder="Unidades"
                            className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                          />
                        </div>
                        <div className="w-full grid grid-cols-[3fr,1fr]">
                          <input
                            type="search"
                            placeholder="Descipcion (*)"
                            className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                          />{" "}
                          <div className="mx-auto items-center flex gap-x-2 ">
                            <input type="checkbox" />
                            <span className="text-xs ">Adicionales </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-4  flex justify-end gap-x-6">
                        <button className="px-14 rounded-md py-1 bg-gradient-to-t  from-blue-400 via-blue-500 to-blue-500 hover:bg-gradient-to-br active:scale-90 text-white font-medium">
                          + Agregar
                        </button>
                        <button className="px-12 rounded-md py-1 bg-gradient-to-t  from-green-400 via-green-500 to-green-500 hover:bg-gradient-to-br active:scale-90 text-white font-medium">
                          + Items
                        </button>
                      </div>
                      <div className="TABLA">
                        <table className="w-full mt-4 bg-slate-100  ">
                          <thead className="font-medium text-gray-600">
                            <tr className=" ">
                              <td className="ps-4 py-2 text-left"></td>
                              <td className="px-4 py-2 text-left">Item</td>
                              <td className="px-4 py-2 text-left">Cantidad</td>
                              <td className="px-4 py-2 text-left">
                                Código Producto
                              </td>
                              <td className="px-4 py-2 text-left">
                                Código SUNAT
                              </td>
                              <td className="px-4 py-2 text-left">
                                Código Barras
                              </td>
                              <td className="px-4 py-2 text-left">
                                Unidad Medida
                              </td>
                              <td className="px-4 py-2 text-left">
                                Descripcion
                              </td>
                            </tr>
                          </thead>
                          <tbody className="w-full mt-4 text-md ">
                            <tr className="border-b bg-white  ">
                              <td
                                scope="row"
                                className="ps-4 py-4 font-medium text-gray-900 whitespace-nowrap"
                              >
                                <div className="relative group w-[10%]">
                                  <button className="text-[#535c69] focus:outline-none">
                                    <IconoHamburguesa />
                                  </button>
                                  <div className="absolute top-0 hidden group-hover:flex flex-col z-50 bg-slate-100  text-slate-700 rounded-md shadow-md text-left  ml-6 colita-modal    mt-[-23px]">
                                    <button className="text-sm hover:bg-gray-200 px-2 py-1 w-24 text-left rounded-sm z-50">
                                      Editar
                                    </button>
                                    <button className="text-sm hover:bg-gray-200 px-2 py-1 w-24 text-left rounded-sm z-50">
                                      Eliminar
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className=" px-4 py-2 text-gray-500">1</td>
                              <td className=" px-4 py-2 text-gray-500">asd</td>
                              <td className=" px-4 py-2 text-gray-500">asd</td>
                              <td className=" px-4 py-2 text-gray-500">asd</td>
                              <td className=" px-4 py-2 text-gray-500">asd</td>
                              <td className=" px-4 py-2 text-gray-500">asd</td>
                              <td className=" px-4 py-2 text-gray-500">os</td>
                            </tr>
                            <tr className="border-b bg-white  ">
                              <td
                                scope="row"
                                className="ps-4 py-4 font-medium text-gray-900 whitespace-nowrap"
                              >
                                <div className="relative group w-[10%]">
                                  <button className="text-[#535c69] focus:outline-none">
                                    <IconoHamburguesa />
                                  </button>
                                  <div className="absolute top-0 hidden group-hover:flex flex-col z-50 bg-slate-100  text-slate-700 rounded-md shadow-md text-left  ml-6 colita-modal    mt-[-23px]">
                                    <button className="text-sm hover:bg-gray-200 px-2 py-1 w-24 text-left rounded-sm z-50">
                                      Editar
                                    </button>
                                    <button className="text-sm hover:bg-gray-200 px-2 py-1 w-24 text-left rounded-sm z-50">
                                      Eliminar
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className=" px-4 py-2 text-gray-500">2</td>
                              <td className=" px-4 py-2 text-gray-500">asd</td>
                              <td className=" px-4 py-2 text-gray-500">asd</td>
                              <td className=" px-4 py-2 text-gray-500">asd</td>
                              <td className=" px-4 py-2 text-gray-500">asd</td>
                              <td className=" px-4 py-2 text-gray-500">asd</td>
                              <td className=" px-4 py-2 text-gray-500">os</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="BOTON w-full flex mb-4  ">
                      <button className="px-10 mx-auto bg-gradient-to-t  from-blue-400 via-blue-500 to-blue-500 hover:bg-gradient-to-br rounded-md py-2 text-white active:scale-95">
                        PREVISUALIZAR
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === "reports" && (
                <div className="">
                  {/* Contenido de "Reportes" */}
                  <div className=" mx-auto p-6  bg-white shadow-md rounded-xl rounded-tl-none">
                    <h2 className="text-xl font-bold  text-blue-600 border-b-[3px] border-blue-500 pb-2 ">
                      + Explorardor de Guia de Remision
                    </h2>
                    <div className="grid grid-cols-[1.5fr,1fr]  text-gray-600  border-b-2 py-4 ">
                      <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-1 gap-x-6  text-gray-600 ">
                        <div className="flex items-center">
                          <label className="block text-sm  w-1/2">
                            Colummna:
                          </label>
                          <select className="mt-1  w-full rounded-md  shadow outline-none  focus:ring-2  text-xs p-[6px] border border-gray-400">
                            <option>
                              GRT - Guía de Remisión - Transportista
                            </option>
                          </select>
                        </div>

                        <div className="flex items-center">
                          <label className="block text-sm w-1/2 ">
                            Fecha Desde:
                          </label>

                          <input
                            type="date"
                            className="mt-1 text-xs p-[6px] border border-gray-400 w-full rounded-md  shadow outline-none  focus:ring-2 "
                          />
                        </div>

                        <div className="flex items-center">
                          <label className="block text-sm w-1/2 ">Dato:</label>

                          <input
                            type="text"
                            placeholder="Ingresar dato.."
                            className="mt-1 text-xs p-[6px] border border-gray-400 w-full rounded-md  shadow outline-none  focus:ring-2 "
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="block text-sm w-1/2 ">
                            Fecha Hasta:
                          </label>

                          <input
                            type="date"
                            className="mt-1 text-xs p-[6px] border border-gray-400 w-full rounded-md  shadow outline-none  focus:ring-2 "
                          />
                        </div>
                      </div>
                      <div className="BOTONES grid md:grid-cols-1 xl:grid-cols-2  md:place gap-1   text-white font-medium ">
                        <div className="flex  items-center justify-center">
                          <button className="flex  shadow-md   justify-center items-center gap-x-4 bg-sky-400 px-6 py-1 rounded-lg w-[70%] text-center active:scale-95 hover:bg-sky-500">
                            <p className="text-[19px]  ">
                              <IconoLupa1 />
                            </p>
                            CONSULTAR
                          </button>
                        </div>

                        <div className="flex items-center justify-center">
                          <button className="flex  shadow-md  justify-center items-center gap-x-4 bg-green-400 hover:bg-green-500 px-6 py-1 rounded-lg w-[70%] text-center active:scale-95  ">
                            <p className=" text-[19px] ">
                              <IconoAgregar />
                            </p>
                            AGREGAR
                          </button>
                        </div>

                        <div className="flex items-center justify-center">
                          <button className="flex shadow-md   justify-center items-center gap-x-4 bg-blue-400 hover:bg-blue-500 px-6 py-1 rounded-lg w-[70%] text-center active:scale-95   ">
                            <span className=" ">
                              <IconoPDF />
                            </span>
                            <span>EXPORTAR</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="RESULTADOS mt-4">
                      <div className=" bg-slate-100 rounded-lg w-full flex justify-center items-center max-h-[34vh] h-[34vh] ">
                        <div className="items-center gap-y-2 flex flex-col">
                          <span className="text-[50px] item">
                            <IconoFolder />
                          </span>
                          <div className="items-center gap-y-2 flex flex-col">
                            <p className="text-gray-400 text-sm">
                              No se encontraron Registros...
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        }
      ></Home>
    </>
  );
};

export default HomeGuiaEmision;

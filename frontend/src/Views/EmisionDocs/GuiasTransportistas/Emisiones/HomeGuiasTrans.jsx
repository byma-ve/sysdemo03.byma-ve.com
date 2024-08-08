import React, { useState } from "react";
import Home from "../../../../Layout/Home";
import {
  IconoHamburguesa,
  IconoAgregar,
  IconoRegistrar,
  IconoVolver,
} from "../../../../Iconos/Iconos-NavBar";
import NavBarGuias from "../Components/navBarGuias";
import Select from "react-select";

const HomeGuiasTrans = () => {
  const [openInfoAdicional, setOpenInfoAdicional] = useState(false);

  const OpenModalInfo = () => {
    setOpenInfoAdicional(!openInfoAdicional);
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
      fontSize: "14px",
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
    <Home
      children1={<NavBarGuias></NavBarGuias>}
      children2={
        <>
          <div className=" mx-auto p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-blue-600 border-b-[3px] border-blue-500  pb-2 ">
              + Datos remitente
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 gap-x-6 mb-4 lg:mr-20 mr-0 text-gray-600 border-b-2 pb-4">
              <div className="flex items-center">
                <label className="block text-sm  w-1/2">RUC:</label>
                <input
                  type="date"
                  className="mt-1 text-xs p-[6px] border border-gray-400 w-full rounded-md  shadow outline-none  focus:ring-2 "
                />
              </div>
              <div className="flex items-center"></div>
              <div className="flex items-center ">
                <label className="block text-sm  w-1/2">Tip. Documento:</label>
                <div className="mt-1  w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                  <Select
                    placeholder="Seleecionar Tipo Doc."
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
              <div className="flex items-center lg:ml-20 ml-0">
                <label className="block text-sm  w-1/2">Tipo de Carga:</label>
                <div className="mt-1  w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                  <Select
                    placeholder="Seleccione tipo de carga.."
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
              <div className="flex items-center">
                <label className="block text-sm w-1/2 ">Cliente:</label>

                <div className="mt-1  w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                  <Select
                    placeholder="Seleccione cliente.."
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
              <div className="flex items-center lg:ml-20 ml-0">
                <label className="block text-sm w-1/2 ">Origen:</label>

                <div className="mt-1  w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                  <Select
                    placeholder="Seleccione origen/destino"
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
              <div className="flex items-center">
                <label className="block text-sm w-1/2 ">Cliente Destino:</label>
                <div className="mt-1  w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                  <Select
                    placeholder="Seleccione cliente"
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
              <div className="flex items-center lg:ml-20 ml-0">
                <label className="block text-sm w-1/2 ">Destino:</label>

                <div className="mt-1  w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                  <Select
                    placeholder="Seleccione origen/destino"
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
            </div>
            <div className="grid  grid-cols-1 lg:grid-cols-2 gap-1 gap-x-6 mb-4 lg:mr-20 mr-0 text-gray-600 ">
              <div className="flex items-center">
                <label className="block text-sm  w-1/2">Tracto:</label>

                <div className=" w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                  <Select
                    placeholder="Seleccione origen/destino"
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
              <div className="flex items-center lg:ml-20 ml-0">
                <label className="block text-sm  w-1/2">Carreta:</label>
                <div className=" w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                  <Select
                    placeholder="Seleccione origen/destino"
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
              <div className="flex items-center">
                <label className="block text-sm  w-1/2">Conductor:</label>
                <div className="mt-1  w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                  <Select
                    placeholder="Seleccione origen/destino"
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
            </div>
            <div className="INFOADICIONAL">
              <button
                type="text"
                onClick={OpenModalInfo}
                className="  w-full text-start border-gray-400 border rounded-md p-[6px] shadow border-b-blue-400 border-b-[3px] outline-none focus:ring-2"
              >
                Inf. Adicional
              </button>
              <div
                className={`transform origin-top transition-all  duration-300 ease-in-out overflow-hidden ${
                  openInfoAdicional
                    ? "scale-y-100 opacity-100 max-h-[1000px] "
                    : "scale-y-0 opacity-0 max-h-0 "
                }`}
              >
                <div className=" grid grid-cols-2 gap-1 gap-x-6 my-4 text-gray-600 border-b-2 pb-4">
                  <div className="flex items-center">
                    <label className="block text-sm  w-1/2">
                      Tip. Documento:
                    </label>

                    <div className=" w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                      <Select
                        placeholder="Seleccione tipo documento"
                        styles={customStyles}
                      ></Select>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="block text-sm  w-1/2">Serie:</label>
                    <div className=" w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                      <Select
                        placeholder="Ingresar serie"
                        styles={customStyles}
                      ></Select>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="block text-sm  w-1/2">Numero:</label>

                    <div className=" w-full rounded-md   outline-none  focus:ring-2  text-xs border border-gray-400">
                      <Select
                        placeholder="Ingresar numero"
                        styles={customStyles}
                      ></Select>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="block text-sm  w-1/2">Peso (Kg.):</label>
                    <input
                      type=""
                      className="mt-1  w-full rounded-md  shadow outline-none  focus:ring-2  text-xs p-[6px] border border-gray-400"
                    />
                  </div>
                </div>
                <div className=" grid grid-cols-2 gap-1 gap-x-6  text-gray-600 ">
                  <div className="flex items-center">
                    <label className="block text-sm  w-1/2">
                      Documento Ref.:
                    </label>
                    <input
                      placeholder="Ingresar doc. relacionado"
                      className="mt-1  w-full rounded-md  shadow outline-none  focus:ring-2  text-xs p-[6px] border border-gray-400"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="block text-sm  w-1/2">N° Pedido:</label>
                    <input
                      placeholder="Ingresar N° pedido"
                      className="mt-1 text-xs p-[6px] border border-gray-400 w-full rounded-md  shadow outline-none  focus:ring-2 "
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="block text-sm  w-1/2">Estado:</label>

                    <select className="mt-1  w-full rounded-md  shadow outline-none  focus:ring-2  text-xs p-[6px] border border-gray-400">
                      <option>Generado</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="block text-sm  w-1/2">Observacion:</label>
                    <textarea className="mt-1 text-xs p-[6px] min-h-7 h-7 overflow-y-hidden border border-gray-400 w-full rounded-md  shadow outline-none  focus:ring-2 "></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="BOTONES mt-4 flex justify-end  pb-4 ">
              <button className="flex text-sm items-center gap-x-2 px-6 py-2 active:scale-95 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mr-2 shadow-md ">
                <span className="text-[px]">
                  <IconoVolver />
                </span>
                VOLVER
              </button>

              <button className=" flex text-sm items-center gap-x-2 px-6 py-2 active:scale-95 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md">
                <span className="text-[20px]">
                  <IconoRegistrar />
                </span>
                REGISTRAR
              </button>
            </div>
            <div className="ITEMS rounded-lg  ">
              <h2 className="text-xl font-bold mb-5 text-blue-600 border-b-[3px] border-blue-500  pb-2 ">
                + Items
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-[1.5fr,1fr] gap-x-4">
                <div className="grid grid-cols-5 gap-x-4">
                  <input
                    type="search"
                    placeholder="DNI"
                    className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                  />
                  <input
                    type="date"
                    placeholder="Fecha de Inicio "
                    className="px-2 py-[6px] rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                  />
                  <input
                    type="text"
                    placeholder=""
                    className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                  />
                  <input
                    type="text"
                    placeholder=""
                    className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                  />
                  <input
                    type="number"
                    placeholder=""
                    className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                  />
                </div>
                <div className="w-full grid grid-cols-[3fr,1fr]">
                  <input
                    type="search"
                    placeholder=""
                    className="px-2 rounded-md outline-none  focus:ring-2  text-xs border border-gray-400 text-gray-400 "
                  />{" "}
                  <div className="mx-auto items-center flex gap-x-2 ">
                    <input type="checkbox" />
                    <span className="text-xs ">Adicionales </span>
                  </div>
                </div>
              </div>
              <div className="w-full mt-4  flex justify-around">
                <button className="flex active:scale-95 items-center  gap-x-2 px-14 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mr-2 shadow-md">
                  <span className="text-[23px]  ">
                    <IconoAgregar />
                  </span>
                  AGREGAR
                </button>
                <button className="flex active:scale-95 items-center  gap-x-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2 shadow-md">
                  <span className="text-[23px]  ">
                    <IconoAgregar />
                  </span>
                  Items
                </button>
              </div>
              <div className="TABLA">
                <table className="w-full mt-4 bg-slate-100  ">
                  <thead className="font-medium text-gray-600">
                    <tr className=" ">
                      <td className="ps-4 py-2 text-left"></td>
                      <td className="px-4 py-2 text-left">Item</td>
                      <td className="px-4 py-2 text-left">Cantidad</td>
                      <td className="px-4 py-2 text-left">Código Producto</td>
                      <td className="px-4 py-2 text-left">Código SUNAT</td>
                      <td className="px-4 py-2 text-left">Código Barras</td>
                      <td className="px-4 py-2 text-left">Unidad Medida</td>
                      <td className="px-4 py-2 text-left">Descripcion</td>
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
            {/* <div className="DETALLES mt-6">
              <div className="flex  justify-between">
                <div className="w-full">
                  <button className="flex active:scale-95 items-center  gap-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2 shadow-md">
                    <span className="text-[23px]  ">
                      <IconoAgregar />
                    </span>
                    AGREGAR DETALLE
                  </button>
                </div>
                <div className="  w-full  ">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full pl-10 ps-2 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <table className="w-full mt-4 bg-slate-100 rounded-xl ">
                <thead className="">
                  <tr className=" ">
                    <th className="px-4 py-2 text-left">Opc.</th>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-left">Descripción</th>
                  </tr>
                </thead>
                <tbody className="w-full mt-4 ">
                  <tr className="border-b bg-white  ">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
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
                    <td className=" px-4 py-2 text-sm">1</td>
                    <td className=" px-4 py-2 text-gray-500">
                      segun documentos relacionados
                    </td>
                  </tr>
                  <tr className="border-b bg-white  ">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
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
                    <td className=" px-4 py-2 text-sm">2</td>
                    <td className=" px-4 py-2 text-gray-500">
                      segun documentos relacionados
                    </td>
                  </tr>
                  <tr className="border-b bg-white  ">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
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
                    <td className=" px-4 py-2 text-sm">3</td>
                    <td className=" px-4 py-2 text-gray-500">
                      segun documentos relacionados
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        </>
      }
    ></Home>
  );
};

export default HomeGuiasTrans;

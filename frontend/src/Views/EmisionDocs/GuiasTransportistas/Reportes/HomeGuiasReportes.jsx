import React from "react";
import Home from "../../../../Layout/Home";
import NavBarGuias2 from "../Components/NavBarGuias2";
import {
  IconoFolder,
  IconoAgregar,
  IconoLupa1,
  IconoPDF,
} from "../../../../Iconos/Iconos-NavBar";
const HomeGuiasReportes = () => {
  return (
    <Home
      children1={<NavBarGuias2 />}
      children2={
        <>
          {" "}
          <div className=" mx-auto p-6  bg-white shadow-md rounded-xl">
            <h2 className="text-xl font-bold  text-blue-600 border-b-[3px] border-blue-500 pb-2 ">
              + Explorardor de Guia de Remision
            </h2>
            <div className="grid grid-cols-[1.5fr,1fr]  text-gray-600  border-b-2 py-4 ">
              <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-1 gap-x-6  text-gray-600 ">
                <div className="flex items-center">
                  <label className="block text-sm  w-1/2">Colummna:</label>
                  <select className="mt-1  w-full rounded-md  shadow outline-none  focus:ring-2  text-xs p-[6px] border border-gray-400">
                    <option>GRT - Guía de Remisión - Transportista</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="block text-sm w-1/2 ">Fecha Desde:</label>

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
                  <label className="block text-sm w-1/2 ">Fecha Hasta:</label>

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
        </>
      }
    ></Home>
  );
};

export default HomeGuiasReportes;

import React from "react";
import { TipoTarifarios } from "../Data/TiposTarifario";
import { Link } from "react-router-dom";
function ElegirTarifario({ seleccionarTarifa }) {
  const handleSeleccionarTarifario = (tarifario) => {
    seleccionarTarifa(tarifario);
  };

  return (
    <>
      <div className="relative">
        <div className="z-10 absolute  top-50 ml-2 text-left mt-1 bg-slate-100 rounded-lg shadow w-[13.8rem] ">
          <ul className="p-3 overflow-y-auto text-sm text-gray-600 flex flex-col ">
            {TipoTarifarios.map((tarifario, index) => (
              <li key={index}>
                <div className="   rounded hover:bg-gray-200">
                  <div
                    onClick={() => handleSeleccionarTarifario(tarifario)}
                    className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded cursor-pointer"
                  >
                    <Link>{tarifario}</Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ElegirTarifario;
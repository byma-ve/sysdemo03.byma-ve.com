import React, { useState } from "react";
import {
  IconoCerrar,
  IconoCerrarSesion,
} from "../../../../Iconos/Iconos-NavBar";
import Select from "react-select";

const ModalUbigeo = ({ isOpen, onClose, children }) => {
  const DepartamentosPeru = [
    { label: "Amazonas", value: "Amazonas" },
    { label: "Áncash", value: "Áncash" },
    { label: "Apurímac", value: "Apurímac" },
    { label: "Arequipa", value: "Arequipa" },
    { label: "Ayacucho", value: "Ayacucho" },
    { label: "Cajamarca", value: "Cajamarca" },
    { label: "Callao", value: "Callao" },
    { label: "Cusco", value: "Cusco" },
    { label: "Huancavelica", value: "Huancavelica" },
    { label: "Huánuco", value: "Huánuco" },
    { label: "Ica", value: "Ica" },
    { label: "Junín", value: "Junín" },
    { label: "La Libertad", value: "La Libertad" },
    { label: "Lambayeque", value: "Lambayeque" },
    { label: "Lima", value: "Lima" },
    { label: "Loreto", value: "Loreto" },
    { label: "Madre de Dios", value: "Madre de Dios" },
    { label: "Moquegua", value: "Moquegua" },
    { label: "Pasco", value: "Pasco" },
    { label: "Piura", value: "Piura" },
    { label: "Puno", value: "Puno" },
    { label: "San Martín", value: "San Martín" },
    { label: "Tacna", value: "Tacna" },
    { label: "Tumbes", value: "Tumbes" },
    { label: "Ucayali", value: "Ucayali" },
  ];

  const ProvinciasLima = [
    { label: "Barranca", value: "Barranca" },
    { label: "Cajatambo", value: "Cajatambo" },
    { label: "Canta", value: "Canta" },
    { label: "Cañete", value: "Cañete" },
    { label: "Huaral", value: "Huaral" },
    { label: "Huarochirí", value: "Huarochirí" },
    { label: "Huaura", value: "Huaura" },
    { label: "Lima", value: "Lima" },
    { label: "Oyón", value: "Oyón" },
    { label: "Yauyos", value: "Yauyos" },
  ];

  const DistritosLima = [
    { label: "Lima", value: "Lima" },
    { label: "Ancón", value: "Ancón" },
    { label: "Ate", value: "Ate" },
    { label: "Barranco", value: "Barranco" },
    { label: "Breña", value: "Breña" },
    { label: "Carabayllo", value: "Carabayllo" },
    { label: "Chaclacayo", value: "Chaclacayo" },
    { label: "Chorrillos", value: "Chorrillos" },
    { label: "Cieneguilla", value: "Cieneguilla" },
    { label: "Comas", value: "Comas" },
    { label: "El Agustino", value: "El Agustino" },
    { label: "Independencia", value: "Independencia" },
    { label: "Jesús María", value: "Jesús María" },
    { label: "La Molina", value: "La Molina" },
    { label: "La Victoria", value: "La Victoria" },
    { label: "Lince", value: "Lince" },
    { label: "Los Olivos", value: "Los Olivos" },
    { label: "Lurigancho-Chosica", value: "Lurigancho-Chosica" },
    { label: "Lurín", value: "Lurín" },
    { label: "Magdalena del Mar", value: "Magdalena del Mar" },
    { label: "Miraflores", value: "Miraflores" },
    { label: "Pachacamac", value: "Pachacamac" },
    { label: "Pucusana", value: "Pucusana" },
    { label: "Pueblo Libre", value: "Pueblo Libre" },
    { label: "Puente Piedra", value: "Puente Piedra" },
    { label: "Punta Hermosa", value: "Punta Hermosa" },
    { label: "Punta Negra", value: "Punta Negra" },
    { label: "Rímac", value: "Rímac" },
    { label: "San Bartolo", value: "San Bartolo" },
    { label: "San Borja", value: "San Borja" },
    { label: "San Isidro", value: "San Isidro" },
    { label: "San Juan de Lurigancho", value: "San Juan de Lurigancho" },
    { label: "San Juan de Miraflores", value: "San Juan de Miraflores" },
    { label: "San Luis", value: "San Luis" },
    { label: "San Martín de Porres", value: "San Martín de Porres" },
    { label: "San Miguel", value: "San Miguel" },
    { label: "Santa Anita", value: "Santa Anita" },
    { label: "Santa María del Mar", value: "Santa María del Mar" },
    { label: "Santa Rosa", value: "Santa Rosa" },
    { label: "Santiago de Surco", value: "Santiago de Surco" },
    { label: "Surquillo", value: "Surquillo" },
    { label: "Villa El Salvador", value: "Villa El Salvador" },
    { label: "Villa María del Triunfo", value: "Villa María del Triunfo" },
  ];

  
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
      {/* Capa de fondo oscuro */}
      <div
        className={`fixed inset-0  bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed inset-0 z-50  flex items-center justify-center transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-white  rounded-lg shadow-lg   w-[50%]  mx-4  transform transition-all duration-300 ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="side-cont-titulo  text-[22px] px-5 py-2 rounded-t-md bg-blue-400 w-full font-semibold text-white">
            <h1 className="side-txt">Ubigeo</h1>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-3  gap-4">
              <div className="whitespace-nowrap space-y-2 ">
                <label htmlFor="">Seleccionar Departamento </label>
                <div className="border border-gray-500 rounded-md">
                  <Select
                    options={DepartamentosPeru}
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
              <div className="whitespace-nowrap space-y-2 ">
                <label htmlFor="">Seleccionar Provincia </label>
                <div className="border border-gray-500 rounded-md">
                  <Select
                    options={ProvinciasLima}
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
              <div className="whitespace-nowrap space-y-2 ">
                <label htmlFor="">Seleccionar Distrito </label>
                <div className="border border-gray-500 rounded-md">
                  <Select
                    options={DistritosLima}
                    styles={customStyles}
                  ></Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={onClose}
                className="text-white bg-gradient-to-t from-gray-400 via-gray-500 to-gray-500 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-gray-300  rounded-lg text-sm text-center font-medium px-5 py-2.5 "
              >
                Cancelar
              </button>
              <button
                onClick={onClose}
                className="text-white bg-gradient-to-t from-blue-400 via-blue-500 to-blue-500 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  rounded-lg text-sm text-center font-medium px-5 py-2.5 "
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUbigeo;

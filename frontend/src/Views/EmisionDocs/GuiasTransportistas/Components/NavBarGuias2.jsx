import React from "react";
import { Link } from "react-router-dom";

const NavBarGuias2 = () => {
  return (
    <>
      <div className="cont-navbar relative  mb-3 bg-white rounded-2xl h-[60px] z-0">
        <div className="navbar w-full  text-black p-4 text-center">
          <ul class="flex flex-wrap  w-full  justify-around text-lg font-medium text-gray-700 gap-x-10 mb-4 lg:mb-0">
            <li class="group hover:scale-110 transition-transform duration-300">
              <Link
                to="/home-emisiondocumentos"
                className="elmnts relative text-[15px] font-semibold no-underline transition-all  overflow-hidden pb-1 hover:text-blue-500 "
              >
                Emisiones
                <span class="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>
            <li class="group hover:scale-110 transition-transform duration-300">
              <Link
                to="/home-emisionreportes"
                className="elmnts relative text-[15px] font-semibold no-underline transition-all  overflow-hidden pb-1 hover:text-blue-500"
              >
                Reportes
                <span class="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBarGuias2;

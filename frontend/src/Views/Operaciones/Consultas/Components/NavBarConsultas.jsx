import { IconoOjito2 } from "../../../../Iconos/Iconos-NavBar";

const NavBarConsultas = ({ informacionInstancia }) => {
  return (
    <>
      <div className="bg-white rounded-xl">
        <div className=" rounded-xl bg-white ">
          <table className="w-[100%] table-fixed text-sm   text-gray-500 dark:text-gray-400">
            <thead className="text-left text-md  border-b border-gray-300 text-white  whitespace-nowrap block ">
              <tr className="full bg-blue-400  h-full grid rounded-t-xl grid-cols-5 text-left  justify-between p-3  font-semibold">
                <td className=" mx-20  text-[15px] font-semibold w-1/6">
                  Instancias
                </td>
                <td className="  text-[15px] font-semiboldw-1/6">
                  Estado Mercancia
                </td>
                <td className="  text-[15px] font-semibold w-1/6">
                  Fecha Estado
                </td>
                <td className="  text-[15px] font-semibold w-1/6">
                  Comentario
                </td>
                <td className=" flex place-content-center ml-3 gap-0 relative text-[15px] text-center font-semibold  mx-10 ">
                  Imagen
                </td>
              </tr>
            </thead>
            <tbody className="text-left text-[#535c69]  block">
              <tr className="full h-full grid rounded-t-xl grid-cols-5 text-left  justify-between px-3 py-5  font-semibold">
                <td className=" mx-20 relative text-[15px] font-semibold     ">
                  {informacionInstancia.instancia
                    ? informacionInstancia.instancia.toUpperCase()
                    : ""}
                </td>
                <td className=" relative text-[15px] font-semibold     ">
                  {informacionInstancia.estado_mercancia
                    ? informacionInstancia.estado_mercancia.toUpperCase()
                    : ""}
                </td>
                <td className=" relative text-[15px] font-semibold     ">
                  {informacionInstancia.fecha_estado
                    ? informacionInstancia.fecha_estado
                    : ""}
                </td>
                <td className=" relative text-[15px] font-semibold      ">
                  {informacionInstancia.comentario
                    ? informacionInstancia.comentario.toUpperCase()
                    : ""}
                </td>
                <td className=" flex place-content-center ml-3 gap-0 relative text-[15px] text-center font-semibold  mx-10  ">
                  {informacionInstancia?.imagen_1 && (
                    <>
                      <a href={informacionInstancia.imagen_1} target="_blank">
                        <IconoOjito2 className="mx-1" />
                      </a>
                    </>
                  )}
                  {informacionInstancia?.imagen_2 && (
                    <>
                      <a href={informacionInstancia.imagen_2} target="_blank">
                        <IconoOjito2 className="mx-1" />
                      </a>
                    </>
                  )}
                  {informacionInstancia?.imagen_3 && (
                    <>
                      <a href={informacionInstancia.imagen_3} target="_blank">
                        <IconoOjito2 className="mx-1" />
                      </a>
                    </>
                  )}
                  {informacionInstancia?.imagen_4 && (
                    <>
                      <a href={informacionInstancia.imagen_4} target="_blank">
                        <IconoOjito2 className="mx-1" />
                      </a>
                    </>
                  )}
                  {informacionInstancia?.imagen_5 && (
                    <>
                      <a href={informacionInstancia.imagen_5} target="_blank">
                        <IconoOjito2 className="mx-1" />
                      </a>
                    </>
                  )}
                  {informacionInstancia?.imagen_6 && (
                    <>
                      <a href={informacionInstancia.imagen_6} target="_blank">
                        <IconoOjito2 className="mx-1" />
                      </a>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NavBarConsultas;

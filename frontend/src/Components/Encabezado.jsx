import { useState, useEffect, useContext } from "react";
import LogoBlanco from "../Static/Img_Pred/Logo.webp";
import { IconoAlerta } from "../Iconos/Iconos-NavBar";
import { useNavigate } from "react-router-dom";
import { Notificaciones } from "./Notificaciones";
import { UserContext } from "../Context/UserContext";
import { IconoCerrarSesion } from "../Iconos/Iconos-NavBar";

function Encabezado() {
  const [modalNotificaciones, setModalNotificaciones] = useState(false);

  // Llamo a mi context de usuario para acceder a mis datos
  const { userData, hora } = useContext(UserContext);

  // Funcionalidad del Modal de Notificaciones
  const mostrarModalNotificaciones = () => {
    setModalNotificaciones(true);
  };

  const naviget = useNavigate();

  function logoutSubmit() {
    fetch(
      `https://localhost/BackendApiRest/Administracion/Usuario/estadoDesconectado.php?id=${encodeURIComponent(
        localStorage.getItem("id_usuario")
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el estado desconectado");
        }
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });

    localStorage.removeItem("login");
    localStorage.setItem("loginStatus", "¡Cerró sesión exitosamente!");
    naviget("/");
  }

  useEffect(() => {
    if (localStorage.getItem("id_usuario")) {
      fetch(
        `https://localhost/BackendApiRest/Administracion/Usuario/estadoConectado.php?id=${encodeURIComponent(
          localStorage.getItem("id_usuario")
        )}`
      )
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {
          console.error("Error al obtener datos del usuario:", error);
        });
    }
  }, [localStorage.getItem("id_usuario")]);

  const [conteoNotifiaciones, setConteoNotifiaciones] = useState("");

  const cargarConteoNotificaciones = async () => {
    try {
      const response = await fetch(
        `https://localhost/BackendApiRest/Notificaciones/obtenerConteoNotificaciones.php?id_usuario=${encodeURIComponent(
          localStorage.getItem("id_usuario")
        )}`
      );
      const data = await response.json();
      setConteoNotifiaciones(data);
    } catch (error) {
      console.error(
        "Error al obtener conteo de notificaciones del usuario:",
        error
      );
    }
  };

  return (
    <>
      <div className="encabezado-cont   relative flex justify-between items-center w-full  pl-[72px] ">
        <div className="encabezado relative grid grid-cols-[2fr,1fr,2fr] items-center h-[63px] w-full ">
          <div className="cont-logo   w-[154px]  ">
            <img
              src={LogoBlanco}
              alt="Byma-Ve"
              className="logo w-full h-full "
            />
          </div>
          <div className="  text-center cont-logo">
            <button className=" Reloj   items-center cursor-default">
              <span className="hora w-full text-3xl text-white">{hora}</span>
            </button>
          </div>
          <div className="flex   items-center cont-logo">
            <div className="FotoyUsuario relative h-full flex justify-end  items-center bg-transparent border-none rounded-xl   w-full  z-10 ">
              <div className="w-[12%] max-w-[8%] mr-2 cont-logo">
                {userData && (
                  <img
                    src={`https://images.weserv.nl/?url=${userData.foto_usuario}`}
                    alt={userData.colaborador_usuario}
                    className="logo2 rounded-[80%]"
                  />
                )}
              </div>
              {userData && (
                <span className="nombre text-white text-[20px] mr-10  p-[4px_0]  whitespace-nowrap">
                  {userData.colaborador_usuario}
                </span>
              )}
            </div>
            <button
              onClick={mostrarModalNotificaciones}
              className="tema flex text-white text-[30px] mr-10 "
              style={{ animation: "moveAndRotateNotification 1.3s infinite" }}
            >
              <IconoAlerta />
              <span className="bg-red-500 rounded-[100%] text-xs absolute ml-5 px-[2px] pr-[3.5px]">
                {conteoNotifiaciones.conteo_notis
                  ? conteoNotifiaciones.conteo_notis
                  : ""}
              </span>
            </button>
            <button
              onClick={logoutSubmit}
              className="flex text-center text-white items-center gap-2 mr-[7%] px-4 hover:bg-opacity-20 hover:bg-neutral-100 rounded-lg "
            >
              <IconoCerrarSesion />
              <p>Salir</p>
            </button>
          </div>
        </div>
      </div>

      <Notificaciones
        cargarConteoNotificaciones={cargarConteoNotificaciones}
        modalNotificaciones={modalNotificaciones}
        setModalNotificaciones={setModalNotificaciones}
      />
    </>
  );
}

export default Encabezado;

import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Product = ({
  tipo,
  datosjuego,
  idpais,
  cambiacarro,
  listapaquetesp,
  listapaises,
}) => {
  const [asignacion, setAsignacion] = useState([]);
  const [paquetes, setPaquetes] = useState([]);

  const actualizacarro = (mensaje) => {
    cambiacarro(mensaje);
  };

  const getpaquetes = () => {
    axios.get(`../api/paquetes/${datosjuego.id}`).then((response) => {
      setPaquetes(response.data);
    });
  }; //LISTO

  const msjsave = (mensajesave, tipodemensaje) => {
    if (tipodemensaje == "save") {
      toast.success(mensajesave, {});
    }
    if (tipodemensaje == "error") {
      toast.error(mensajesave, {});
    }
    if (tipodemensaje == "warning") {
      toast.warning(mensajesave, {});
    }
    if (tipodemensaje == "info") {
      toast.info(mensajesave, {});
    }
  };

  const obtenerprecio = (id) => {
    for (let i = 0; i < listapaquetesp.length; i++) {
      if (listapaquetesp[i].idp === parseInt(id)) {
        return listapaquetesp[i].preciov;
      }
    }
  };

  const obtenerpaquete = (id, tipo) => {
    for (let i = 0; i < paquetes.length; i++) {
      if (paquetes[i].id === parseInt(id)) {
        if (tipo === "nombre") {
          return paquetes[i].nombre;
        }
      }
    }
  };

  const obtenerpais = (id, tipo) => {
    for (let i = 0; i < listapaises.length; i++) {
      if (listapaises[i].id === parseInt(id)) {
        if (tipo === "abreviacion") {
          return listapaises[i].abreviacion;
        }
      }
    }
  };

  const agregaralcarrito = () => {
    var idpaquete = document.getElementById("paquetesjuegos").value;

    var precio = obtenerprecio(idpaquete);
    var nombre = obtenerpaquete(idpaquete, "nombre");
    var datos_id = document.getElementById("datos_id").value;
    var datos_email = document.getElementById("datos_email").value;

    if (datos_id === "") {
      msjsave("Debes ingresar tu ID", "warning");
      return null;
    }
    if (datos_email === "") {
      msjsave("Debes Ingresar tu Email", "warning");
      return null;
    }

    if (localStorage.getItem("powercarrito" + idpais) !== null) {
      var carrito = JSON.parse(localStorage.getItem("powercarrito" + idpais));
    } else {
      var carrito = [];
      localStorage.setItem("powercarrito" + idpais, JSON.stringify([]));
    }

    carrito.push({
      idp: idpaquete,
      precio: precio,
      precioc: 0,
      nombre: nombre,
      datos_id: datos_id,
      datos_email: datos_email,
      abreviacion: obtenerpais(idpais, "abreviacion"),
    });

    localStorage.setItem("powercarrito" + idpais, JSON.stringify(carrito));
    document.getElementById("botonagregar").className =
      "text-white mt-2 bg-[#000] hover:bg-[#000]/90 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center me-2 mb-2";
    document.getElementById("botonagregar").innerHTML =
      '<svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/></svg>Agregado';
    document.getElementById("botonagregar").disabled = true;
    console.log(idpaquete);
    console.log(precio);
    console.log(nombre);
    console.log(datos_id);
    console.log(datos_email);
    actualizacarro("NUEVO MENSAJE");
  };

  const vercarrito = () => {
    window.location = "/checkout";
  };

  const actualizarboton = () => {
    document.getElementById("botonagregar").className =
      "text-white mt-2 bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center me-2 mb-2";
    document.getElementById("botonagregar").innerHTML =
      '<svg class="w-6 h-6 text-white aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"/></svg>Agregar';
    document.getElementById("botonagregar").disabled = false;
  };

  useEffect(() => {
    getpaquetes();
  }, [datosjuego]);

  useEffect(() => {
    actualizacarro("mensaje");
  }, [idpais]);

  return (
    <>
      <div className="h-14 bg-gray-800 shadow-2xl font-bold text-md pt-[15px] text-white shadow-blue-600">
        <span className="ml-12 max-md:ml-4 max-md:text-lg">
          <span className=" text-blue-400">{datosjuego.nombre}</span>
        </span>
      </div>
      <div align="center">
        <div className="grid grid-cols-2 gap-2 max-md:flex max-md:flex-row max-md:flex-wrap">
          <div className="bg-gradient-to-tr from-white to-blue-400 max-md:w-full max-md:m-4 max-md:ml-4 rounded-md m-4  ml-12 w-[90%]">
            <img
              src={datosjuego.ruta}
              alt=""
              className="w-full rounded-t-md h-[270px]"
            />
            <div className="m-4" align="justify">
              {datosjuego.descripcion}
            </div>
          </div>
          <div className="m-4 ml-12 max-md:ml-4">
            <div className="bg-gradient-to-tr from-white to-blue-400  rounded-md">
              <div className=" bg-gradient-to-tr from-blue-950 to-purple-600 h-12 pt-2 rounded-t-md">
                <span className="ml-4 mt-2  text-xl text-white text-center acme-regular">
                  Informaci&oacute;n de Cuenta
                </span>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-2 max-md:flex max-md:flex-row max-md:flex-wrap m-4">
                  <div className="w-full">
                    <div className="flex flex-row">
                      <label
                        for="helper-text"
                        class="block mb-2 text-sm font-medium text-black"
                      >
                        ID:
                      </label>
                      <svg
                        class="w-6 h-6 text-gray-800 ml-1 mt-[-4px]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="datos_id"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row">
                      <label
                        for="helper-text"
                        class="block mb-2 text-sm font-medium text-black"
                      >
                        Correo:
                      </label>
                    </div>
                    <input
                      type="email"
                      id="datos_email"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              <br />
            </div>
            <div className="bg-gradient-to-tr from-white to-blue-400  rounded-md mt-4">
              <div className=" bg-gradient-to-tr from-blue-950 to-purple-600 h-12 pt-2 rounded-t-md">
                <span className="ml-4 mt-2  text-xl text-white text-center acme-regular">
                  Seleccione Un Paquete
                </span>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-2 max-md:flex max-md:flex-row max-md:flex-wrap m-4">
                  <div className="w-full">
                    <div className="flex flex-row">
                      <label
                        for="helper-text"
                        class="block mb-2 text-sm font-medium text-black"
                      >
                        Lista de Paquetes
                      </label>
                    </div>
                    <select
                      id="paquetesjuegos"
                      onChange={() => {
                        actualizarboton();
                      }}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {paquetes.map((val, key) => {
                        return (
                          <option key={key} value={val.id}>
                            {val.nombre} (Costo: {obtenerprecio(val.id)}Bs)
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className=" flex flex-row place-content-end mt-5">
                    <button
                      type="button"
                      id="botonagregar"
                      onClick={() => {
                        agregaralcarrito();
                      }}
                      class="text-white mt-2 bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center me-2 mb-2"
                    >
                      <svg
                        class="w-6 h-6 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                        />
                      </svg>
                      Agregar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        vercarrito();
                      }}
                      class="text-white mt-2 bg-[#1b8a3b] hover:bg-[#24b84e]/90 focus:ring-4 focus:outline-none focus:ring-[#1b8a3b]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#24b84e]/55 me-2 mb-2"
                    >
                      <svg
                        class="w-6 h-6 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M5 14a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Procesar
                    </button>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Product;

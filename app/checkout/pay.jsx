import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { uploadFile } from "../firebase/db";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pay = ({
  listacarrito,
  cambiacarro,
  paisactual,
  listajuegos,
  paquetes,
}) => {
  const [file, setFile] = useState(null);
  const [rutajuego, setRutajuego] = useState("");
  const [orden, setOrden] = useState("");
  const [listabancos, setListabancos] = useState([]);
  const [compras, setCompras] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [cuenta, setCuenta] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [estatus, setEstatus] = useState("Pendiente");

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

  const actualizacarro = (mensaje) => {
    cambiacarro(mensaje);
  };

  const subirarchivo = async (e) => {
    if (file) {
      try {
        const valornuevo = orden;
        const result = await uploadFile(file, valornuevo);
        console.log(result);
        setRutajuego(result);
        localStorage.setItem("powercapture" + paisactual, result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const obtenertotal = () => {
    var total = 0;

    for (let i = 0; i < listacarrito.length; i++) {
      if (listacarrito[i].precio === undefined) {
      } else {
        total = parseFloat(total) + parseFloat(listacarrito[i].precio);
      }
    }
    return total.toFixed(2);
  };

  const obtenerjuego = (id, tipo) => {
    console.log(id);
    for (let i = 0; i < listajuegos.length; i++) {
      if (listajuegos[i].id === id) {
        if (tipo === "nombre") {
          return listajuegos[i].nombre;
        }
        if (tipo === "ruta") {
          return listajuegos[i].ruta;
        }
      }
    }
  };

  const obtenerpaquete = (id, tipo) => {
    console.log(id);
    for (let i = 0; i < paquetes.length; i++) {
      if (parseInt(paquetes[i].id) === parseInt(id)) {
        if (tipo === "idj") {
          return paquetes[i].idj;
        }
      }
    }
  };

  const eliminararticulo = (id) => {
    console.log(id);

    swal({
      title: "Eliminar Articulo?",
      text: "Desea eliminar este articulo del Carrito?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        listacarrito.splice(id, 1);
        localStorage.setItem(
          "powercarrito" + paisactual,
          JSON.stringify(listacarrito)
        );
        actualizacarro("mensaje");
        swal("Eliminado!", "Lista Actualizada!", "success");
      }
    });
  };

  const chequeararchivo = () => {
    if (localStorage.getItem("powercapture" + paisactual) !== null) {
      var carrito2 = localStorage.getItem("powercapture" + paisactual);
      setRutajuego(carrito2);
    } else {
      localStorage.setItem("powercapture" + paisactual, "");
      setRutajuego(""); // crea la variable con un valor predeterminado
    }

    var numeroAleatorio =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    var fecha = new Date();
    var diasSemana = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
    var diaSemana = diasSemana[fecha.getDay()];

    if (localStorage.getItem("powerorden" + paisactual) !== null) {
      var carrito2 = localStorage.getItem("powerorden" + paisactual);
      setOrden(carrito2);
    } else {
      localStorage.setItem(
        "powerorden" + paisactual,
        "O" + numeroAleatorio + diaSemana
      );
      setOrden("O" + numeroAleatorio + diaSemana); // crea la variable con un valor predeterminado
    }

    if (localStorage.getItem("powercompra" + paisactual) !== null) {
      var carrito2 = JSON.parse(
        localStorage.getItem("powercompra" + paisactual)
      );
      setCompras(carrito2);
    } else {
      localStorage.setItem("powercompra" + paisactual, JSON.stringify([]));
      setCompras([]); // crea la variable con un valor predeterminado
    }

    if (localStorage.getItem("powerdetalles" + paisactual) !== null) {
      var carrito2 = JSON.parse(
        localStorage.getItem("powerdetalles" + paisactual)
      );
      setDetalles(carrito2);
    } else {
      localStorage.setItem("powerdetalles" + paisactual, JSON.stringify([]));
      setDetalles([]); // crea la variable con un valor predeterminado
    }
  };

  const getbancos = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/bancos/`)
      .then((response) => {
        setListabancos(response.data);
      });
  };

  const obtenercuenta = (id, tipo) => {
    for (let i = 0; i < listabancos.length; i++) {
      if (listabancos[i].id == id) {
        if (tipo === "cuenta") {
          return listabancos[i].cuenta;
        }
        if (tipo === "nombre") {
          return listabancos[i].nombre;
        }
        if (tipo === "tipo") {
          return listabancos[i].tipo;
        }
      }
    }
    return "S/N";
  };

  const cargarcuenta = () => {
    for (let i = 0; i < listabancos.length; i++) {
      if (listabancos[i].idp == paisactual) {
        setCuenta(listabancos[i].id);
        return null;
      }
    }
    setCuenta(0);
  };

  const obtenerfechaactual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();

    const fechaFormateada = `${año}-${mes.toString().padStart(2, "0")}-${dia
      .toString()
      .padStart(2, "0")}`;

    return fechaFormateada; // Output: la fecha actual en formato dd-mm-yyyy
  };

  const procesarpago = async () => {
    var referencia = document.getElementById("datos_referencia").value;
    //  if (nombrebanco == "Ninguno") {
    //    msjsave("Seleccione un Banco o Metodo de Pago", "error");
    //    error = 1;
    //  }
    //  if (referencia == 0) {
    //    msjsave("Ingrese una Referencia", "error");
    //    error = 1;
    //  }
    //  if (errorreferencia == true) {
    //    msjsave("La referencia que intenta agregar esta registrada", "error");
    //    error = 1;
    //  }

    if (rutajuego === "") {
      msjsave("Debes agregar tu capture o Comprobante de Pago", "warning");
      return;
    }

    if (referencia === "") {
      msjsave("Debes colocar el Numero de Referencia", "warning");
      return;
    }

    if (listacarrito.length === 0) {
      msjsave("Debes Agregar productos a tu carrito", "warning");
      return;
    }

    var listatemporal = listacarrito;
    var ruta = rutajuego;
    var total = obtenertotal();
    var fecha = obtenerfechaactual();
    var telefono = "584126515046";
    var estatus = "Pendiente";
    var data = {
      referencia,
      total,
      fecha,
      telefono,
      estatus,
      listatemporal,
      ruta,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_KEY}/api/factura`,
      data
    );

    if (res.request.status === 200) {
      //getTemporal();
      msjsave(
        "Compra realizada con exito, estaremos procesando su pedido",
        "save"
      );
      var orden = res.data.id;
      var compra = [
        {
          id: orden,
          fecha: fecha,
          ruta: ruta,
          total: total,
          referencia: referencia,
          estatus: "Pendiente",
        },
      ];
      localStorage.setItem("powercompra" + paisactual, JSON.stringify(compra));
      localStorage.setItem("powercompra" + paisactual, JSON.stringify(compra));
      localStorage.setItem(
        "powerdetalles" + paisactual,
        JSON.stringify(listatemporal)
      );
      localStorage.setItem("powercarrito" + paisactual, JSON.stringify([]));
      actualizacarro("mensaje");
      setCompras(compra);
      localStorage.removeItem("powerorden" + paisactual);
      localStorage.removeItem("powercapture" + paisactual);

      chequeararchivo();
      copiarfactura(compra, listatemporal);
    }
  };

  const obtenerestatus = async (id) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_KEY}/api/estatus/${id}`
    );
    console.log(res.data[0].estatus);
    if (res.data[0].estatus === undefined) {
      setEstatus("Pendiente");
    } else {
      setEstatus(res.data[0].estatus);
    }
  };

  const copiarfactura = async (compras2, detalles2) => {
    if (compras2.length === 0) {
      return;
    } else {
      var total = compras2[0].total;
      var fecha = compras2[0].fecha;
    }

    var encabezado1 =
      "%2ATOP%20POWER%20GAMERS%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A" +
      "COMPRA--->%0A%2AFecha%3A%2A%20" +
      fecha +
      "%0A%2AFactura%3A%2A%20" +
      compras2[0].id +
      "%0A%2AReferencia%3A%2A%20" +
      compras2[0].referencia;

    var detalles1 =
      "%0A%2AProducto%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A";
    for (var i = 0; i < detalles2.length; i++) {
      detalles1 +=
        "_" +
        detalles2[i].nombre +
        "_%20---%3E%20" +
        detalles2[i].abreviacion +
        "%20" +
        detalles2[i].precio +
        "%0A";
    }
    detalles1 +=
      "%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A_%2ATOTAL%20A%20PAGAR%3A%20" +
      "%20" +
      total +
      "%2A_%0A%0AGracias%20por%20Preferirnos..%F0%9F%A4%9D";
    var text = encabezado1 + detalles1;
    text = text.replace(/\s+/g, "%20");
    const decodeurl = decodeURIComponent(text);
    await navigator.clipboard.writeText(decodeurl);

    window.location = "https://wa.me/584126515046?text=" + text;
    //msjsave("COPIADO CON EXITO", "save");
  };

  useEffect(() => {
    getbancos();
  }, []);

  useEffect(() => {
    console.log(paquetes);
  }, [paquetes]);

  useEffect(() => {
    chequeararchivo();
  }, [listajuegos]);

  useEffect(() => {
    chequeararchivo();
    cargarcuenta();
  }, [paisactual]);

  useEffect(() => {
    cargarcuenta();
  }, [listabancos]);

  useEffect(() => {
    subirarchivo();
  }, [file]);

  useEffect(() => {
    console.log(rutajuego);
  }, [rutajuego]);

  useEffect(() => {
    if (compras.length === 0) {
    } else {
      obtenerestatus(compras[0].id);
    }
  }, [compras]);

  return (
    <>
      <div className="h-14 bg-gray-800 shadow-2xl font-bold text-md pt-[15px] text-white shadow-blue-600">
        <span className="ml-12 max-md:ml-4 max-md:text-lg">
          <span className=" text-blue-400 flex flex-row mt-[-30px] ml-12">
            <svg
              class="w-[36px] h-[36px] text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="mt-[10px]">PROCESAR COMPRA</span>
          </span>
        </span>
      </div>
      <div align="center">
        <div className="grid grid-cols-2 gap-2 max-md:flex max-md:flex-row max-md:flex-wrap">
          <div className="bg-gradient-to-tr h-[300px] max:md:h-full from-white to-blue-400 max-md:w-full max-md:m-4 max-md:ml-4 rounded-md m-4  ml-12 w-[90%]">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/protemplo-e8571.appspot.com/o/V111.png?alt=media&token=359fc58d-5e12-452a-8e50-e3979ba36726"
              alt=""
              className="w-full rounded-t-md h-[150px]"
            />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    colSpan="4"
                    scope="col"
                    className="px-6 py-3 bg-blue-950 text-white text-right"
                  >
                    Ultima Compra realizada
                  </th>
                </tr>

                <tr>
                  <th scope="col" className="px-6 py-3">
                    #Orden
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Estatus
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Precio
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compras.map((val, key) => {
                  return (
                    <tr
                      key={key}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {val.id}
                      </th>
                      {estatus === "Confirmado" ? (
                        <td className="px-6 py-4 flex flex-col text-green-700 font-bold">
                          Confirmado
                        </td>
                      ) : (
                        <td className="px-6 py-4 flex flex-col text-yellow-400 font-bold">
                          Pendiente
                        </td>
                      )}

                      <td className="px-6 py-4 text-center  font-sm">
                        {val.total}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <svg
                          class="w-6 h-6 cursor-pointer hover:text-blue-500 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          onClick={() => {
                            setShowModal(true);
                          }}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="m-4 ml-12 max-md:ml-4">
            <div className="bg-gradient-to-tr from-white to-blue-400  rounded-md">
              <div className=" bg-gradient-to-tr from-blue-950 to-purple-600 h-12 pt-2 rounded-t-md">
                <span className="ml-4 mt-2  text-xl text-white text-center acme-regular">
                  Lista de Articulos
                </span>
              </div>
              <div>
                <div className="flex flex-row max-md:flex max-md:flex-row max-md:flex-wrap">
                  <div className="w-full">
                    <div className="flex flex-row">
                      <div className="w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Juego
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Paquete
                              </th>
                              <th scope="col" className="px-6 py-3 text-center">
                                Precio
                              </th>

                              <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {listacarrito.map((val, key) => {
                              return (
                                <tr
                                  key={key}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    <img
                                      className="w-10 h-10 rounded-xl cursor-pointer"
                                      src={obtenerjuego(
                                        obtenerpaquete(val.idp, "idj"),
                                        "ruta"
                                      )}
                                      alt="Jese image"
                                    />
                                  </th>
                                  <td className="px-6 py-4 flex flex-col">
                                    <span className="font-bold font-sm">
                                      {val.nombre}
                                    </span>
                                    <span className="font-semibold italic text-[10px]">
                                      {obtenerjuego(
                                        obtenerpaquete(val.idp, "idj"),
                                        "nombre"
                                      )}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-center  font-sm">
                                    {val.precio} Bs
                                  </td>

                                  <td className="px-6 py-4 text-right">
                                    <svg
                                      className="w-[24px] h-[24px] text-gray-800 hover:text-red-600 dark:text-white cursor-pointer"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                      onClick={() => {
                                        eliminararticulo(key);
                                      }}
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </td>
                                </tr>
                              );
                            })}
                            <tr className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              ></th>
                              <td className="px-6 py-4 text-right font-bold italic">
                                Total a Pagar
                              </td>
                              <td className="px-6 py-4 text-center font-bold text-[16px]">
                                {obtenertotal()} Bs
                              </td>
                              <td className="px-6 py-4 text-right"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
            <div className="bg-gradient-to-tr from-white to-blue-400  rounded-md mt-4">
              <div className=" bg-gradient-to-tr from-blue-950 to-purple-600 h-12 pt-2 rounded-t-md">
                <span className="ml-4 mt-2  text-xl text-white text-center acme-regular">
                  Seleccione Tipo De Pago
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
                        Metodos de Pago
                      </label>
                    </div>
                    <select
                      id="metododepago"
                      onChange={(e) => setCuenta(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {listabancos.map((val, key) => {
                        return (
                          <>
                            {val.idp == paisactual ? (
                              <option value={val.id}>{val.nombre}</option>
                            ) : (
                              <></>
                            )}
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col bg-gray-200 rounded-md w-full p-2">
                    <span className="font-bold text-sm italic underline">
                      Depositar en
                    </span>
                    <hr />
                    <span className="text-sm text-left ml-2">
                      <strong>Nombre:</strong> {obtenercuenta(cuenta, "nombre")}
                    </span>
                    <span className="text-sm text-left ml-2">
                      <strong>Cuenta:</strong> {obtenercuenta(cuenta, "cuenta")}
                    </span>

                    <span className="text-sm text-left ml-2">
                      <strong>Tipo:</strong> {obtenercuenta(cuenta, "tipo")}
                    </span>
                  </div>
                  <div className="text-left">
                    <label
                      for="capture"
                      class="block mb-2 text-sm font-medium text-black"
                    >
                      Capture de Pago
                    </label>
                    {rutajuego === "" ? (
                      <img
                        className="w-24 h-24 rounded-xl cursor-pointer"
                        src="https://firebasestorage.googleapis.com/v0/b/protemplo-e8571.appspot.com/o/capture.jpg?alt=media&token=136b3a8c-0b3a-4618-9ca3-d6f445a2b853"
                        alt="Jese image"
                      />
                    ) : (
                      <img
                        className="w-24 h-24 rounded-xl cursor-pointer"
                        src={rutajuego}
                        alt="Jese image"
                      />
                    )}

                    <input
                      onChange={(e) => {
                        const filer = e.target.files[0];
                        setFile(filer);
                        console.log(filer);
                      }}
                      class="block mt-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                      id="file_input"
                      type="file"
                    ></input>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row">
                      <label
                        for="helper-text"
                        class="block mb-2 text-sm font-medium text-black"
                      >
                        Referencia de Pago
                      </label>
                    </div>
                    <input
                      type="text"
                      id="datos_referencia"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                    />
                  </div>
                  <div className=" flex flex-row place-content-start mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        procesarpago();
                      }}
                      class="text-white h-[40px] mt-2 bg-[#1b8a3b] hover:bg-[#24b84e]/90 focus:ring-4 focus:outline-none focus:ring-[#1b8a3b]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#24b84e]/55 me-2 mb-2"
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
                      Procesar Pago
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
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-white">
                {/*header*/}
                <div className=" bg-cyan-900 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl text-blue-200 pb-0 font-bold">
                    <div>Factura</div>
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <table width="100%">
                    <tr className=" text-right">
                      <td>
                        <span className=" text-lg font-bold text-red-600">
                          #000{compras[0].id}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <br />
                      <hr />
                    </tr>
                  </table>
                  <table width="300px" className=" max-md:w-[200px]">
                    {detalles.map((val, key) => {
                      return (
                        <tr key={val.id}>
                          <td colSpan={2} className="italic font-bold">
                            {val.nombre}
                          </td>
                          <td className=" text-right">
                            {val.precio} {val.abreviacion}
                          </td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td colSpan={3}>
                        <hr />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className=" text-right">
                        Total a Pagar:{" "}
                        <span className=" font-bold">{compras[0].total}</span>
                      </td>
                    </tr>
                  </table>
                </div>
                {/*footer*/}
                <div className="flex bg-cyan-900 items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Pay;

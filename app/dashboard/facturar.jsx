"use client";
import Image from "next/image";
import logo from "../img/V1.png";
import React, { useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, Popconfirm } from "antd";
import { Tooltip } from "antd";
import "react-toastify/dist/ReactToastify.css";

const Facturar = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const [showModal4, setShowModal4] = React.useState(false);

  const [nombrepais, setNombrepais] = React.useState("Seleccionar Pais");
  const [preciopais, setPreciopais] = React.useState(0);
  const [abreviacion, setAbreviacion] = React.useState("");

  const [nombrebanco, setNombrebanco] = React.useState("Ninguno");
  const [errorreferencia, setErrorreferencia] = React.useState(false);

  const [listajuegos, setListajuegos] = React.useState([]);
  const [listapaquetes, setListapaquetes] = React.useState([]);
  const [listapais, setListapais] = React.useState([]);
  const [listabancos, setListabancos] = React.useState([]);
  const [listapaquetes2, setListapaquetes2] = React.useState([]);
  const [asignado, setAsignado] = React.useState(0);
  const [listaprecios, setListaprecios] = React.useState([]);

  const [factura, setFactura] = React.useState([]);
  const [enfactura, setEnfactura] = React.useState({
    fecha: "",
    referencia: "",
    total: "",
  });

  const [listatemporal, setListaTemporal] = React.useState([]);
  const [listatemporal2, setListaTemporal2] = React.useState([]);
  const [valorid, setValorid] = React.useState(0);
  const [valorid2, setValorid2] = React.useState(0);
  const [valoridp, setValoridp] = React.useState(0);
  const [valoridb, setValoridb] = React.useState(0);
  const [valoridpais, setValoridpais] = React.useState(0);
  const [referencia, setReferencia] = React.useState(0);
  const [estado, setEstado] = React.useState(false);
  const [estado2, setEstado2] = React.useState(false);
  const [juegos, setJuegos] = React.useState({
    nombre: "",
    categoria: "",
    prg: "",
  });
  const [paquetes, setPaquetes] = React.useState({
    nombre: "",
    precio: 0,
    prg: "",
  });
  const [paises, setPaises] = React.useState({
    id: "",
    nombre: "Seleccionar Pais",
    abreviacion: "",
  });

  const enviarsms = (id) => {
    var encabezado1 =
      "%2ATOP%20POWER%20GAMERS%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A_%2AFACTURA%20%23000" +
      id +
      "%2A_%0A%2AFecha%3A%2A%" +
      enfactura.fecha +
      "%0A%2AReferencia%3A%2A%20" +
      enfactura.referencia +
      "%0A";
    var detalles =
      "%0A%2AProducto%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A";
    for (var i = 0; i < listatemporal2.length; i++) {
      detalles +=
        "_" +
        obtenernombre3("nombre", listatemporal2[i].idp) +
        "_%20---%3E%20" +
        listatemporal2[i].abreviacion +
        "%20" +
        listatemporal2[i].precio +
        "%0A";
    }
    detalles +=
      "%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A_%2ATOTAL%20PAGADO%3A%20" +
      abreviacion +
      "%20" +
      enfactura.total +
      "%2A_%0A%0AGracias%20por%20Preferirnos..%F0%9F%A4%9D";
    var text = encabezado1 + detalles;
    text = text.replace(/\s+/g, "%20");

    // window.location =
    //   "https://wa.me/584126515046?text=Hola%20a%20todos%20como%20estan%20%2Abendiciones%2A%0Aeste%20mensaje%20es%20relevant%20para%20todos%20los%20usuarios%0Adel%20congreo%0Anuevo%20remanente%F0%9F%98%8D";
    //window.location = "whatsapp://send?text=texto%20con%20URL";
    window.location = "https://wa.me/?text=" + text;
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

  const getjuegos = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/juegos/`)
      .then((response) => {
        setListajuegos(response.data);
      });
  };

  const getbancos = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/bancos/`)
      .then((response) => {
        setListabancos(response.data);
      });
  };

  const getpaises = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/paises/`)
      .then((response) => {
        setListapais(response.data);
      });
  };

  const getTemporal = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/temporal/`)
      .then((response) => {
        setListaTemporal(response.data);
      });
  };

  const confirm3 = async () => {
    const asignar = document.getElementById("asignarpais").value;

    setValoridpais(asignar);
    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id === parseInt(asignar)) {
        setNombrepais(listapais[i].nombre);
        setPreciopais(listapais[i].precio);
        setAbreviacion(listapais[i].abreviacion);
      }
    }
    getpaquetes();
  };

  const confirm4 = async () => {
    const asignar = document.getElementById("idbanco").value;

    setValoridpais(asignar);
    for (let i = 0; i < listabancos.length; i++) {
      if (listabancos[i].id === parseInt(asignar)) {
        setNombrebanco(listabancos[i].nombre);
        setValoridb(listabancos[i].id);
      }
    }
  };

  const confirm5 = async () => {
    const asignar = document.getElementById("referencia").value;

    setReferencia(asignar);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/factura/${asignar}/`)
      .then((response) => {
        if (response.data.length == 0) {
          setErrorreferencia(false);
        } else {
          setErrorreferencia(true);
        }
      });
  };

  const getpaquetes = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/asignacion/${valorid}/`)
      .then((response) => {
        if (response.data.length > 0) {
          setAsignado(response.data[0].idp);
        }
      });
  };

  const getpaquetescompra = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/pack/${valorid}/${valoridpais}/${asignado}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setListapaquetes(response.data);
        } else {
          setListapaquetes([]);
        }
      });

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/preciost/${valorid}/${asignado}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setListaprecios(response.data);
        } else {
          setListaprecios([]);
        }
      });
  };

  const getpaquetes2 = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/paquetes/`)
      .then((response) => {
        setListapaquetes2(response.data);
      });
  };

  const editarpaquete = () => {};

  const eliminarpaquete = () => {};

  const obtenernombre = (tipo) => {
    for (let i = 0; i < listajuegos.length; i++) {
      if (listajuegos[i].id == valorid) {
        if (tipo == "nombre") {
          return listajuegos[i].nombre;
        }
        if (tipo == "categoria") {
          return listajuegos[i].categoria;
        }
        if (tipo == "prg") {
          return listajuegos[i].prg;
        }
        setJuegos({
          nombre: listajuegos[i].nombre,
          categoria: listajuegos[i].categoria,
          prg: listajuegos[i].prg,
        });
      }
    }
    return null;
  };

  const obtenerpais = (tipo, idpa) => {
    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idpa) {
        if (tipo == "nombre") {
          return listapais[i].nombre;
        }
        if (tipo == "abreviacion") {
          return listapais[i].abreviacion;
        }
        if (tipo == "precio") {
          return listapais[i].precio;
        }
      }
    }
    return null;
  };

  const obtenernombre1 = (tipo) => {
    for (let i = 0; i < listajuegos.length; i++) {
      if (listajuegos[i].id == valorid2) {
        if (tipo == "nombre") {
          return listajuegos[i].nombre;
        }
        if (tipo == "categoria") {
          return listajuegos[i].categoria;
        }
        if (tipo == "prg") {
          return listajuegos[i].prg;
        }
        setJuegos({
          nombre: listajuegos[i].nombre,
          categoria: listajuegos[i].categoria,
          prg: listajuegos[i].prg,
        });
      }
    }
    return null;
  };

  const obtenernombre2 = (tipo) => {
    for (let i = 0; i < listapaquetes.length; i++) {
      if (listapaquetes[i].id == valoridp) {
        if (tipo == "nombre") {
          return listapaquetes[i].nombre;
        }
        if (tipo == "precio") {
          return listapaquetes[i].precio;
        }
        if (tipo == "prg") {
          return listapaquetes[i].prg;
        }
        setPaquetes({
          nombre: listapaquetes[i].nombre,
          categoria: listapaquetes[i].precio,
          prg: listapaquetes[i].prg,
        });
      }
    }
    return null;
  };

  const obtenernombre3 = (tipo, idpa) => {
    for (let i = 0; i < listapaquetes2.length; i++) {
      if (listapaquetes2[i].id == idpa) {
        if (tipo == "nombre") {
          return listapaquetes2[i].nombre;
        }
        if (tipo == "precio") {
          return listapaquetes2[i].precio;
        }
        if (tipo == "prg") {
          return listapaquetes2[i].prg;
        }
      }
    }
    return null;
  };

  const obtenerregistro = () => {
    for (let i = 0; i < listajuegos.length; i++) {
      if (listajuegos[i].id == valorid) {
        setJuegos({
          nombre: listajuegos[i].nombre,
          categoria: listajuegos[i].categoria,
          prg: listajuegos[i].prg,
        });
      }
    }
  };

  const obtenerregistro2 = () => {
    for (let i = 0; i < listapaquetes.length; i++) {
      if (listapaquetes[i].id == valoridp) {
        setPaquetes({
          nombre: listapaquetes[i].nombre,
          precio: listapaquetes[i].precio,
          prg: listapaquetes[i].prg,
        });
      }
    }
  };

  const obtenerprecio = (tipo, idpa) => {
    var precio = 0;
    var dolarv = obtenerpais("precio", valoridpais);
    var dolarc = obtenerpais("precio", asignado);
    var total = 0;
    for (let i = 0; i < listaprecios.length; i++) {
      if (listaprecios[i].idp == idpa) {
        if (tipo == "precio") {
          precio = listaprecios[i].preciodos;
          total = parseFloat(precio) * parseFloat(dolarv / dolarc);
          return total.toFixed(2);
        }
      }
    }
    return null;
  };

  const obtenertotal = (precio, prg) => {
    var porcentaje = ((precio * preciopais) / 100) * prg;
    var total = precio * preciopais + porcentaje;
    var total = total.toFixed(2);
    return total;
  };

  const form = useRef(null);
  const form2 = useRef(null);

  const handleChange = () => {
    setValorid(document.getElementById("juegose").value);
  };

  const handleChange2 = (e) => {
    setPaquetes({
      ...paquetes,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estado == 0) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/juegos`,
        juegos
      );

      if (res.request.status === 200) {
        msjsave("Registro con Exito", "save");

        form.current.reset();
        setShowModal(false);
        getjuegos();
      }
    } else {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/juegos/${valorid}`,
        juegos
      );

      if (res.request.status === 200) {
        msjsave("Registro Actualizado con Exito", "save");

        form.current.reset();
        setShowModal(false);
        getjuegos();
      }
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (estado2 == 0) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/paquetes/${valorid2}/`,
        paquetes
      );

      if (res.request.status === 200) {
        msjsave("Registro de Paquete Exitoso", "save");

        form2.current.reset();
        setShowModal3(false);
        getpaquetes();
      }
    } else {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/paquetes/${valoridp}`,
        paquetes
      );

      if (res.request.status === 200) {
        msjsave("Registro Actualizado con Exito", "save");

        form2.current.reset();
        setShowModal3(false);
        getpaquetes();
      }
    }
  };

  const selectdelete = async (id) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_KEY}/api/temporal/${id}`
    );

    if (res.request.status === 204) {
      msjsave("Eliminado de la factura con Exito", "save");
      getTemporal();
    }
  };

  const selectdelete2 = async (id) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_KEY}/api/paquetes/${id}`
    );

    if (res.request.status === 204) {
      msjsave("Paquete Eliminado con Exito", "save");
      setShowModal4(false);
      getpaquetes();
    }
  };

  const confirmdelete = (id) => {
    selectdelete(id);
  };

  const confirmdelete2 = (id) => {
    selectdelete2(id);
  };

  const agregaralcarrito = async (idp, precio, precioc, idpais) => {
    var data = {
      idp,
      precio,
      precioc,
      idpais,
      abreviacion,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_KEY}/api/temporal`,
      data
    );

    if (res.request.status === 200) {
      msjsave("Agregado a la Factura", "save");

      getTemporal();
    }
  };

  const obtenertotalgeneral = () => {
    var total2 = 0;

    for (let i = 0; i < listatemporal.length; i++) {
      total2 = parseFloat(listatemporal[i].precio) + total2;
    }

    return total2.toFixed(2);
  };

  const guardarfacturar = async () => {
    var error = 0;
    if (nombrebanco == "Ninguno") {
      msjsave("Seleccione un Banco o Metodo de Pago", "error");
      error = 1;
    }
    if (referencia == 0) {
      msjsave("Ingrese una Referencia", "error");
      error = 1;
    }
    if (errorreferencia == true) {
      msjsave("La referencia que intenta agregar esta registrada", "error");
      error = 1;
    }
    if (error == 0) {
      var total = obtenertotalgeneral();
      var fecha = obtenerfechaactual();
      var telefono = "584126515046";
      var data = {
        referencia,
        total,
        fecha,
        telefono,
        listatemporal,
      };
      setListaTemporal2(listatemporal);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/factura`,
        data
      );

      if (res.request.status === 200) {
        setErrorreferencia(false);
        setReferencia(0);
        getTemporal();
        //msjsave("Registro con Exito", "save");
        setShowModal(true);
        setEnfactura(data);
        setFactura(res.data.id);
      }
    }
  };

  const copiarfactura = async () => {
    var total = obtenertotalgeneral();
    var fecha = obtenerfechaactual();
    var encabezado1 =
      "%2ATOP%20POWER%20GAMERS%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A" +
      "PRESUPUESTO--->%0A%2AFecha%3A%2A%" +
      fecha;
    var detalles =
      "%0A%2AProducto%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A";
    for (var i = 0; i < listatemporal.length; i++) {
      detalles +=
        "_" +
        obtenernombre3("nombre", listatemporal[i].idp) +
        "_%20---%3E%20" +
        listatemporal[i].abreviacion +
        "%20" +
        listatemporal[i].precio +
        "%0A";
    }
    detalles +=
      "%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A_%2ATOTAL%20A%20PAGAR%3A%20" +
      abreviacion +
      "%20" +
      total +
      "%2A_%0A%0AGracias%20por%20Preferirnos..%F0%9F%A4%9D";
    var text = encabezado1 + detalles;
    text = text.replace(/\s+/g, "%20");
    const decodeurl = decodeURIComponent(text);
    await navigator.clipboard.writeText(decodeurl);

    msjsave("COPIADO CON EXITO", "save");
  };

  useEffect(() => {
    getjuegos();
    getpaises();
    getpaquetes2();
    getTemporal();
    getbancos();
  }, []);

  useEffect(() => {
    getpaquetes();
    getpaquetescompra();
  }, [valoridpais]);

  useEffect(() => {
    getpaquetes();
    getpaquetescompra();
  }, [valorid, asignado]);

  useEffect(() => {
    getpaquetes();
    getpaquetescompra();
  }, [valorid2]);

  useEffect(() => {
    obtenerregistro2();
  }, [valoridp]);

  return (
    <div>
      <div className="flex place-content-center max-md:flex-col">
        <div className="p-4">
          <p className="text-blue-200 pb-4 font-bold">Seleccionar un Juego</p>
          <div className="flex place-content-between">
            <select
              id="juegose"
              onChange={handleChange}
              className=" w-[50%] block p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option key="listajuegos2" value="0" selected>
                Sin Seleccion
              </option>
              {listajuegos.map((val, key) => {
                return (
                  <option key={val.id} value={val.id}>
                    {val.nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <br></br>
                    <br></br>
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <Popconfirm
                      title="Asignar Pais"
                      okText="Actualizar"
                      showCancel={false}
                      description=<div>
                        <select key="listapais2" id={`asignarpais`}>
                          {listapais.map((val2, key) => {
                            return (
                              <option key={val2.id} value={val2.id}>
                                {val2.nombre}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      onConfirm={() => {
                        confirm3();
                      }}
                    >
                      <br />
                      <span className="text-blue-500 cursor-pointer">
                        {nombrepais} ({preciopais})
                      </span>
                    </Popconfirm>
                    <br></br>
                    Precio Venta
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <br></br>
                    <span className="text-blue-500 cursor-pointer"></span>
                    <br></br>
                    Precio Compra
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Agregar</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listapaquetes.map((val, key) => {
                  return (
                    <tr
                      key={val.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {obtenernombre3("nombre", val.idp)}
                      </th>
                      <td className="px-6 py-4 text-center">
                        {parseFloat(val.preciov)}{" "}
                        {obtenerpais("abreviacion", val.idpaisv)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {" "}
                        {obtenerprecio("precio", val.idp)}{" "}
                        {obtenerpais("abreviacion", val.idpaisv)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        {valoridpais == 0 ? (
                          <div></div>
                        ) : (
                          <svg
                            className="w-[32px] h-[32px] max-md:text-green-600 text-gray-800 hover:text-green-600 cursor-pointer"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            onClick={() => {
                              agregaralcarrito(
                                val.idp,
                                val.preciov,
                                obtenerprecio("precio", val.idp),
                                valoridpais
                              );
                            }}
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5 3a1 1 0 0 0 0 2h.687L7.82 15.24A3 3 0 1 0 11.83 17h2.34A3 3 0 1 0 17 15H9.813l-.208-1h8.145a1 1 0 0 0 .979-.796l1.25-6A1 1 0 0 0 19 6h-2.268A2 2 0 0 1 15 9a2 2 0 1 1-4 0 2 2 0 0 1-1.732-3h-1.33L7.48 3.796A1 1 0 0 0 6.5 3H5Z"
                              clip-rule="evenodd"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M14 5a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0V8h1a1 1 0 1 0 0-2h-1V5Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-blue-200 pb-4 font-bold">Facturaci&oacute;n</h2>
          <div className="flex bg-slate-200 rounded-lg h-[80px] mb-2">
            <div className="">
              <Image src={logo} alt="paquete" className="h-full w-[200px]" />
            </div>
            <div className="flex flex-col place-content-center">
              <div className=" text-lg font-bold text-blue-800">
                {obtenernombre1("nombre")}
              </div>
              <div className=" text-sm font-bold">
                Fecha:{" "}
                <span className=" text-blue-900">{obtenerfechaactual()}</span>
              </div>
              <div className=" text-sm font-bold">
                Referencia #:{" "}
                <span className=" text-blue-900">
                  {errorreferencia == true ? (
                    <span className="text-red-500 cursor-pointer">
                      <Tooltip
                        title="El numero de Referencia que intenta Agregar ya existe, intente con otro"
                        color="red"
                        key="red"
                      >
                        {referencia}
                      </Tooltip>
                    </span>
                  ) : (
                    <>
                      {referencia == 0 ? (
                        <>{referencia}</>
                      ) : (
                        <span className="text-green-500 cursor-pointer">
                          <Tooltip
                            title="El numero de Referencia es Valido"
                            color="green"
                            key="green"
                          >
                            {referencia}
                          </Tooltip>
                        </span>
                      )}
                    </>
                  )}
                  {" ->"}
                  <Popconfirm
                    title="Metodo de Pago"
                    okText="Actualizar"
                    showCancel={false}
                    description=<div>
                      <input
                        type="text"
                        id="referencia"
                        placeholder="0000000"
                      />
                    </div>
                    onConfirm={() => {
                      confirm5();
                    }}
                  >
                    <button className=" text-red-700">Editar</button>
                  </Popconfirm>
                </span>
              </div>
              <div className=" text-sm font-bold">
                Metodo de Pago:{" "}
                <span className=" text-blue-900">
                  {nombrebanco}{" "}
                  <Popconfirm
                    title="Metodo de Pago"
                    okText="Actualizar"
                    showCancel={false}
                    description=<div>
                      <select key="listabancos2" id="idbanco">
                        {listabancos.map((val2, key) => {
                          return (
                            <option key={val2.id} value={val2.id}>
                              {val2.nombre}
                              {" ("}
                              {obtenerpais("nombre", val2.idp)}
                              {")"}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    onConfirm={() => {
                      confirm4();
                    }}
                  >
                    <button className=" text-red-700">Editar</button>
                  </Popconfirm>
                </span>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Precio Venta
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio Compra
                  </th>

                  <th scope="col" className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {listatemporal.map((val, key) => {
                  return (
                    <tr
                      key={val.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {obtenernombre3("nombre", val.idp)}
                      </th>
                      <td className="px-6 py-4 text-center">{val.precio}</td>
                      <td className="px-6 py-4 text-center">{val.precioc}</td>

                      <td className="px-6 py-4 text-right">
                        <svg
                          className="w-[24px] h-[24px] hover:text-red-700 cursor-pointer text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          onClick={() => {
                            selectdelete(val.id);
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 text-right font-bold">
                    <table>
                      <tr>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              guardarfacturar();
                            }}
                            id="botonguardar"
                            className="text-white bg-[#3d8b2c] hover:bg-[#5dba48]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#5dba48]/55 me-2 mb-2"
                          >
                            <svg
                              className="w-[16px] h-[16px] text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                                clip-rule="evenodd"
                              />
                              <path
                                fill="currentColor"
                                d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
                              />
                            </svg>{" "}
                            Facturar
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              copiarfactura();
                            }}
                            id="botonguardar"
                            className="text-white bg-[#4eb3de] hover:bg-[#4eb3de]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#5dba48]/55 me-2 mb-2"
                          >
                            <svg
                              class="w-[18px] h-[18px] text-white "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z"
                                clip-rule="evenodd"
                              />
                              <path
                                fill-rule="evenodd"
                                d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td colSpan="2" className="px-6 py-4 text-right font-bold">
                    Total a Pagar
                  </td>

                  <td className="px-6 py-4 text-center text-blue-800 font-bold">
                    {obtenertotalgeneral()}
                    {" " + abreviacion}
                  </td>
                </tr>
              </tbody>
            </table>
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
                          #000{factura}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <strong>Fecha: </strong> {enfactura.fecha}
                    </tr>
                    <tr>
                      <strong>Referencia: </strong> {enfactura.referencia}
                    </tr>
                    <tr>
                      <br />
                      <hr />
                    </tr>
                  </table>
                  <table width="100%">
                    {listatemporal2.map((val, key) => {
                      return (
                        <tr key={val.id}>
                          <td colSpan={2} className="italic font-bold">
                            {obtenernombre3("nombre", val.idp)}
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
                        <span className=" font-bold">
                          {enfactura.total} {abreviacion}
                        </span>
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

                  <button
                    type="button"
                    id="botonotro"
                    onClick={() => {
                      enviarsms(factura);
                    }}
                    className="text-white bg-[#2bdf4f] hover:bg-[#1c9634]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                  >
                    <svg
                      className="w-[32px] h-[32px] text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill="currentColor"
                        d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
                      />
                    </svg>
                    &nbsp;&nbsp;Compartir Factura
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Facturar;

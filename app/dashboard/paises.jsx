"use client";
import Image from "next/image";
import logo from "../img/V1.png";
import React, { useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Popconfirm } from "antd";

const Paises = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const [showModal4, setShowModal4] = React.useState(false);

  const [listapaises, setListapaises] = React.useState([]);
  const [listaasignacion, setListaasignacion] = React.useState([]);
  const [listapaquetes, setListapaquetes] = React.useState([]);

  const [listajuegos, setListajuegos] = React.useState([]);

  const [asignado, setAsignado] = React.useState([]);

  const [idjuego, setIdjuego] = React.useState(0);
  const [idpais, setIdpais] = React.useState(0);
  const [activarcampana, setActivarcampana] = React.useState(false);

  const [valorid, setValorid] = React.useState(0);
  const [valorid2, setValorid2] = React.useState(0);
  const [valoridp, setValoridp] = React.useState(0);
  const [estado, setEstado] = React.useState(false);
  const [estado2, setEstado2] = React.useState(false);
  const [paises, setPaises] = React.useState({
    nombre: "",
    precio: 0,
    abreviacion: "",
    descripcion: "",
  });
  const [paquetes, setPaquetes] = React.useState({
    nombre: "",
    precio: 0,
    prg: "",
  });

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

  const getpaises = () => {
    axios.get("api/paises/").then((response) => {
      setListapaises(response.data);
    });
  }; //LISTO

  const getjuegos = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/juegos/`)
      .then((response) => {
        setListajuegos(response.data);
      });
  }; //LISTO

  const getpaquetes = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/paquetes/${idjuego}/`)
      .then((response) => {
        setListapaquetes(response.data);
      });
  }; //LISTO

  const obtenerpais = (id) => {
    for (let i = 0; i < listapaises.length; i++) {
      if (listapaises[i].id == id) {
        return listapaises[i].nombre;
      }
    }
  }; //LISTO

  const obtenerpaquete = (id) => {
    for (let i = 0; i < listapaquetes.length; i++) {
      if (listapaquetes[i].id == id) {
        return listapaquetes[i].nombre;
      }
    }
  }; //LISTO

  const getasignacion = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/precios/${idjuego}/${idpais}`
      )
      .then((response) => {
        if (response.data.status == 400) {
          setListaasignacion([]);
        } else {
          setListaasignacion(response.data);
        }
      });
  };

  const getasignado = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/asignacion/${idjuego}`)
      .then((response) => {
        if (response.data.status == 400) {
          setAsignado([]);
        } else {
          setAsignado(response.data);
        }
      });
  };

  const contarasignados = () => {
    var contador = 0;
    for (let i = 0; i < listaasignacion.length; i++) {
      if (listaasignacion[i].idp == 0) {
      } else {
        contador = contador + 1;
      }
    }
    return contador;
  };

  const contarsinasignar = () => {
    var contador = 0;
    for (let i = 0; i < listaasignacion.length; i++) {
      if (listaasignacion[i].idp == 0) {
        contador = contador + 1;
      } else {
      }
    }
    return contador;
  };

  const editarpaquete = () => {};

  const eliminarpaquete = () => {};

  const obtenernombre = (tipo) => {
    for (let i = 0; i < listapaises.length; i++) {
      if (listapaises[i].id == valorid) {
        if (tipo == "nombre") {
          return listapaises[i].nombre;
        }
        if (tipo == "precio") {
          return listapaises[i].categoria;
        }
        if (tipo == "descripcion") {
          return listapaises[i].descripcion;
        }
        setPaises({
          nombre: listapaises[i].nombre,
          precio: listapaises[i].precio,
          descripcion: listapaises[i].descripcion,
        });
      }
    }
    return null;
  }; //LISTO

  const obtenerjuego = (tipo) => {
    for (let i = 0; i < listajuegos.length; i++) {
      if (listajuegos[i].id == idjuego) {
        if (tipo == "nombre") {
          return listajuegos[i].nombre;
        }
      }
    }
    return null;
  }; //LISTO

  const obtenerpaisn = (tipo) => {
    for (let i = 0; i < listapaises.length; i++) {
      if (listapaises[i].id == idpais) {
        if (tipo == "nombre") {
          return listapaises[i].nombre;
        }
        if (tipo == "abreviacion") {
          return listapaises[i].abreviacion;
        }
      }
    }
    return null;
  }; //LISTO

  const obtenernombre2 = (tipo) => {
    for (let i = 0; i < listaasignacion.length; i++) {
      if (listaasignacion[i].id == valoridp) {
        if (tipo == "nombre") {
          return listaasignacion[i].nombre;
        }
        if (tipo == "precio") {
          return listaasignacion[i].precio;
        }
        if (tipo == "prg") {
          return listaasignacion[i].prg;
        }
        setPaquetes({
          nombre: listaasignacion[i].nombre,
          categoria: listaasignacion[i].precio,
          prg: listaasignacion[i].prg,
        });
      }
    }
    return null;
  };

  const obtenerregistro = () => {
    for (let i = 0; i < listapaises.length; i++) {
      if (listapaises[i].id == valorid) {
        setPaises({
          nombre: listapaises[i].nombre,
          precio: listapaises[i].precio,
        });
      }
    }
  }; //LISTO

  const obtenerregistro2 = () => {
    for (let i = 0; i < listaasignacion.length; i++) {
      if (listaasignacion[i].id == valoridp) {
        setPaquetes({
          nombre: listaasignacion[i].nombre,
          precio: listaasignacion[i].precio,
          prg: listaasignacion[i].prg,
        });
      }
    }
  };

  const form = useRef(null);
  const form2 = useRef(null);

  const handleChange = (e) => {
    setPaises({
      ...paises,
      [e.target.name]: e.target.value,
    });
  }; //LISTO

  const handleChangejuego = (e) => {
    setIdjuego(e.target.value);
  }; //LISTO

  const handleChangepais = (e) => {
    setIdpais(e.target.value);
  }; //LISTO

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
        `${process.env.NEXT_PUBLIC_API_KEY}/api/paises`,
        paises
      );

      if (res.request.status === 200) {
        msjsave("Registro con Exito", "save");

        form.current.reset();
        setShowModal(false);
        getpaises();
      }
    } else {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/paises/${valorid}`,
        paises
      );

      if (res.request.status === 200) {
        msjsave("Registro Actualizado con Exito", "save");

        form.current.reset();
        setShowModal(false);
        getpaises();
      }
    }
  }; //LIST0

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
      `${process.env.NEXT_PUBLIC_API_KEY}/api/paises/${id}`
    );

    if (res.request.status === 204) {
      msjsave("Eliminado con Exito", "save");
      setShowModal2(false);
      setValorid2(0);
      getpaises();
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

  const confirm = async (id) => {
    const precioa = document.getElementById("precio" + id).value;
    const data = {
      precio: precioa,
    };

    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_KEY}/api/paises/${id}`,
      data
    );

    if (res.request.status === 200) {
      msjsave("Precio Actualizado con Exito", "save");

      getpaises();
    }
  };

  const confirm2 = async () => {
    const asignar = document.getElementById("juegose").value;
    setIdjuego(asignar);
  };

  const confirm3 = async () => {
    const asignar = document.getElementById("asignarpais").value;
    setIdpais(asignar);
  };

  const obtenerasignado = () => {
    var activado = 0;
    for (let i = 0; i < asignado.length; i++) {
      if (asignado[i].idp == idpais) {
        setActivarcampana(true);
        activado = 1;
      }
    }
    if (activado == 0) {
      setActivarcampana(false);
    }
  };

  const asignarpais = async () => {
    var idasig = 0;

    if (asignado.length > 0) {
      idasig = asignado[0].id;
      const data = {
        idp: idpais,
      };
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/asignacion/${idasig}`,
        data
      );

      if (res.request.status === 200) {
        msjsave("Pais Asignado para la compra Exitosamente", "save");

        getasignado();
      }
    }
  };

  const updateprecio = async (id) => {
    var precioc = document.getElementById("precioc" + id).value;
    const data = {
      precioc: precioc,
    };
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_KEY}/api/precios/${id}`,
      data
    );

    if (res.request.status === 200) {
      msjsave("Registro Actualizado con Exito", "save");

      getasignacion();
    }
  };

  useEffect(() => {
    getpaises();
    getjuegos();
  }, []);

  useEffect(() => {
    obtenerasignado();
  }, [asignado]);

  useEffect(() => {
    obtenerregistro();
  }, [valorid]);

  useEffect(() => {
    getasignacion();
    getpaquetes();
    getasignado();
  }, [idjuego, idpais]);

  useEffect(() => {
    getasignacion();
  }, []);

  useEffect(() => {
    obtenerregistro2();
  }, [valoridp]);

  return (
    <div>
      <div className="flex place-content-center max-md:flex-col">
        <div className="p-4">
          <h2 className="text-blue-200 pb-4 font-bold">Registro de Paises</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Imagen
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Precio Actual
                  </th>

                  <th scope="col" className="px-6 py-4 text-right">
                    <svg
                      className="w-[24px] h-[24px] text-green-500 dark:text-white cursor-pointer"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      onClick={() => {
                        setShowModal(true);
                        setEstado(0);
                        setPaises({
                          nombre: "null",
                          precio: 0,
                        });
                      }}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listapaises.map((val, key) => {
                  return (
                    <tr
                      key={val.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full cursor-pointer"
                          src="https://picsum.photos/200"
                          alt="Jese image"
                        />
                      </th>
                      <td className="px-6 py-4">{val.nombre}</td>
                      <td className="px-6 py-4 text-center">
                        <Popconfirm
                          title="Cambiar Precio"
                          okText="Actualizar"
                          showCancel={false}
                          description=<input
                            type="text"
                            id={`precio${val.id}`}
                            className=" border-2 w-full"
                            defaultValue={val.precio}
                          />
                          onConfirm={() => {
                            confirm(val.id);
                          }}
                        >
                          <Button type="primary">{val.precio}</Button>
                        </Popconfirm>
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
                            setShowModal2(true);
                            setValorid(val.id);
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
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-blue-200 pb-4 font-bold">
            Asignacion de Pais para Compra
          </h2>
          <div className="flex bg-slate-200 rounded-lg h-[80px] mb-2">
            <div className="">
              <Image src={logo} className="h-full w-[200px]" />
            </div>
            <div className="flex flex-col place-content-center">
              <div className=" text-sm font-bold">
                <Popconfirm
                  title="Seleccionar Juego"
                  okText="Aceptar"
                  showCancel={false}
                  description=<div>
                    <select id="juegose" onChange={handleChangejuego}>
                      <option value="0" selected>
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
                  onConfirm={() => {
                    confirm2();
                  }}
                >
                  <span className="text-red-500">
                    Juego:{" "}
                    <span className="text-black">{obtenerjuego("nombre")}</span>
                  </span>{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </Popconfirm>
              </div>
              <div className=" text-sm font-bold">
                <Popconfirm
                  title="Seleccionar Pais"
                  okText="Aceptar"
                  showCancel={false}
                  description=<div>
                    <select id="asignarpais" onChange={handleChangepais}>
                      {listapaises.map((val2, key) => {
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
                  <span className="text-red-500">
                    Pais:{" "}
                    <span className="text-black">{obtenerpaisn("nombre")}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </Popconfirm>
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
                  <th scope="col" className="px-6 py-3">
                    Precio de Compra
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio (2%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {listaasignacion.map((val, key) => {
                  return (
                    <tr
                      key={val.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {obtenerpaquete(val.idp)}
                      </th>
                      <td className="px-6 py-4 text-center">
                        <Popconfirm
                          title="Precio de Compra"
                          okText="Actualizar"
                          showCancel={false}
                          description=<div>
                            <input
                              id={`precioc${val.id}`}
                              type="text"
                              defaultValue={val.precioc}
                            />
                          </div>
                          onConfirm={() => {
                            updateprecio(val.id);
                          }}
                        >
                          <Button type="primary">
                            {val.precioc} {obtenerpaisn("abreviacion")}
                          </Button>
                        </Popconfirm>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {val.preciodos} {obtenerpaisn("abreviacion")}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td colSpan={3} className="text-center"></td>
                </tr>
                <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td colSpan={3}>
                    {/* ACTIVACION PARA COMPRA */}
                    {activarcampana == true ? (
                      <button
                        type="button"
                        className="text-white bg-[#3d8b2c] hover:bg-[#5dba48]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#5dba48]/55 me-2 mb-2"
                      >
                        <svg
                          className="w-[32px] h-[32px] text-gray-800 text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                        </svg>
                        Activado
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          asignarpais();
                        }}
                        id="botonasignado"
                        className="text-white bg-[#3d8b2c] hover:bg-[#5dba48]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#5dba48]/55 me-2 mb-2"
                      >
                        <svg
                          className="w-[32px] h-[32px] text-gray-800 text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                        </svg>
                        Activar para Compra
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-white">
                {/*header*/}
                <div className=" bg-cyan-900 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl text-blue-200 pb-0 font-bold">
                    {estado === 0 ? (
                      <div>Registrar Pais</div>
                    ) : (
                      <div>Actualizar Pais</div>
                    )}
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
                  <form
                    onSubmit={handleSubmit}
                    className="p-0 md:p-5"
                    ref={form}
                  >
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          for="name"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Nombre del Pais
                        </label>
                        {estado == 1 ? (
                          <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ingresa el Nombre Aqui"
                            required=""
                            defaultValue={obtenernombre("nombre")}
                            onChange={handleChange}
                          />
                        ) : (
                          <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ingresa el Nombre Aqui"
                            required=""
                            defaultValue={""}
                            onChange={handleChange}
                          />
                        )}
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          for="precio"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Precio del Dolar Actual
                        </label>
                        {estado == 1 ? (
                          <input
                            type="number"
                            name="precio"
                            max="100"
                            id="precio"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={obtenernombre("precio")}
                            onChange={handleChange}
                          />
                        ) : (
                          <input
                            type="number"
                            name="precio"
                            max="100"
                            id="prg"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={""}
                            onChange={handleChange}
                          />
                        )}
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          for="abreviacion"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Abreviatura
                        </label>
                        {estado == 1 ? (
                          <input
                            type="text"
                            name="abreviacion"
                            max="100"
                            id="abreviacion"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={obtenernombre("abreviacion")}
                            onChange={handleChange}
                          />
                        ) : (
                          <input
                            type="text"
                            name="abreviacion"
                            max="100"
                            id="abreviacion"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={""}
                            onChange={handleChange}
                          />
                        )}
                      </div>
                      <div className="col-span-2">
                        <label
                          for="descripcion"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Descripcion de Metodo de Pago
                        </label>
                        {estado == 1 ? (
                          <input
                            type="text"
                            name="descripcion"
                            id="descripcion"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={obtenernombre("descripcion")}
                            onChange={handleChange}
                          />
                        ) : (
                          <input
                            type="text"
                            name="descripcion"
                            id="descripcion"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={""}
                            onChange={handleChange}
                          />
                        )}
                      </div>
                    </div>
                  </form>
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
                  {estado == 1 ? (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                    >
                      <svg
                        className="w-[24px] h-[24px] text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm10 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7V5h8v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      &nbsp;&nbsp;Actualizar
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                    >
                      <svg
                        className="w-[24px] h-[24px] text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm10 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7V5h8v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      &nbsp;&nbsp;Guardar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModal2 ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-white">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Desea Eliminar Este Pais?
                      <h1 className=" font-bold">{obtenernombre("nombre")}</h1>
                    </h3>

                    <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Si Elimina este Registro, se Eliminan Todas las
                      asignaciones Correspondientes al Registro
                    </h3>
                    <button
                      data-modal-hide="popup-modal"
                      onClick={() => confirmdelete(valorid)}
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Si, Deseo Eliminar
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={() => setShowModal2(false)}
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      No, cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModal3 ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-white">
                {/*header*/}
                <div className=" bg-cyan-900 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl text-blue-200 pb-0 font-bold">
                    {estado2 === 0 ? (
                      <div>Nuevo Registro de Paquete</div>
                    ) : (
                      <div>Actualizar Registro de Paquete</div>
                    )}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal3(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    onSubmit={handleSubmit2}
                    className="p-0 md:p-5"
                    ref={form2}
                  >
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          for="name"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Nombre del Juego
                        </label>
                        {estado2 == 1 ? (
                          <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ingresa el Nombre Aqui"
                            required=""
                            defaultValue={obtenernombre2("nombre")}
                            onChange={handleChange2}
                          />
                        ) : (
                          <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ingresa el Nombre Aqui"
                            required=""
                            defaultValue={""}
                            onChange={handleChange2}
                          />
                        )}
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          for="precio"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Precio
                        </label>
                        {estado2 == 1 ? (
                          <input
                            type="number"
                            name="precio"
                            max="100"
                            id="precio"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={obtenernombre2("precio")}
                            onChange={handleChange2}
                          />
                        ) : (
                          <input
                            type="number"
                            name="precio"
                            max="100"
                            id="precio"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={""}
                            onChange={handleChange2}
                          />
                        )}
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          for="prg"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          PRG
                        </label>
                        {estado2 == 1 ? (
                          <input
                            type="number"
                            name="prg"
                            max="100"
                            id="prg"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={obtenernombre2("prg")}
                            onChange={handleChange2}
                          />
                        ) : (
                          <input
                            type="number"
                            name="prg"
                            max="100"
                            id="prg"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={""}
                            onChange={handleChange2}
                          />
                        )}
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex bg-cyan-900 items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal3(false)}
                  >
                    Cerrar
                  </button>
                  {estado2 == 1 ? (
                    <button
                      type="submit"
                      onClick={handleSubmit2}
                      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                    >
                      <svg
                        className="w-[24px] h-[24px] text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm10 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7V5h8v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      &nbsp;&nbsp;Actualizar
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={handleSubmit2}
                      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                    >
                      <svg
                        className="w-[24px] h-[24px] text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm10 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7V5h8v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      &nbsp;&nbsp;Guardar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModal4 ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-white">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Desea Eliminar Este Paquete?
                      <h1 className=" font-bold">{obtenernombre2("nombre")}</h1>
                    </h3>

                    <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Si Elimina este Registro, se Eliminan Todos los Paquetes
                      Correspondientes al Registro
                    </h3>
                    <button
                      data-modal-hide="popup-modal"
                      onClick={() => confirmdelete2(valoridp)}
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Si, Deseo Eliminar
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={() => setShowModal4(false)}
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      No, cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default Paises;

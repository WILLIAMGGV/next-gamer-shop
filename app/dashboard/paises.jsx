import Image from "next/image";
import logo from "../img/V1.png";
import React, { useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Popconfirm } from "antd";

const paises = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const [showModal4, setShowModal4] = React.useState(false);

  const [listapaises, setListapaises] = React.useState([]);
  const [listaasignacion, setListaasignacion] = React.useState([]);
  const [valorid, setValorid] = React.useState(0);
  const [valorid2, setValorid2] = React.useState(0);
  const [valoridp, setValoridp] = React.useState(0);
  const [estado, setEstado] = React.useState(false);
  const [estado2, setEstado2] = React.useState(false);
  const [paises, setPaises] = React.useState({
    nombre: "",
    precio: 0,
    abreviacion: "",
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

  const obtenerpais = (id) => {
    for (let i = 0; i < listapaises.length; i++) {
      if (listapaises[i].id == id) {
        return listapaises[i].nombre;
      }
    }
  }; //LISTO

  const getasignacion = () => {
    axios.get(`api/asignacion/`).then((response) => {
      setListaasignacion(response.data);
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
        setPaises({
          nombre: listapaises[i].nombre,
          precio: listapaises[i].precio,
        });
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
        console.log(paises);
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
        console.log(paquetes);
      }
    }
  };

  const form = useRef(null);
  const form2 = useRef(null);

  const handleChange = (e) => {
    console.log(e.target.value);
    setPaises({
      ...paises,
      [e.target.name]: e.target.value,
    });
  }; //LISTO

  const handleChange2 = (e) => {
    console.log(e.target.value);
    setPaquetes({
      ...paquetes,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estado == 0) {
      const res = await axios.post("/api/paises", paises);
      console.log(res);
      if (res.request.status === 200) {
        console.log("GUARDADO");

        msjsave("Registro con Exito", "save");

        form.current.reset();
        setShowModal(false);
        getpaises();
      }
    } else {
      const res = await axios.put(`/api/paises/${valorid}`, paises);
      console.log(res);
      if (res.request.status === 200) {
        console.log("GUARDADO");

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
      const res = await axios.post(`/api/paquetes/${valorid2}/`, paquetes);
      console.log(res);
      if (res.request.status === 200) {
        console.log("GUARDADO");

        msjsave("Registro de Paquete Exitoso", "save");

        form2.current.reset();
        setShowModal3(false);
        getpaquetes();
      }
    } else {
      const res = await axios.put(`/api/paquetes/${valoridp}`, paquetes);
      console.log(res);
      if (res.request.status === 200) {
        console.log("GUARDADO");

        msjsave("Registro Actualizado con Exito", "save");

        form2.current.reset();
        setShowModal3(false);
        getpaquetes();
      }
    }
  };

  const selectdelete = async (id) => {
    const res = await axios.delete(`api/paises/${id}`);

    if (res.request.status === 204) {
      msjsave("Eliminado con Exito", "save");
      setShowModal2(false);
      setValorid2(0);
      getpaises();
    }
  };

  const selectdelete2 = async (id) => {
    const res = await axios.delete(`api/paquetes/${id}`);

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
    console.log(id);
    const precioa = document.getElementById("precio" + id).value;
    const data = {
      precio: precioa,
    };

    const res = await axios.put(`/api/paises/${id}`, data);
    console.log(res);
    if (res.request.status === 200) {
      console.log("GUARDADO");

      msjsave("Precio Actualizado con Exito", "save");

      getpaises();
    }
  };

  const confirm2 = async (id) => {
    console.log(id);
    const asignar = document.getElementById("asignar" + id).value;
    const data = {
      idp: asignar,
    };

    const res = await axios.put(`/api/asignacion/${id}`, data);
    console.log(res);
    if (res.request.status === 200) {
      console.log("GUARDADO");

      msjsave("Asignacion con Exito", "save");

      getasignacion();
    }
  };

  useEffect(() => {
    getpaises();
  }, []);

  useEffect(() => {
    obtenerregistro();
  }, [valorid]);

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
                Asignados (
                <span className="text-green-500">{contarasignados()}</span>)
              </div>
              <div className=" text-sm font-bold">
                Sin Asignar (
                <span className="text-red-500">{contarsinasignar()}</span>)
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
                    Pais Asignado
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
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
                        {val.nombre}
                      </th>
                      <td className="px-6 py-4">{obtenerpais(val.idp)}</td>

                      <td className="px-6 py-4 text-right">
                        <Popconfirm
                          title="Asignar Pais"
                          okText="Actualizar"
                          showCancel={false}
                          description=<div>
                            <select id={`asignar${val.id}`}>
                              {listapaises.map((val2, key) => {
                                return (
                                  <option value={val2.id}>{val2.nombre}</option>
                                );
                              })}
                            </select>
                          </div>
                          onConfirm={() => {
                            confirm2(val.id);
                          }}
                        >
                          <Button type="primary">
                            <svg
                              className="w-[24px] h-[24px] text-white cursor-pointer"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                clip-rule="evenodd"
                              />
                              <path
                                fill-rule="evenodd"
                                d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </Button>
                        </Popconfirm>
                      </td>
                    </tr>
                  );
                })}
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
                  <form onSubmit={handleSubmit} class="p-0 md:p-5" ref={form}>
                    <div class="grid gap-4 mb-4 grid-cols-2">
                      <div class="col-span-2">
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Nombre del Pais
                        </label>
                        {estado == 1 ? (
                          <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ingresa el Nombre Aqui"
                            required=""
                            defaultValue={""}
                            onChange={handleChange}
                          />
                        )}
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                        <label
                          for="precio"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Precio del Dolar Actual
                        </label>
                        {estado == 1 ? (
                          <input
                            type="number"
                            name="precio"
                            max="100"
                            id="precio"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={""}
                            onChange={handleChange}
                          />
                        )}
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                        <label
                          for="abreviacion"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Abreviatura
                        </label>
                        {estado == 1 ? (
                          <input
                            type="text"
                            name="abreviacion"
                            max="100"
                            id="abreviacion"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                      class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                    >
                      <svg
                        class="w-[24px] h-[24px] text-white"
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
                      class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                    >
                      <svg
                        class="w-[24px] h-[24px] text-white"
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
                  <div class="p-4 md:p-5 text-center">
                    <svg
                      class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Desea Eliminar Este Pais?
                      <h1 className=" font-bold">{obtenernombre("nombre")}</h1>
                    </h3>

                    <h3 class="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Si Elimina este Registro, se Eliminan Todas las
                      asignaciones Correspondientes al Registro
                    </h3>
                    <button
                      data-modal-hide="popup-modal"
                      onClick={() => confirmdelete(valorid)}
                      type="button"
                      class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Si, Deseo Eliminar
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={() => setShowModal2(false)}
                      class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
                  <form onSubmit={handleSubmit2} class="p-0 md:p-5" ref={form2}>
                    <div class="grid gap-4 mb-4 grid-cols-2">
                      <div class="col-span-2">
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Nombre del Juego
                        </label>
                        {estado2 == 1 ? (
                          <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ingresa el Nombre Aqui"
                            required=""
                            defaultValue={""}
                            onChange={handleChange2}
                          />
                        )}
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                        <label
                          for="precio"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Precio
                        </label>
                        {estado2 == 1 ? (
                          <input
                            type="number"
                            name="precio"
                            max="100"
                            id="precio"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={""}
                            onChange={handleChange2}
                          />
                        )}
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                        <label
                          for="prg"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          PRG
                        </label>
                        {estado2 == 1 ? (
                          <input
                            type="number"
                            name="prg"
                            max="100"
                            id="prg"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                      class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                    >
                      <svg
                        class="w-[24px] h-[24px] text-white"
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
                      class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                    >
                      <svg
                        class="w-[24px] h-[24px] text-white"
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
                  <div class="p-4 md:p-5 text-center">
                    <svg
                      class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Desea Eliminar Este Paquete?
                      <h1 className=" font-bold">{obtenernombre2("nombre")}</h1>
                    </h3>

                    <h3 class="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Si Elimina este Registro, se Eliminan Todos los Paquetes
                      Correspondientes al Registro
                    </h3>
                    <button
                      data-modal-hide="popup-modal"
                      onClick={() => confirmdelete2(valoridp)}
                      type="button"
                      class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Si, Deseo Eliminar
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={() => setShowModal4(false)}
                      class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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

export default paises;

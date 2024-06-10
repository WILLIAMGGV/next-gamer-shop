import Image from "next/image";
import logo from "../img/V1.png";
import React, { useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const bancos = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const [showModal4, setShowModal4] = React.useState(false);

  const [listabancos, setListabancos] = React.useState([]);
  const [listapais, setListapais] = React.useState([]);
  const [valorid, setValorid] = React.useState(0);
  const [valorid2, setValorid2] = React.useState(0);
  const [valoridp, setValoridp] = React.useState(0);
  const [estado, setEstado] = React.useState(false);
  const [estado2, setEstado2] = React.useState(false);
  const [bancos, setBancos] = React.useState({
    nombre: "",
    cuenta: "",
    tipo: "",
    idp: "",
  });
  const [pais, setPais] = React.useState({
    id: "",
    nombre: "",
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

  const getbancos = () => {
    axios.get("api/bancos/").then((response) => {
      setListabancos(response.data);
    });
  };

  const getpais = () => {
    axios.get("api/paises/").then((response) => {
      setListapais(response.data);
    });
  };

  const editarpaquete = () => {};

  const eliminarpaquete = () => {};

  const obtenernombre = (tipo) => {
    for (let i = 0; i < listabancos.length; i++) {
      if (listabancos[i].id == valorid) {
        if (tipo == "nombre") {
          return listabancos[i].nombre;
        }
        if (tipo == "cuenta") {
          return listabancos[i].cuenta;
        }
        if (tipo == "tipo") {
          return listabancos[i].tipo;
        }
        if (tipo == "idp") {
          return listabancos[i].idp;
        }
        setBancos({
          nombre: listabancos[i].nombre,
          cuenta: listabancos[i].cuenta,
          tipo: listabancos[i].tipo,
          idp: listabancos[i].idp,
        });
      }
    }
    return null;
  };

  const obtenernombre2 = (tipo, idp) => {
    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idp) {
        if (tipo == "nombre") {
          return listapais[i].nombre;
        }
      }
    }
    return null;
  };

  const obtenerregistro = () => {
    for (let i = 0; i < listabancos.length; i++) {
      if (listabancos[i].id == valorid) {
        setBancos({
          nombre: listabancos[i].nombre,
          cuenta: listabancos[i].cuenta,
          tipo: listabancos[i].tipo,
          idp: listabancos[i].idp,
        });
        console.log(bancos);
      }
    }
  };

  const form = useRef(null);
  const form2 = useRef(null);

  const handleChange = (e) => {
    console.log(e.target.value);
    setBancos({
      ...bancos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estado == 0) {
      const res = await axios.post("/api/bancos", bancos);
      console.log(res);
      if (res.request.status === 200) {
        console.log("GUARDADO");

        msjsave("Registro con Exito", "save");

        form.current.reset();
        setShowModal(false);
        getbancos();
      }
    } else {
      const res = await axios.put(`/api/bancos/${valorid}`, bancos);
      console.log(res);
      if (res.request.status === 200) {
        console.log("GUARDADO");

        msjsave("Registro Actualizado con Exito", "save");

        form.current.reset();
        setShowModal(false);
        getbancos();
      }
    }
  };

  const selectdelete = async (id) => {
    const res = await axios.delete(`api/bancos/${id}`);

    if (res.request.status === 204) {
      msjsave("Eliminado con Exito", "save");
      setShowModal2(false);
      setValorid2(0);
      getbancos();
    }
  };

  const confirmdelete = (id) => {
    selectdelete(id);
  };

  useEffect(() => {
    getbancos();
    getpais();
  }, []);

  useEffect(() => {
    obtenerregistro();
  }, [valorid]);

  return (
    <div>
      <div className="flex place-content-center max-md:flex-col">
        <div className="p-4">
          <h2 className="text-blue-200 pb-4 font-bold">Registro de Bancos</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cuenta
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pais
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
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
                        setBancos({
                          nombre: "null",
                          cuenta: "null",
                          tipo: "null",
                          idp: "null",
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
                {listabancos.map((val, key) => {
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
                      <td className="px-6 py-4">{val.cuenta}</td>
                      <td className="px-6 py-4">{val.tipo}</td>
                      <td className="px-6 py-4">
                        {obtenernombre2("nombre", val.idp)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <svg
                          className="w-[24px] h-[24px] text-gray-800 hover:text-yellow-600 dark:text-white cursor-pointer"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          onClick={() => {
                            setShowModal(true);
                            setValorid(val.id);
                            setValoridp(val.idp);
                            setEstado(1);
                          }}
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
        {/* <div className="p-4">
          <h2 className="text-blue-200 pb-4 font-bold">Registro de Paquetes</h2>
          <div className="flex bg-slate-200 rounded-lg h-[80px] mb-2">
            <div className="">
              <Image src={logo} className="h-full w-[200px]" />
            </div>
            <div className="flex flex-col place-content-center">
              <div className=" text-lg font-bold text-blue-800">
                {obtenernombre1("nombre")}
              </div>
              <div className=" text-sm font-bold">
                Disponibles {listapaquetes.length} Paquetes
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
                    Precio (USD)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PRG
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    {valorid2 == 0 ? (
                      <div></div>
                    ) : (
                      <svg
                        className="w-[24px] h-[24px] text-green-500 dark:text-white cursor-pointer"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        onClick={() => {
                          setEstado2(0);
                          setShowModal3(true);
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
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
                        {val.nombre}
                      </th>
                      <td className="px-6 py-4">{val.precio}</td>
                      <td className="px-6 py-4">{val.prg}%</td>

                      <td className="px-6 py-4 text-right">
                        <svg
                          className="w-[24px] h-[24px] hover:text-yellow-600 text-gray-800 dark:text-white cursor-pointer"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          onClick={() => {
                            setShowModal3(true);
                            setValoridp(val.id);
                            setEstado2(1);
                          }}
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
                      </td>
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
                            setShowModal4(true);
                            setValoridp(val.id);
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
        </div> */}
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
                      <div>Nuevo Registro</div>
                    ) : (
                      <div>Actualizar Registro</div>
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
                          Nombre del Banco
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
                          for="cuenta"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Cuenta
                        </label>
                        {estado == 1 ? (
                          <input
                            type="text"
                            name="cuenta"
                            max="100"
                            id="cuenta"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={obtenernombre("cuenta")}
                            onChange={handleChange}
                          />
                        ) : (
                          <input
                            type="text"
                            name="cuenta"
                            max="100"
                            id="cuenta"
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
                          for="tipo"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Tipo
                        </label>
                        {estado == 1 ? (
                          <input
                            type="text"
                            name="tipo"
                            max="100"
                            id="tipo"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                            defaultValue={obtenernombre("tipo")}
                            onChange={handleChange}
                          />
                        ) : (
                          <input
                            type="text"
                            name="tipo"
                            max="100"
                            id="tipo"
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
                          for="idp"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Pais
                        </label>
                        <select
                          id="idp"
                          name="idp"
                          onChange={handleChange}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option value="0" selected>
                            Seleccionar Pais
                          </option>
                          {estado == 1
                            ? listapais.map((val, key) =>
                                val.id == valoridp ? (
                                  <option value={val.id} selected>
                                    {val.nombre}
                                  </option>
                                ) : (
                                  <option value={val.id}>{val.nombre}</option>
                                )
                              )
                            : listapais.map((val, key) => (
                                <option value={val.id}>{val.nombre}</option>
                              ))}
                        </select>
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
                      Desea Eliminar Este Banco o Cuenta?
                      <h1 className=" font-bold">{obtenernombre("nombre")}</h1>
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
      <ToastContainer />
    </div>
  );
};

export default bancos;

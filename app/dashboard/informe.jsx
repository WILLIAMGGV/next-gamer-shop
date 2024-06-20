"use client";
import Image from "next/image";
import logo from "../img/V1.png";
import React, { useRef, useEffect } from "react";
import axios from "axios";
import { DatePicker, Space } from "antd";
import { Chart } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const Informe = () => {
  const [showModal, setShowModal] = React.useState(false);

  const obtenerfechaactual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();

    const fechaFormateada = `${año}-${mes.toString().padStart(2, "0")}-${dia
      .toString()
      .padStart(2, "0")}`;
    console.log(fechaFormateada);
    return fechaFormateada; // Output: la fecha actual en formato dd-mm-yyyy
  };

  const obtenerfecha2 = (fecha) => {
    const fechaActual = new Date(fecha);
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();

    const fechaFormateada = `${año}-${mes.toString().padStart(2, "0")}-${dia
      .toString()
      .padStart(2, "0")}`;
    console.log(fechaFormateada);
    return fechaFormateada; // Output: la fecha actual en formato dd-mm-yyyy
  };

  const obtenerano = () => {
    const fechaActual = new Date();

    const año = fechaActual.getFullYear();

    const fechaFormateada = `${año}`;
    console.log(fechaFormateada);
    return fechaFormateada; // Output: la fecha actual en formato dd-mm-yyyy
  };

  const onChange = (date, dateString) => {
    setValorid(dateString);
  };

  const [listafacturas, setListafacturas] = React.useState([]);
  const [listadetalles, setListadetalles] = React.useState([]);
  const [listapaquetes, setListapaquetes] = React.useState([]);
  const [idfactura, setIdfactura] = React.useState(0);
  const [labels, setLabels] = React.useState([
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ]);

  const [ventas, setVentas] = React.useState([]);

  const [valorid, setValorid] = React.useState(obtenerfechaactual());

  const obtenerventas = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/ventas/`)
      .then((response) => {
        console.log(response.data);
        setVentas(response.data);
      });
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Ventas",
        data: ventas,
        backgroundColor: [
          "rgba(54, 162, 235)",
          "rgba(54, 162, 235)",
          "rgba(54, 162, 235)",
          "rgba(54, 162, 235)",
          "rgba(54, 162, 235)",
          "rgba(54, 162, 235)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const getfacturas = () => {
    if (valorid != "") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/buscafactura/${valorid}`)
        .then((response) => {
          if (response.data.length > 0) {
            setListafacturas(response.data);
          } else {
            setListafacturas([]);
          }
        });
    }
  };

  const obtenerencabezado = (tipo, idpa) => {
    for (let i = 0; i < listafacturas.length; i++) {
      if (listafacturas[i].id == idpa) {
        if (tipo == "fecha") {
          return listafacturas[i].fecha;
        }
        if (tipo == "total") {
          return listafacturas[i].total;
        }
        if (tipo == "referencia") {
          return listafacturas[i].referencia;
        }
      }
    }
    return null;
  };

  const mostrarfactura = (idfactura) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/buscadetalles/${idfactura}`)
      .then((response) => {
        setListadetalles(response.data);
      });
  };

  const getpaquetes2 = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/paquetes/`)
      .then((response) => {
        setListapaquetes(response.data);
      });
  };

  const obtenernombre3 = (tipo, idpa) => {
    for (let i = 0; i < listapaquetes.length; i++) {
      if (listapaquetes[i].id == idpa) {
        if (tipo == "nombre") {
          return listapaquetes[i].nombre;
        }
        if (tipo == "precio") {
          return listapaquetes[i].precio;
        }
        if (tipo == "prg") {
          return listapaquetes[i].prg;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    getfacturas();
    getpaquetes2();
    obtenerventas();
  }, []);

  useEffect(() => {
    getfacturas();
  }, [valorid]);

  return (
    <div>
      <div className="flex place-content-center max-md:flex-col">
        <div className="p-4">
          <p className="text-blue-200 pb-4 font-bold">
            Filtrar Facturas por Fecha
          </p>
          <div className="flex place-content-between">
            <div class="relative max-w-sm">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <DatePicker onChange={onChange} />
            </div>
            <br />
            <br />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Factura #
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Referencia
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Total
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Mostrar</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listafacturas.map((val, key) => {
                  return (
                    <tr
                      key={val.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {val.id}
                      </th>
                      <td className="px-6 py-4 text-center">
                        {obtenerfecha2(val.fecha)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {val.referencia}
                      </td>
                      <td className="px-6 py-4 text-center">{val.total}</td>

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
                            setIdfactura(val.id);
                            mostrarfactura(val.id);
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
        </div>
        <div className="p-4">
          <h2 className="text-blue-200 pb-4 font-bold">Grafico de Ventas</h2>
          <div className="flex bg-slate-200 rounded-lg h-[80px] mb-2">
            <div className="">
              <Image src={logo} alt="paquete" className="h-full w-[200px]" />
            </div>
            <div className="flex flex-col place-content-center">
              <div className=" text-lg font-bold text-blue-800">
                VENTAS {obtenerano()} &nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </div>
          <div className=" bg-white relative overflow-x-auto shadow-md sm:rounded-lg">
            <Bar data={data} />
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
                          #000{idfactura}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <strong>Fecha: </strong>{" "}
                      {obtenerfecha2(obtenerencabezado("fecha", idfactura))}
                    </tr>
                    <tr>
                      <strong>Referencia: </strong>{" "}
                      {obtenerencabezado("referencia", idfactura)}
                    </tr>
                    <tr>
                      <br />
                      <hr />
                    </tr>
                  </table>
                  <table width="300px" className=" max-md:w-[200px]">
                    {listadetalles.map((val, key) => {
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
                          {obtenerencabezado("total", idfactura)}
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

export default Informe;

import Image from "next/image";
import logo from "../img/V1.png";
import React, { useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Popconfirm, Tooltip } from "antd";

const presupuesto = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const [showModal4, setShowModal4] = React.useState(false);

  const [listapaquetes, setListapaquetes] = React.useState([]);
  const [listapaquetescompra, setListapaquetescompra] = React.useState([]);
  const [listajuegos, setListajuegos] = React.useState([]);
  const [valorid, setValorid] = React.useState(0); //ID DEL JUEGO
  const [idpaisv, setIdpaisv] = React.useState(0); //ID DEL PAIS DE VENTA
  const [idpaisc, setIdpaisc] = React.useState(0); //ID DEL PAIS DE COMPRA
  const [porcentajeazul, setPorcentajeazul] = React.useState(0); //PORCENTAJE DEL JUEGO
  const [valorid2, setValorid2] = React.useState(0);
  const [valoridp, setValoridp] = React.useState(0);

  const [precioscompra, setprecioscompra] = React.useState([]);

  const [nombrepais, setNombrepais] = React.useState("");
  const [preciopais, setPreciopais] = React.useState(0);
  const [abreviacion, setAbreviacion] = React.useState("");

  const [listapais, setListapais] = React.useState([]);
  const [listapais2, setListapais2] = React.useState([]);

  const [estado, setEstado] = React.useState(false);
  const [estado2, setEstado2] = React.useState(false);
  const [paises, setPaises] = React.useState({
    nombre: "",
    precio: 0,
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

  const enviarsms = () => {
    var text = "";
    if (valorid == 0) {
      msjsave("No se ha seleccionado un Juego", "error");
      return null;
    }
    var juego = "%2A" + obtenernombre2("nombre") + "%2A%0A%0A";
    juego = juego.replace(/\s+/g, "%20");
    var paquetestitle = "%2APAQUETES%2A%0A";
    console.log(listapaquetes);
    if (preciopais == 0) {
      msjsave("Debes seleccionar un Pais o Moneda", "error");
      return null;
    }
    var descripcion = "";
    var precio = 0;
    for (let i = 0; i < listapaquetes.length; i++) {
      precio =
        ((parseFloat(listapaquetes[i].precio) * parseFloat(preciopais)) / 100) *
          parseFloat(listapaquetes[i].prg) +
        parseFloat(listapaquetes[i].precio) * parseFloat(preciopais);
      precio = precio.toFixed(2);
      console.log(precio);
      descripcion +=
        "%F0%9F%92%8E%09%2A" +
        listapaquetes[i].nombre +
        "%2A%09%E2%9E%A1%EF%B8%8F%09" +
        abreviacion +
        "%20" +
        precio +
        "%0A";
    }
    var metodo =
      "%0A%2AMETODOS%20DE%20PAGO%3A%20%20Banco%20de%20Venezuela%2A%0A%0A";
    text = juego + paquetestitle + descripcion + metodo;
    text = text.replace(/\s+/g, "%20");

    // window.location =
    //   "https://wa.me/584126515046?text=Hola%20a%20todos%20como%20estan%20%2Abendiciones%2A%0Aeste%20mensaje%20es%20relevant%20para%20todos%20los%20usuarios%0Adel%20congreo%0Anuevo%20remanente%F0%9F%98%8D";
    //window.location = "whatsapp://send?text=texto%20con%20URL";
    window.location = "https://wa.me/?text=" + text;
  };

  const getprecioscompra = () => {
    axios.get(`api/precios/${valorid}/${idpaisc}`).then((response) => {
      console.log(response.data);
      if (response.data.status == 400) {
        setprecioscompra([]);
      } else {
        setprecioscompra(response.data);
      }
    });
  };

  const getpaquetes = () => {
    axios.get(`api/paquetes/${valorid}`).then((response) => {
      setListapaquetes(response.data);
    });
  }; //LISTO

  const getpaquetescompra = () => {
    axios.get(`api/paq/${valorid}/${idpaisc}/${idpaisv}`).then((response) => {
      if (response.data.status == 400) {
        setListapaquetescompra([]);
      } else {
        setListapaquetescompra(response.data);
      }
      console.log(idpaisc);
      console.log(idpaisv);
      console.log(listapaquetescompra);
      console.log(typeof listapaquetescompra); // debería ser "object"
      console.log(Array.isArray(listapaquetescompra)); // debería ser true
    });
  }; //LISTO

  const getpaises = () => {
    axios.get(`api/paises/`).then((response) => {
      setListapais(response.data);
    });
  }; //LISTO

  const getpaises2 = () => {
    axios.get(`api/paises/`).then((response) => {
      setListapais2(response.data);
    });
  }; //LISTO

  const getasignacion = () => {
    axios.get(`api/asignacion/${valorid}/`).then((response) => {
      if (response.data.length == 0) {
        setValoridp(0);
      } else {
        setValoridp(response.data[0].idp);
      }
    });
  }; //LISTO

  const getpais = () => {
    axios.get(`api/paises/${valoridp}/`).then((response) => {
      console.log(valoridp);
      if (response.data.length == 0) {
        setNombrepais("");
        setPreciopais(0);
        setAbreviacion("");
      } else {
        setNombrepais(response.data[0].nombre);
        setPreciopais(response.data[0].precio);
        setAbreviacion(response.data[0].abreviacion);
      }
    });
  }; //LISTO

  const obtenerpais = (tipo, id) => {
    for (let i = 0; i < listapais.length; i++) {
      if (tipo == "nombre" && listapais[i].id == id) {
        return listapais[i].nombre;
      }
      if (tipo == "precio" && listapais[i].id == id) {
        return listapais[i].precio;
      }
      if (tipo == "abreviacion" && listapais[i].id == id) {
        return listapais[i].abreviacion;
      }
    }
    if (tipo == "nombre") {
      return "Seleccionar Pais";
    }
  };

  const obtenerpreciocompra = (tipo, id) => {
    var abreviacion = "";
    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idpaisc) {
        abreviacion = listapais[i].abreviacion;
      }
    }

    for (let i = 0; i < precioscompra.length; i++) {
      if (tipo == "precio" && precioscompra[i].idp == id) {
        return precioscompra[i].preciodos + " " + abreviacion;
      }
    }
  };

  const obtenerprecioc = (idp) => {
    var dolaractual = 0;

    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idpaisv) {
        dolaractual = parseFloat(listapais[i].precio);
      }
    }

    var dolarcompra = 0;

    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idpaisc) {
        dolarcompra = parseFloat(listapais[i].precio);
      }
    }

    for (let i = 0; i < precioscompra.length; i++) {
      if (precioscompra[i].idp == idp) {
        console.log(precioscompra[i].preciodos);

        return (
          (parseFloat(dolaractual) / parseFloat(dolarcompra)) *
          parseFloat(precioscompra[i].preciodos)
        ).toFixed(2);
      }
    }
    return null;
  };

  //LISTO

  const obtenerprecio = (precio) => {
    console.log(precio);
    return (precio * preciopais).toFixed(2);
  };

  const obtenerganancia = (precio, prg) => {
    console.log(precio);
    return (((precio * preciopais) / 100) * prg).toFixed(2);
  };

  const getjuegos = () => {
    axios.get(`api/juegos/`).then((response) => {
      setListajuegos(response.data);
    });
  };

  const contarasignados = () => {
    var contador = 0;
    for (let i = 0; i < listajuegos.length; i++) {
      if (listajuegos[i].idp == 0) {
      } else {
        contador = contador + 1;
      }
    }
    return contador;
  };

  const tomarporcentaje = () => {
    setPorcentajeazul(0);
    for (let i = 0; i < listajuegos.length; i++) {
      if (listajuegos[i].id == valorid) {
        setPorcentajeazul(listajuegos[i].prg);
      }
    }
  };

  const contarsinasignar = () => {
    var contador = 0;
    for (let i = 0; i < listajuegos.length; i++) {
      if (listajuegos[i].idp == 0) {
        contador = contador + 1;
      } else {
      }
    }
    return contador;
  };

  const editarpaquete = () => {};

  const eliminarpaquete = () => {};

  const obtenernombre = (tipo, id) => {
    for (let i = 0; i < listapaquetes.length; i++) {
      if (listapaquetes[i].id == id) {
        if (tipo == "nombre") {
          return listapaquetes[i].nombre;
        }
        if (tipo == "precio") {
          return listapaquetes[i].categoria;
        }
        setPaises({
          nombre: listapaquetes[i].nombre,
          precio: listapaquetes[i].precio,
        });
      }
    }
    return null;
  }; //LISTO

  const obtenernombre2 = (tipo) => {
    for (let i = 0; i < listajuegos.length; i++) {
      if (listajuegos[i].id == valorid) {
        if (tipo == "nombre") {
          console.log(listajuegos[i].nombre);
          return listajuegos[i].nombre;
        }
        if (tipo == "precio") {
          return listajuegos[i].precio;
        }
        if (tipo == "prg") {
          return listajuegos[i].prg;
        }
        setPaquetes({
          nombre: listajuegos[i].nombre,
          categoria: listajuegos[i].precio,
          prg: listajuegos[i].prg,
        });
      }
    }
    return null;
  };

  const obtenerregistro = () => {
    for (let i = 0; i < listapaquetes.length; i++) {
      if (listapaquetes[i].id == valorid) {
        setPaises({
          nombre: listapaquetes[i].nombre,
          precio: listapaquetes[i].precio,
        });
        console.log(paises);
      }
    }
  }; //LISTO

  const obtenerregistro2 = () => {
    for (let i = 0; i < listajuegos.length; i++) {
      if (listajuegos[i].id == valoridp) {
        setPaquetes({
          nombre: listajuegos[i].nombre,
          precio: listajuegos[i].precio,
          prg: listajuegos[i].prg,
        });
        console.log(paquetes);
      }
    }
  };

  const handleChange = (e) => {
    setValorid(document.getElementById("juegose").value);
  };

  const form = useRef(null);
  const form2 = useRef(null);

  //actualiza precio de venta
  const confirm = async (id) => {
    const preciov = document.getElementById("preciovf" + id).value;
    const data = {
      preciov: preciov,
    };

    const res = await axios.put(`/api/paq/${id}`, data);
    console.log(res);
    if (res.request.status === 200) {
      console.log("GUARDADO");

      msjsave("Precio Actualizado con Exito", "save");

      getpaquetescompra();
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

      getjuegos();
    }
  };

  const confirm5 = async () => {
    const asignar = document.getElementById("porcentajea").value;
    const data = {
      prg: asignar,
    };
    console.log(data);
    const res = await axios.put(`/api/juego/${valorid}`, data);
    console.log(res);
    if (res.request.status === 200) {
      console.log("GUARDADO");

      msjsave("Porcentaje Modificado con exito", "save");
      getjuegos();
      getprecioscompra();
    }
  };

  //asigna pais venta
  const confirm3 = async () => {
    const asignar2 = document.getElementById("paisbase2").value;
    console.log(asignar2);
    setIdpaisv(asignar2);
    getpaquetescompra();
  };

  //asigna pais compra
  const confirm4 = async () => {
    console.log("SE EJECUTO EL CONFIRM4");
    const asignar = document.getElementById("paisbase").value;
    console.log(asignar);
    setIdpaisc(asignar);
    getpaquetescompra();
  };

  const precioreal = (idp) => {
    var dolaractual = 0;

    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idpaisv) {
        dolaractual = parseFloat(listapais[i].precio);
      }
    }

    var dolarcompra = 0;

    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idpaisc) {
        dolarcompra = parseFloat(listapais[i].precio);
      }
    }

    for (let i = 0; i < precioscompra.length; i++) {
      if (precioscompra[i].idp == idp) {
        console.log(precioscompra[i].preciodos);

        return (
          ((parseFloat(dolaractual) / parseFloat(dolarcompra)) *
            parseFloat(precioscompra[i].preciodos) *
            parseFloat(porcentajeazul)) /
            100 +
          (parseFloat(dolaractual) / parseFloat(dolarcompra)) *
            parseFloat(precioscompra[i].preciodos)
        ).toFixed(2);
      }
    }
    return null;
  };

  const obtenerprg = (idp) => {
    var precioventa = 0;
    var preciocompra = 0;
    for (let i = 0; i < listapaquetescompra.length; i++) {
      if (listapaquetescompra[i].idp == idp) {
        precioventa = parseFloat(listapaquetescompra[i].preciov);
      }
    }

    var dolaractual = 0;

    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idpaisv) {
        dolaractual = parseFloat(listapais[i].precio);
      }
    }

    var dolarcompra = 0;

    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idpaisc) {
        dolarcompra = parseFloat(listapais[i].precio);
      }
    }

    for (let i = 0; i < precioscompra.length; i++) {
      if (precioscompra[i].idp == idp) {
        var preciocompra =
          (parseFloat(dolaractual) / parseFloat(dolarcompra)) *
          parseFloat(precioscompra[i].preciodos);
      }
    }

    return (
      (parseFloat(precioventa) / parseFloat(preciocompra) - 1) *
      100
    ).toFixed(2);
  };

  const ganancia = (idp) => {
    var precioventa = 0;
    var preciocompra = 0;
    for (let i = 0; i < listapaquetescompra.length; i++) {
      if (listapaquetescompra[i].idp == idp) {
        precioventa = parseFloat(listapaquetescompra[i].preciov);
      }
    }

    var dolaractual = 0;

    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idpaisv) {
        dolaractual = parseFloat(listapais[i].precio);
      }
    }

    var dolarcompra = 0;

    for (let i = 0; i < listapais.length; i++) {
      if (listapais[i].id == idpaisc) {
        dolarcompra = parseFloat(listapais[i].precio);
      }
    }

    for (let i = 0; i < precioscompra.length; i++) {
      if (precioscompra[i].idp == idp) {
        var preciocompra =
          (parseFloat(dolaractual) / parseFloat(dolarcompra)) *
          parseFloat(precioscompra[i].preciodos);
      }
    }
    console.log(preciocompra);
    return (parseFloat(precioventa) - parseFloat(preciocompra)).toFixed(2);
  };

  useEffect(() => {
    getjuegos();
    getpaises();
    getpaises2();
    //getpaquetescompra();
  }, []);

  useEffect(() => {
    getpaquetes();
    //getpaquetescompra();
    //getasignacion();
  }, [valorid]);

  useEffect(() => {
    getpaquetescompra();
    tomarporcentaje();
    getprecioscompra();
  }, [idpaisv, idpaisc, valorid, listajuegos]);

  useEffect(() => {
    getjuegos();
  }, []);

  useEffect(() => {
    getpais();
  }, [valoridp]);

  return (
    <div>
      <div className="flex place-content-center max-md:flex-col">
        <div className="p-4  w-[80%] max-md:w-[100%]">
          <h2 className="text-blue-200 text-center pb-4 font-bold">
            CREAR UN PRESUPUESTO
          </h2>
          <p className="text-blue-200 pb-4 font-bold">Seleccionar un Juego</p>
          <div className="flex place-content-between">
            <select
              id="juegose"
              onChange={handleChange}
              class=" w-[50%] block p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0" selected>
                Sin Seleccion
              </option>
              {listajuegos.map((val, key) => {
                return <option value={val.id}>{val.nombre}</option>;
              })}
            </select>
            <button
              type="button"
              onClick={() => {
                enviarsms();
              }}
              class="text-white bg-[#3d8b2c] hover:bg-[#5dba48]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#5dba48]/55 me-2 mb-2"
            >
              <svg
                class="w-[32px] h-[32px] text-white"
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
              Enviar Via Whatsapp
            </button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre del Paquete
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Precio Venta:<br></br>
                    <Popconfirm
                      title="Pais de Venta"
                      okText="Actualizar"
                      showCancel={false}
                      description=<div>
                        <select id={`paisbase2`}>
                          <option value="0" selected>
                            Seleccione un Pais
                          </option>
                          {listapais.map((val2, key) => {
                            return (
                              <option value={val2.id}>{val2.nombre}</option>
                            );
                          })}
                        </select>
                      </div>
                      onConfirm={() => {
                        confirm3();
                      }}
                    >
                      <span className="text-blue-500 cursor-pointer">
                        {obtenerpais("nombre", idpaisv)} (
                        {obtenerpais("precio", idpaisv)})
                      </span>
                    </Popconfirm>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    PRG
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    PR
                  </th>

                  <th scope="col" className="px-6 py-3 text-center">
                    Precio Base:<br></br>
                    <Popconfirm
                      title="Pais de Compra"
                      okText="Actualizar"
                      showCancel={false}
                      description=<div>
                        <select id={`paisbase`}>
                          <option value="0" selected>
                            Seleccione un Pais
                          </option>
                          {listapais2.map((val2, key) => {
                            return (
                              <option value={val2.id}>{val2.nombre}</option>
                            );
                          })}
                        </select>
                      </div>
                      onConfirm={() => {
                        confirm4();
                      }}
                    >
                      <span className="text-blue-500 cursor-pointer">
                        {obtenerpais("nombre", idpaisc)} (
                        {obtenerpais("precio", idpaisc)})
                      </span>
                    </Popconfirm>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Ganancia<br></br>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listapaquetescompra.map((val2, key) => {
                  return (
                    <tr
                      key={val2.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {obtenernombre("nombre", val2.idp)}
                      </th>
                      <td className="px-6 py-4 text-center">
                        <Popconfirm
                          title="Cambiar Precio"
                          okText="Actualizar"
                          showCancel={false}
                          description=<input
                            type="text"
                            id={`preciovf${val2.id}`}
                            className=" border-2 w-full"
                            defaultValue={val2.preciov}
                          />
                          onConfirm={() => {
                            confirm(val2.id);
                          }}
                        >
                          <Button type="primary">
                            {val2.preciov} {obtenerpais("abreviacion", idpaisv)}
                          </Button>
                        </Popconfirm>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {obtenerprg(val2.idp)} %
                      </td>

                      <td className="px-6 py-4 text-center">
                        {precioreal(val2.idp)}{" "}
                        {obtenerpais("abreviacion", idpaisv)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Tooltip
                          title={obtenerpreciocompra("precio", val2.idp)}
                          color="black"
                          key="black"
                        >
                          <span className=" text-green-500 font-bold cursor-pointer">
                            {obtenerprecioc(val2.idp)}{" "}
                            {obtenerpais("abreviacion", idpaisv)}
                          </span>
                        </Tooltip>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {ganancia(val2.idp)}{" "}
                        {obtenerpais("abreviacion", idpaisv)}
                      </td>
                    </tr>
                  );
                })}

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  ></th>
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center"></td>

                  <td className="px-6 py-4 text-center font-bold text-blue-400">
                    <Popconfirm
                      title="Cambiar Porcentaje"
                      okText="Actualizar"
                      showCancel={false}
                      description=<input
                        type="text"
                        id={`porcentajea`}
                        className=" border-2 w-full"
                        defaultValue={porcentajeazul}
                      />
                      onConfirm={() => {
                        confirm5();
                      }}
                    >
                      <Button type="primary">
                        <span className=" text-cyan-100 font-bold">
                          {porcentajeazul}%
                        </span>
                      </Button>
                    </Popconfirm>
                  </td>
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default presupuesto;

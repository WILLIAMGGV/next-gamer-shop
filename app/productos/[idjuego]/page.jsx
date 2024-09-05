"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../img/V1.png";
import { AutoComplete, Input } from "antd";
import Footer from "../../footer";
import Products from "../../products";
import Carrito from "../../carrito";
import Product from "./product";

function Productos({ params }) {
  const searchResult = (query) =>
    new Array()
      .join(".")
      .split(".")
      .map((_, idx) => {
        const category = `${query}`;

        const resultado = listajuegos.filter((obj) =>
          obj.nombre.toLowerCase().includes(category.toLowerCase())
        );

        console.log(resultado);

        return {
          value: category,
          label: (
            <>
              {resultado.map((val, key) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        window.location = "/productos/" + val.id;
                      }}
                      className="flex flex-row place-content-start m-1 mb-2 "
                    >
                      <img
                        className="w-14 h-10 rounded-lg border-2 border-blue-500"
                        src={val.ruta}
                        alt=""
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        className="hover:text-purple-700 hover:font-bold flex flex-row place-content-center text-center mt-2 ml-2 text-blue-900 font-semibold"
                      >
                        {val.nombre}
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ),
        };
      });

  const [options, setOptions] = useState([]);
  const [listapaises, setListapaises] = useState([]);
  const [datosjuego, setDatosjuego] = useState([]);
  const [paisactual, setPaisactual] = useState("1");
  const [actualizacarro, setActualizacarro] = useState(false);
  const [listapaquetesp, setListapaquetesp] = useState([]);
  const [asignacion, setAsignacion] = useState([]);

  const cambiacarro = (mensaje) => {
    if (actualizacarro === true) {
      setActualizacarro(false);
    } else {
      setActualizacarro(true);
    }
  };

  const getpreciosv = () => {
    console.log(params.idjuego);
    console.log(paisactual);
    console.log(obtenerasignacion());

    if (
      params.idjuego === undefined ||
      paisactual === undefined ||
      obtenerasignacion() === undefined
    ) {
    } else {
      axios
        .get(
          `../api/preciosv/${
            params.idjuego
          }/${paisactual}/${obtenerasignacion()}`
        )
        .then((response) => {
          setListapaquetesp(response.data);
        });
    }
  }; //LISTO

  const obtenerasignacion = () => {
    console.log(params.idjuego);
    for (let i = 0; i < asignacion.length; i++) {
      if (parseInt(asignacion[i].idj) === parseInt(params.idjuego)) {
        return asignacion[i].idp;
      }
    }
  };

  const getasignaciones = () => {
    axios.get(`../api/asignacion`).then((response) => {
      setAsignacion(response.data);
    });
  }; //LISTO

  const getpaises = () => {
    axios.get(`../api/paises/`).then((response) => {
      setListapaises(response.data);
    });
    chequearpaisactual();
  }; //LISTO

  const chequearpaisactual = () => {
    if (localStorage.getItem("powerpais") !== null) {
      setPaisactual(localStorage.getItem("powerpais"));
    } else {
      localStorage.setItem("powerpais", "1"); // crea la variable con un valor predeterminado
      setPaisactual("1");
    }
  };

  const obtenerpais = (id) => {
    for (let i = 0; i < listapaises.length; i++) {
      if (listapaises[i].id == id) {
        return listapaises[i].nombre;
      }
    }
  }; //LISTO

  const obtenerjuego = (id) => {
    console.log(id);
    for (let i = 0; i < listajuegos.length; i++) {
      console.log(listajuegos[i].id);
      if (listajuegos[i].id == id) {
        console.log(listajuegos[i].id);
        setDatosjuego({
          id: listajuegos[i].id,
          nombre: listajuegos[i].nombre,
          ruta: listajuegos[i].ruta,
          descripcion: listajuegos[i].descripcion,
        });
      }
    }
  }; //LISTO

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log(value);
  };

  const router = useRouter();
  const [selectmenu, setSelectmenu] = useState("juegos");
  const [listajuegos, setListajuegos] = useState([]);

  const opcion = (actual) => {
    setSelectmenu(actual);
  };

  const getjuegos = () => {
    axios.get(`../api/juegos/`).then((response) => {
      setListajuegos(response.data);
    });
  };

  useEffect(() => {
    console.log(listajuegos);
    obtenerjuego(params.idjuego);
  }, [listajuegos]);

  useEffect(() => {
    console.log(datosjuego);
  }, [datosjuego]);

  useEffect(() => {
    getjuegos();
    getpaises();
    getasignaciones();
  }, []);

  useEffect(() => {
    getpreciosv();
  }, [asignacion]);

  useEffect(() => {
    getpreciosv();
  }, [paisactual]);

  useEffect(() => {
    console.log(listapaquetesp);
  }, [listapaquetesp]);

  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <div className="m-0 h-full w-full p-0  bg-slate-900">
      <div className=" bg-black p-2 m-0 h-24 w-full flex place-content-between items-center border-b-2 border-b-blue-700">
        <div className="m-0 mt-[-20px]">
          <Image
            src={logo}
            alt="logo"
            priority
            className="h-full w-36 cursor-pointer"
            onClick={() => {
              window.location = "/";
            }}
          />
        </div>

        <div class="relative w-[40%] mt-[-10px]">
          <AutoComplete
            popupMatchSelectWidth="100%"
            style={{
              width: "100%",
            }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            size="large"
          >
            <Input.Search
              size="large"
              placeholder="Buscar Juegos..."
              enterButton
            />
          </AutoComplete>
        </div>

        <div>
          <select
            id="default"
            onChange={(e) => {
              setPaisactual(e.target.value);
              localStorage.setItem("powerpais", e.target.value);
            }}
            className="bg-gray-50 border ml-2 mt-4 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {listapaises.map((val, key) => {
              return (
                <>
                  {paisactual == val.id ? (
                    <option value={val.id} selected>
                      {val.nombre}
                    </option>
                  ) : (
                    <option value={val.id}>{val.nombre}</option>
                  )}
                </>
              );
            })}
          </select>
        </div>

        <Carrito
          idpais={paisactual}
          actualizacarro={actualizacarro}
          idjuego={params.idjuego}
        />
      </div>
      <Product
        tipo="Juegos"
        datosjuego={datosjuego}
        idpais={paisactual}
        cambiacarro={cambiacarro}
        listapaquetesp={listapaquetesp}
        listapaises={listapaises}
      />
      {/*PIE DE PAGINA */}
      <Footer />
    </div>
  );
}

export default Productos;

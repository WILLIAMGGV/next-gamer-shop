"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../img/V1.png";
import Menu from "./menu";
import Juegos from "./juegos";
import Paises from "./paises";
import Presupuesto from "./presupuesto";
import Bancos from "./bancos";
import Facturar from "./facturar";
import Informe from "./informe";

function Dashboard() {
  const router = useRouter();
  const [selectmenu, setSelectmenu] = useState("juegos");

  const opcion = (actual) => {
    setSelectmenu(actual);
    console.log("Actual " + actual);
  };

  const getProfile = async () => {
    const profile = await axios.get("/api/profile");
    setUser(profile.data);
  };

  const logout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
    router.push("/login");
  };

  return (
    <div className="m-0 h-full w-full p-0  bg-slate-900">
      <div className=" bg-black p-2 h-28 w-full flex place-content-between items-center border-b-2 border-b-blue-700">
        <div className="m-0">
          <Image src={logo} alt="logo" priority className="h-full w-36" />
        </div>

        <div className="flex">
          <div className="p-2">
            <div className="flex items-center gap-4 ">
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-500"
                src="https://picsum.photos/200"
                alt=""
              />
              <div className="font-medium dark:text-white">
                <div className="text-white max-md:hidden">William Godoy</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 max-md:hidden">
                  Administrador
                </div>
              </div>
            </div>
          </div>
          <div className="p-2">
            <button
              type="button"
              onClick={() => logout()}
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5.027 10.9a8.729 8.729 0 0 1 6.422-3.62v-1.2A2.061 2.061 0 0 1 12.61 4.2a1.986 1.986 0 0 1 2.104.23l5.491 4.308a2.11 2.11 0 0 1 .588 2.566 2.109 2.109 0 0 1-.588.734l-5.489 4.308a1.983 1.983 0 0 1-2.104.228 2.065 2.065 0 0 1-1.16-1.876v-.942c-5.33 1.284-6.212 5.251-6.25 5.441a1 1 0 0 1-.923.806h-.06a1.003 1.003 0 0 1-.955-.7A10.221 10.221 0 0 1 5.027 10.9Z" />
              </svg>
              Salir
            </button>
          </div>
          <div></div>
        </div>
      </div>
      <div className=" bg-sky-950 w-full p-2 m-0 h-[80%]">
        <h4 className="mb-1 flex place-content-start text-base font-semibold text-gray-900 md:text-lg dark:text-white">
          <spna className=" text-purple-500 text-2xl">
            Bienvenido&nbsp;&nbsp;
          </spna>{" "}
          <span className=" text-blue-500">William Godoy</span>
        </h4>

        <Menu opcion={opcion} />
        {selectmenu == "juegos" ? <Juegos /> : <></>}
        {selectmenu == "paises" ? <Paises /> : <></>}
        {selectmenu == "presupuesto" ? <Presupuesto /> : <></>}
        {selectmenu == "bancos" ? <Bancos /> : <></>}
        {selectmenu == "facturar" ? <Facturar /> : <></>}
        {selectmenu == "informe" ? <Informe /> : <></>}

        <div>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://toppower.com/" className="hover:underline">
              TopPowerGamers™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

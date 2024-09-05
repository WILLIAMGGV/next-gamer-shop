import { useState, useEffect } from "react";
const Carrito = ({ idpais, actualizacarro, idjuego }) => {
  const [carrito, setCarrito] = useState([]);
  const actualizarcarrito = () => {
    if (
      localStorage.getItem("powercarrito" + idpais + "J" + idjuego) !== null
    ) {
      var carrito2 = JSON.parse(
        localStorage.getItem("powercarrito" + idpais + "J" + idjuego)
      );
      setCarrito(carrito2.length);
    } else {
      localStorage.setItem(
        "powercarrito" + idpais + "J" + idjuego,
        JSON.stringify([])
      );
      setCarrito(0); // crea la variable con un valor predeterminado
    }
  };

  useEffect(() => {
    actualizarcarrito();
  }, [idpais, actualizacarro]);
  return (
    <>
      <div className="flex mt-[-10px]">
        <div className="p-2">
          <div className="">
            <button
              type="button"
              onClick={() => {
                window.location = "/checkout/" + idjuego;
              }}
              class=" w-full cursor:pointer text-blue-700  hover:text-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 "
            >
              <svg
                class="w-[47px] h-[47px] text-white hover:text-purple-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class=" absolute inline-flex items-center justify-center w-6 h-6 ml-8 mt-[-26px] text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                {carrito}
              </span>
            </button>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
};

export default Carrito;

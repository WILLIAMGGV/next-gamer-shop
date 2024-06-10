const menu = ({ opcion }) => {
  return (
    <div class="flex flex-wrap place-content-center max-md:place-content-around w-full p-2 bg-sky-950  rounded-lg ">
      <div className="m-2">
        <a
          onClick={() => {
            opcion("juegos");
          }}
          class="w-full cursor-pointer sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            class="w-[32px] h-[32px] text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            onClick={() => {
              opcion("juegos");
            }}
          >
            <path
              fill-rule="evenodd"
              d="M12 5a7 7 0 0 0-7 7v1.17c.313-.11.65-.17 1-.17h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6a3 3 0 0 1-3-3v-6a9 9 0 0 1 18 0v6a3 3 0 0 1-3 3h-2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h2c.35 0 .687.06 1 .17V12a7 7 0 0 0-7-7Z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="text-left rtl:text-right">
            <div class="mb-1 text-xs">&nbsp;&nbsp; Registro</div>
            <div class="-mt-1 font-sans text-sm font-semibold">
              &nbsp;&nbsp; Juegos
            </div>
          </div>
        </a>
      </div>

      <div className="m-2">
        <a
          onClick={() => {
            opcion("paises");
          }}
          class="w-full sm:w-auto cursor-pointer   bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            class="w-[32px] h-[32px] text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            onClick={() => {
              opcion("paises");
            }}
          >
            <path d="M13.09 3.294c1.924.95 3.422 1.69 5.472.692a1 1 0 0 1 1.438.9v9.54a1 1 0 0 1-.562.9c-2.981 1.45-5.382.24-7.25-.701a38.739 38.739 0 0 0-.622-.31c-1.033-.497-1.887-.812-2.756-.77-.76.036-1.672.357-2.81 1.396V21a1 1 0 1 1-2 0V4.971a1 1 0 0 1 .297-.71c1.522-1.506 2.967-2.185 4.417-2.255 1.407-.068 2.653.453 3.72.967.225.108.443.216.655.32Z" />
          </svg>

          <div class="text-left rtl:text-right">
            <div class="mb-1 text-xs">&nbsp;&nbsp; Lista de</div>
            <div class="-mt-1 font-sans text-sm font-semibold">
              &nbsp;&nbsp; Paises
            </div>
          </div>
        </a>
      </div>

      <div className="m-2">
        <a
          onClick={() => {
            opcion("presupuesto");
          }}
          class="w-full cursor-pointer sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            class="w-[32px] h-[32px] text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm2-2a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm0 3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm-6 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6Zm8 1v1h-2v-1h2Zm0 3h-2v1h2v-1Zm-4-3v1H9v-1h2Zm0 3H9v1h2v-1Z"
              clip-rule="evenodd"
            />
          </svg>

          <div class="text-left rtl:text-right">
            <div class="mb-1 text-xs">&nbsp;&nbsp; Crear</div>
            <div class="-mt-1 font-sans text-sm font-semibold">
              &nbsp;&nbsp; Presupuesto
            </div>
          </div>
        </a>
      </div>

      <div className="m-2">
        <a
          onClick={() => {
            opcion("bancos");
          }}
          class=" cursor-pointer w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            class="w-[32px] h-[32px] text-white"
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

          <div class="text-left rtl:text-right">
            <div class="mb-1 text-xs">&nbsp;&nbsp; Registro</div>
            <div class="-mt-1 font-sans text-sm font-semibold">
              &nbsp;&nbsp; Bancos
            </div>
          </div>
        </a>
      </div>

      <div className="m-2">
        <a
          href="#"
          class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            class="w-[32px] h-[32px] text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12 5a7 7 0 0 0-7 7v1.17c.313-.11.65-.17 1-.17h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6a3 3 0 0 1-3-3v-6a9 9 0 0 1 18 0v6a3 3 0 0 1-3 3h-2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h2c.35 0 .687.06 1 .17V12a7 7 0 0 0-7-7Z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="text-left rtl:text-right">
            <div class="mb-1 text-xs">&nbsp;&nbsp; Registro</div>
            <div class="-mt-1 font-sans text-sm font-semibold">
              &nbsp;&nbsp; Juegos
            </div>
          </div>
        </a>
      </div>

      <div className="m-2">
        <a
          href="#"
          class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            class="w-[32px] h-[32px] text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12 5a7 7 0 0 0-7 7v1.17c.313-.11.65-.17 1-.17h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6a3 3 0 0 1-3-3v-6a9 9 0 0 1 18 0v6a3 3 0 0 1-3 3h-2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h2c.35 0 .687.06 1 .17V12a7 7 0 0 0-7-7Z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="text-left rtl:text-right">
            <div class="mb-1 text-xs">&nbsp;&nbsp; Registro</div>
            <div class="-mt-1 font-sans text-sm font-semibold">
              &nbsp;&nbsp; Juegos
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default menu;

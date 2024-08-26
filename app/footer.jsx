import logo from "./img/V1.png";
import Image from "next/image";
const Footer = () => {
  return (
    <>
      <div className=" bg-black p-2 m-0 h-full max-md:items-end w-full flex max-md:flex-col-reverse max-md:grid-cols-2 place-content-between items-center border-t-2 border-t-blue-700">
        <div className="m-0 max-md:mt-1 mt-[-10px] ">
          {/* <Image src={logo} alt="logo" priority className="h-[60px] w-36" /> */}
          <span className="text-blue-400">
            © 2024 TopPowerGamers™. All Rights Reserved.
          </span>
        </div>
        <div className="md:hidden mb-2 mt-2 ml-20 h-[4px] rounded-lg w-[70%] bg-gradient-to-tr from-slate-500 to-slate-900 text-white"></div>

        <div className="flex mt-[-10px] max-md:place-content-end max-md:mb-4  max-md:h-[40px]">
          <span className="text-white mt-6 mr-4">Siguenos en: </span>
          <div className=" flex flex-row mt-2 ">
            <div className="">
              <button
                type="button"
                class=" w-full  text-blue-700  hover:text-white font-medium rounded-lg text-sm text-center inline-flex items-center "
              >
                <svg
                  class="w-[48px] h-[48px] text-white hover:text-green-500 cursor-pointer"
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
              </button>
            </div>
            <div className="">
              <button
                type="button"
                class=" w-full  text-blue-700  hover:text-white font-medium rounded-lg text-sm text-center inline-flex items-center "
              >
                <svg
                  class="w-[48px] h-[48px] text-white hover:text-fuchsia-800 cursor-pointer"
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
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="">
              <button
                type="button"
                class=" w-full  text-blue-700  hover:text-white font-medium rounded-lg text-sm text-center inline-flex items-center "
              >
                <svg
                  class="w-[48px] h-[48px] text-white hover:text-blue-600 cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default Footer;

const Products = ({ tipo, listadejuegos }) => {
  return (
    <>
      <div className="h-14 bg-gray-800 shadow-2xl acme-regular font-bold text-2xl pt-[10px] text-white shadow-blue-600">
        <span className="ml-12">{tipo}</span>
      </div>

      <div className="ml-4 mr-4 max-md:ml-2  max-md:mr-2 flex flex-wrap md:grid-cols-2 place-content-around">
        {listadejuegos.map((val, key) => {
          return (
            <div className="flex flex-col w-[300px] max-md:w-[180px]  p-4 cursor-pointer  ">
              <div className="hover:bg-gradient-to-tr hover:from-blue-950 hover:to-purple-600 bg-gradient-to-tr from-white to-blue-400 hover:border-2 text-blue-900 hover:text-white rounded-xl bg-white">
                <img
                  className="rounded-t-xl shadow-2xl w-full h-40 max-md:h-[110px]"
                  src={val.ruta}
                  onClick={() => {
                    window.location = "productos/" + val.id;
                  }}
                  alt=""
                />
                <span className="flex flex-col h-20 max-md:h-16 text-center font-bold acme-regular text-[16px] max-md:m-2  max-md:text-[14px] max-md:pt-2  pt-8 rounded-b-lg">
                  {val.nombre}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;

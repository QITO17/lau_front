import Logo from "/public/ctm2.jpeg";


const Moviles = ({ isModalOpen, openModal, closeModal, MovilesState }) => {
  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        type="button"
        onClick={openModal}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-2 py-1 transition-colors shadow-md"
      >
        Móviles
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl relative w-full max-w-3xl max-h-[90vh] overflow-hidden">
            
            {/* Encabezado del modal */}
            <div className="flex justify-between items-center border-b p-4 bg-green-500 rounded-t-2xl">
              <h2 className="text-white text-xl font-bold">MÓVILES CTM</h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-white text-2xl hover:text-gray-200 transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Cuerpo con scroll */}
            <div className="p-6 overflow-y-auto max-h-[75vh] custom-scrollbar">
              <div className="flex justify-center mb-6">
                <img
                  className="h-64 w-auto rounded-md shadow-md object-contain"
                  src={Logo}
                  alt="Logo"
                />
              </div>

              {/* Tabla de móviles */}
              <table className="w-full text-sm text-left text-gray-800">
                <thead className="text-xs uppercase bg-green-500 text-white">
                  <tr>
                    <th scope="col" className="py-3 px-6 text-lg">Móvil</th>
                    {/* Si deseas, puedes volver a habilitar las columnas aquí */}
                  </tr>
                </thead>
                <tbody>
                  {MovilesState?.Turnos.map((movil, index) => (
                    <tr key={movil.id} className="border-b hover:bg-gray-100 transition">
                      <td className="py-4 px-6 text-[18px]">
                        <span className="font-semibold text-green-600">{index + 1}º</span> {movil.movil}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Moviles;

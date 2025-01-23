import React, { useEffect, useState } from "react";
import Logo from "/public/ctm2.jpeg";
import axios from "axios";

const Moviles = ({ isModalOpen, openModal, closeModal, MovilesState }) => {
  const [setinfoMovil2, setsetinfoMovil2] = useState("");

  // const fetchServicios = () => {
  //   axios
  //   .get("https://laureles-ap.onrender.com/api/v1/movil/movil")
  //   .then((res) => setsetinfoMovil2(res.data))
  //   .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   fetchServicios();
   
  // }, []);

  
  // console.log(setinfoMovil2, " pandas ");
  //MovilesState?.Turnos
  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        type="button" // Añadir type="button"
        onClick={openModal}
        className="bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 focus:outline-none transition-colors"
      >
        Moviles
      </button>

      {/* Superposición del modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg relative max-w-[800px] w-full">
            {/* Contenedor con altura fija y scroll */}
            <div className="max-h-[80vh] overflow-y-auto p-6">
              {/* Botón para cerrar el modal */}
              <button
                type="button" // Añadir type="button"
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              >
                {/* &times; */}❌
              </button>
              <h2 className="text-xl font-semibold mb-4">MOVILES CTM</h2>
              <div className="flex justify-between items-center">
                <p>Moviles Enturnados.</p>
                <img className="mb-3 h-[350px] pb-4" src={Logo} alt="" />
              </div>

              <div className="mt-4">
                {/* Puedes colocar el contenido que desees dentro del modal aquí */}
                <table className="w-full text-sm text-left text-black dark:text-black border p-2">
                  <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-green-500 dark:text-white">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        Movil
                      </th>
                      {/* <th scope="col" className="py-3 px-6">
                        Placa
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Marca
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Nombre
                      </th> */}
                      <th scope="col" className="py-3 px-6">
                        Cedula
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MovilesState?.Turnos.map((movil) => (
                      <tr
                        className="bg-white border-b dark:bg-white dark:border-gray-700"
                        key={movil.id}
                      >
                        <td className="py-4 px-6">{movil.movil}</td>
                        {/* <td className="py-4 px-6">{movil.placa}</td>
                        <td className="py-4 px-6">{movil.marca}</td>
                        <td className="py-4 px-6">{movil.nomconduce}</td> */}
                        <td className="py-4 px-6">{movil.cedconduce}</td>
                      </tr>
                    ))}

                    {/* value={movil} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Moviles;

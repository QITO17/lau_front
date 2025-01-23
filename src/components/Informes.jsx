import React, { useState } from "react";
import * as XLSX from "xlsx";
import ctm from "../../public/ctm.png";
import { Link } from "react-router-dom";
const ExportReportButton = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      // Hacer la petición a la API para obtener los datos del informe
      const response = await fetch(
        "https://laureles-ap.onrender.com/api/v1/servicio/servicio"
      ); // Cambia esto con tu endpoint
      const data = await response.json();

      console.log(data.Servicios);
      // Convertir los datos del informe a formato de Excel
      const ws = XLSX.utils.json_to_sheet(data.Servicios); // Convierte JSON a una hoja de trabajo (worksheet)
      const wb = XLSX.utils.book_new(); // Crea un nuevo libro de trabajo
      XLSX.utils.book_append_sheet(wb, ws, "Informe"); // Añade la hoja al libro

      // Exportar el libro a un archivo Excel
      XLSX.writeFile(wb, "informe.xlsx");
    } catch (error) {
      console.error("Error al generar el informe:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport1 = async () => {
    setLoading1(true);
    try {
      // Hacer la petición a la API para obtener los datos del informe
      const response = await fetch(
        "https://laureles-ap.onrender.com/api/v1/clientes/clientes"
      ); // Cambia esto con tu endpoint
      const data = await response.json();
      // Convertir los datos del informe a formato de Excel
      const ws = XLSX.utils.json_to_sheet(data.Cliente); // Convierte JSON a una hoja de trabajo (worksheet)
      const wb = XLSX.utils.book_new(); // Crea un nuevo libro de trabajo
      XLSX.utils.book_append_sheet(wb, ws, "clientes"); // Añade la hoja al libro

      // Exportar el libro a un archivo Excel
      XLSX.writeFile(wb, "clientes.xlsx");
    } catch (error) {
      console.error("Error al generar el informe:", error);
    } finally {
      setLoading1(false);
    }
  };

  const handleExport2 = async () => {
    setLoading2(true);
    try {
      // Hacer la petición a la API para obtener los datos del informe
      const response = await fetch(
        "https://laureles-ap.onrender.com/api/v1/movil/movil"
      ); // Cambia esto con tu endpoint
      const data = await response.json();
      console.log(response, "");
      console.log(data);
      console.log(data.Movil);
      // Convertir los datos del informe a formato de Excel
      const ws = XLSX.utils.json_to_sheet(data.Movil); // Convierte JSON a una hoja de trabajo (worksheet)
      const wb = XLSX.utils.book_new(); // Crea un nuevo libro de trabajo
      XLSX.utils.book_append_sheet(wb, ws, "Conductores"); // Añade la hoja al libro

      // Exportar el libro a un archivo Excel
      XLSX.writeFile(wb, "Conductores.xlsx");
    } catch (error) {
      console.error("Error al generar el informe:", error);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center  max-w-[1300px] mx-auto px-10 py-4">
      <div className="flex items-center justify-between w-full">
        <div className="w-[180px] ">
          <img src={ctm} alt="" />
        </div>
        <div>
          <Link to="/principal" className="w-full p-3 text-center text-white bg-green-500 rounded-md font-medium text-lg transition transform hover:scale-105 hover:bg-teal-500 focus:ring-4 focus:ring-green-300 active:scale-95 ease-in-out duration-200"
          >Inicio</Link>
        </div>
      </div>
      <div className="w-full flex items-center gap-10 flex-col">
        <h1 className="text-3xl text-center">Realiza tus informes</h1>
        <div className="flex gap-4 items-center justify-evenly w-full">
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl max-w-md mx-auto overflow-hidden">
            <div className="w-full h-[160px] bg-gradient-to-r from-green-400 to-teal-500">
              {/* Aquí podrías agregar una imagen o icono si lo deseas */}
            </div>
            <div className="p-6 flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-800 text-center leading-tight">
                Generar Reporte de Servicios
              </h2>
              <a
                href="#"
                className="w-full py-3 text-center text-white bg-green-500 rounded-md font-medium text-lg transition transform hover:scale-105 hover:bg-teal-500 focus:ring-4 focus:ring-green-300 active:scale-95 ease-in-out duration-200"
                aria-label="Generar reporte de cariñosas" onClick={handleExport} disabled={loading}
              >
                 {loading ? 'Generando Informe...' : ' Informe Servicios'}
              </a>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl max-w-md mx-auto overflow-hidden">
            <div className="w-full h-[160px] bg-gradient-to-r from-green-400 to-teal-500">
              {/* Aquí podrías agregar una imagen o icono si lo deseas */}
            </div>
            <div className="p-6 flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-800 text-center leading-tight">
                Generar Reporte de Clientes
              </h2>
              <a
                href="#"
                className="w-full py-3 text-center text-white bg-green-500 rounded-md font-medium text-lg transition transform hover:scale-105 hover:bg-teal-500 focus:ring-4 focus:ring-green-300 active:scale-95 ease-in-out duration-200"
                aria-label="Generar reporte de cariñosas" onClick={handleExport1} disabled={loading1}
              >
                {loading ? 'Generando Informe...' : ' Informe Clientes'}
              </a>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl max-w-md mx-auto overflow-hidden">
            <div className="w-full h-[160px] bg-gradient-to-r from-green-400 to-teal-500">
              {/* Aquí podrías agregar una imagen o icono si lo deseas */}
            </div>
            <div className="p-6 flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-800 text-center leading-tight">
                Generar Reporte de Conductores
              </h2>
              <a
                href="#"
                className="w-full py-3 text-center text-white bg-green-500 rounded-md font-medium text-lg transition transform hover:scale-105 hover:bg-teal-500 focus:ring-4 focus:ring-green-300 active:scale-95 ease-in-out duration-200"
                aria-label="Generar reporte de Conductores" onClick={handleExport2} disabled={loading2}
              >
               {loading ? 'Generando Informe...' : ' Informe Conductores'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReportButton;

// src/components/ScrollableTable.jsx

import React from 'react';
import Logo from "/public/ctm2.jpeg";
import Logo2 from "/public/tolan2.png";


const ScrollableTable = ({ servicios }) => {
   
  return (
    <div className="container mx-auto p-2 ">
      <div className='flex justify-between items-center'>
        <img className="mb-3 h-[150px] pb-4" src={Logo2} alt="" />
        <div>
            <img className="mb-3 mx-auto h-[300px] pb-4" src={Logo} alt="" />
        </div>
      </div>

      <p className=' font-bold text-[20px]'>Servicios</p>
      <div className="overflow-y-auto" style={{ maxHeight: '65vh' }}>
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="p-4 w-1/3">Telefono</th>
              <th className="p-4 w-1/3">Usuario</th>
              <th className="p-4 w-1/3">Dirección</th>
              <th className="p-4 w-1/3">Movil</th>
              <th className="p-4 w-1/3">Barrio</th>
              <th className="p-4 w-1/5">Fecha</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {servicios.Servicios?.map((item, index) => (
              <tr key={index} className="border-b">
              
                <td className="p-4 w-1/4">{item.telefono}</td>
                <td className="p-4 w-1/4">{item.usuario}</td>
                <td className="p-4 w-1/4">{item.direccion}</td>
                <td className="p-4 w-1/4">{item.movil}</td>
                <td className="p-4 w-1/4">{item.barrio}</td>
                <td className="p-4 w-1/4">{item.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScrollableTable;
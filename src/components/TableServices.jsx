import Logo from "/public/ctm2.jpeg";
import Logo2 from "/public/tolan2.jpg";

const ScrollableTable = ({ servicios }) => {
  return (
    <div className="container p-4  ">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <img className="mb-3 h-[150px] pb-4" src={Logo2} alt="" />
        <div>
          <img className="mb-3 mx-auto h-[300px] pb-4" src={Logo} alt="" />
        </div>
      </div>

      {/* Title Section */}
      <section className="mb-2">
        <h2 className="text-2xl font-bold text-green-700 mb-2 border-b pb-2">
          📋 Servicios
        </h2>
      </section>

      {/* Table Section */}
      <section className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div
          className="overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-100 hover:scrollbar-thumb-green-600 transition-all"
          style={{
            maxHeight: "65vh",
            scrollBehavior: "smooth",
          }}
        >
          <table className="min-w-full divide-y divide-gray-200 relative">
            <thead className="bg-green-600 sticky top-0 z-10">
              <tr>
                <th className="px-2 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-2 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-2 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-2 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Móvil
                </th>
                <th className="px-2 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Barrio
                </th>
                <th className="px-2 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200">
              {servicios.Servicios?.map((item, index) => {
                const newDate = new Date(item.createdAt).toLocaleString(
                  "es-ES",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }
                );
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors duration-150 even:bg-gray-50 odd:bg-white"
                  >
                    <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900">
                      {item.telefono}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap  text-gray-800">
                      {item.usuario}
                    </td>
                    <td className="px-2 py-4  text-gray-800">
                      {item.direccion}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap  text-gray-800">
                      {item.movil}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap  text-gray-800">
                      {item.barrio}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap  text-gray-800">
                      {newDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ScrollableTable;

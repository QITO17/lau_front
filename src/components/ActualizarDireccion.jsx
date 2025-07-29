import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "sonner";

const ActualizarDireccion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [celular, setCelular] = useState("");
  const [direccionEncontrada, setDireccionEncontrada] = useState("");
  const [direccionEditable, setDireccionEditable] = useState("");
  const [cargando, setCargando] = useState(false);
  const [actualizando, setActualizando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const handleBuscar = async () => {
    setCargando(true);

    try {
      await axios
        .get(
          `https://laureles-ap.onrender.com/api/v1/clientes/clientes/${celular.trim()}`
        )
        .then(({ data }) => {
          setDireccionEncontrada(data.Cliente.direccion);
          setDireccionEditable(data.Cliente.direccion);
          setCargando(false);
          toast.success("Dirección encontrada correctamente");
        });
    } catch (error) {
      console.error("Error al buscar la dirección:", error);
      toast.error("Error al buscar la dirección.");
      setCargando(false);
    }
  };

  const handleActualizar = async () => {
    setActualizando(true);
    try {
      const response = await axios.patch(
        `https://laureles-ap.onrender.com/api/v1/clientes/clientes/${celular}`,
        {
          direccion: direccionEditable,
          barrio: "Laureles",
        }
      );
      const { ClientesActualizado } = response.data;
      setDireccionEncontrada(ClientesActualizado.direccion);
      setDireccionEditable(ClientesActualizado.direccion);
      setActualizando(false);
      toast.success("Dirección actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar la dirección:", error);
      toast.error("Error al actualizar la dirección.");
      setIsOpen(false); // Cerrar el modal en caso de error
      setActualizando(false);
    }
  };

  const handleEliminar = async () => {
    setEliminando(true);
    try {
      await axios.delete(
        `https://laureles-ap.onrender.com/api/v1/clientes/clientes/${celular}`
      );

      toast.success("Dirección eliminada correctamente");
      setDireccionEncontrada("No encontrada");
      setDireccionEditable("");
      setEliminando(false);
      setDireccionEditable("");
      setDireccionEncontrada("");
      setCelular("");
    } catch (error) {
      console.error("Error al eliminar la dirección:", error);
      toast.error("Error al eliminar la dirección.");
      setEliminando(false);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    setCelular("");
    setDireccionEncontrada("");
    setDireccionEditable("");
    setCargando(false);
    setEliminando(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="bg-yellow-500 text-white rounded-md px-2 py-1 hover:bg-yellow-600 focus:outline-none transition-colors"
      >
        Dirección
      </button>

      {isOpen && (
        <Modal title="Actualizar Dirección" onClose={() => setIsOpen(false)}>
          <div className="space-y-4">
            {/* Input celular */}
            <input
              type="number"
              placeholder="Número de celular"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />

            <button
              onClick={handleBuscar}
              disabled={cargando || !celular.trim()}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {cargando ? "Buscando..." : "Buscar dirección"}
            </button>

            {/* Mostrar dirección encontrada */}
            {direccionEncontrada && (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Dirección encontrada:
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={direccionEditable}
                  onChange={(e) => setDireccionEditable(e.target.value)}
                  disabled={direccionEncontrada === "No encontrada"}
                />

                {/* Botón eliminar */}
                <button
                  onClick={handleEliminar}
                  disabled={eliminando}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50 mt-2"
                >
                  {eliminando ? "Eliminando..." : "Eliminar dirección"}
                </button>
              </>
            )}

            {/* Botones */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => handleClose()}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleActualizar}
                disabled={actualizando || !direccionEditable.trim()}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
              >
                {actualizando ? "Actualizando..." : "Actualizar dirección"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ActualizarDireccion;

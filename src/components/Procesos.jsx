import React, { useState } from "react";
import Logo from "/public/ctm2.jpeg";
import axios from "axios";
import { Toaster, toast } from "sonner";

const Procesos = ({ isModalOpen2, openModal2, closeModal2 }) => {
  const [movil, setMovil] = useState("");
  const [conductor, setConductor] = useState("");
  const [motivo, setMotivo] = useState("");
  const [fechaInicia, setFechaInicia] = useState("");
  const [fechaFinaliza, setFechaFinaliza] = useState("");

  const limpiar = () => {
    console.log("Limpie");
    setMovil("");
    setConductor("");
    setMotivo("Motivo 1");
    setFechaInicia("");
    setFechaFinaliza("");
  };

  const handleSubmit = async () => {
    const fechaInicioDate = new Date(fechaInicia);
    const fechaFinalizaDate = new Date(fechaFinaliza);
    const diferenciaEnMilisegundos = fechaFinalizaDate - fechaInicioDate;
    const diferenciaEnDias = Math.floor(
      diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
    );
    console.log(`Diferencia en días: ${diferenciaEnDias}`);

    const token = localStorage.getItem("token");
    let dataCrearBloq;

    await axios
      .get(`https://laureles-ap.onrender.com/api/v1/movil/movil/${movil}`)
      .then((res) => {
        if (res.data.Movil.cedconduce) {
          dataCrearBloq = {
            movil,
            fechaini: fechaInicia,
            cedconduce: res.data.Movil.cedconduce,
            fecfin: fechaFinaliza,
            motivo,
            notas: "Nota prueba",
            usrgraba: "Central",
          };
        } else {
          alert("El movil no esta en el maestro comunicarse con SISTEMAS");
        }
      })
      .catch((err) => {
        alert("El movil no esta en el maestro comunicarse con SISTEMAS");
        console.log(err);
      });

    console.log("Hola soy dataa ", dataCrearBloq);
   
    await axios
      .post("https://laureles-ap.onrender.com/api/v1/bloq/bloqueos", dataCrearBloq)
      .then((res) => {
        toast.success("Mensaje", {
          description: `Bloqueado con éxito`,
        });
      })
      .catch((err) => console.log(err));

    limpiar();
  };

   const validBloq = async () => {

    let respuesta;

    await axios
      .get(`http://localhost:3001/api/v1/bloq/bloqueos/${movil}`)
      .then((res) => {
        respuesta = confirm('Ya está bloqueado, ¿desea desbloquearlo?')        
      })
      .catch((err) => {
        console.clear();        
      });

      if(respuesta) await axios.delete(`http://localhost:3001/api/v1/bloq/bloqueos/${movil}`)

  };


  return (
    <>
      <Toaster position="top-right" richColors />
      <div className=" text-gray-600 ">
        {/* Botón para abrir el modal */}
        <span onClick={openModal2} className="text-white p-1">
          Procesos
        </span>

        {/* Superposición del modal */}
        {isModalOpen2 && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg relative max-w-lg w-full">
              {/* Contenedor con altura fija y scroll */}
              <div className="max-h-[80vh] overflow-y-auto p-6">
                {/* Botón para cerrar el modal */}
                <span
                  onClick={closeModal2}
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                >
                  ❌
                </span>
                <div className=" flex flex-col justify-between gap-2 items-center">
                  <h2 className="font-semibold text-xl text-gray-600 mb-4">
                    Procesos
                  </h2>
                  <img className="mb-3 w-[150px] h-full pb-4" src={Logo} alt="" />
                </div>

                <p className="text-gray-500 mb-6">Bloqueos</p>

                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 justify-center lg:grid-cols-2 items-center">
                    {/* <div className="text-gray-600">
                    <p className="font-medium text-lg">Detalles Personales</p>
                    <p>Por favor, completa todos los campos.</p>
                  </div> */}

                    <div className="lg:col-span-2 items-center">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                          <label htmlFor="full_name">Movil</label>
                          <input
                            value={movil}
                            required
                            onChange={(e) => setMovil(e.target.value)}
                            onBlur={validBloq}
                            type="text"
                            id="Movil"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="Movil"
                          />
                        </div>

                        {/* <div className="md:col-span-5">
                          <label htmlFor="text">Conductor</label>
                          <input
                            value={conductor}
                            required
                            onChange={(e) => setConductor(e.target.value)}
                            type="text"
                            id="Conductor"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="Conductor"
                          />
                        </div> */}

                        <div className="md:col-span-3">
                          <label htmlFor="motivo">Motivo</label>
                          <select
                            id="motivo"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                          >
                            <option value="Motivo 1" disabled>
                              Selecciona un motivo
                            </option>
                            <option value="motivo1">CARTERA</option>
                            <option value="motivo2">Menoscabar el buen nombre CTM</option>
                            <option value="motivo3">Presentarse en Embriaguez/Drog</option>
                            <option value="motivo4">Utilizar Alrededores como Baño</option>

                            <option value="motivo5">Negarse a Prestar Servicio</option>
                            <option value="motivo6">Agredir Compañero/Usuario/Empl</option>
                            <option value="motivo7">Utilizar Acopio como Taller</option>
                            <option value="motivo8">Usar Sudadera/Chanclas/Gorra</option>

                            <option value="motivo9">No tener vehiculo Aseado</option>
                            <option value="motivo10">No tener Esquemas o Movil</option>
                            <option value="motivo11">Desacato a personal Autorizado</option>
                            <option value="motivo12">Retardarse en prestar Servicio</option>

                            <option value="motivo13">Utilizar celdas como Parqueo</option>
                            <option value="motivo14">No enturnarse inmediatamente</option>
                            <option value="motivo15">Mal Parqueo</option>
                            <option value="motivo16">Enturnarse con Carnet Diferent</option>

                            <option value="motivo17">Prestar el carnet</option>
                            <option value="motivo18">Ceder el turno</option>
                            <option value="motivo19">Llevarse el servicio</option>
                            <option value="motivo20">No prestar servicio de VALES</option>

                            <option value="motivo21">No Cambiar aceite en CTM</option>
                            <option value="motivo22">Orden Gerencia / Consejo</option>
                            <option value="motivo23">NO DESENTURNARSE</option>
                          </select>
                        </div>

                        {/* <div className="md:col-span-2">
                        <label htmlFor="city">Tiempo</label>
                        <input
                          type="date"
                          id="Tiempo"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Tiempo"
                          onChange={(e) => (e.target.value)}

                        />
                      </div> */}

                        <div className="md:col-span-2">
                          <label htmlFor="country">Inicia</label>
                          <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                            <input
                              value={fechaInicia}
                              required
                              onChange={(e) => setFechaInicia(e.target.value)}
                              type="date"
                              id="Inicia"
                              placeholder="Inicia"
                              className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="state">Finaliza</label>
                          <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                            <input
                              value={fechaFinaliza}
                              required
                              onChange={(e) => setFechaFinaliza(e.target.value)}
                              type="date"
                              id="Finaliza"
                              placeholder="Finaliza"
                              className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-5 text-right">
                          <div className="inline-flex items-end">
                            <p
                              onClick={handleSubmit}
                              className="bg-blue-500 hover:bg-blue-700 text-gray-600 font-bold py-2 px-4 rounded"
                            >
                              Enviar
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Procesos;

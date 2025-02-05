import React, { useEffect, useState } from "react";
import ScrollableTable from "./TableServices";
import Moviles from "./Moviles";
import Procesos from "./Procesos";
import axios from "axios";
import { format } from "date-fns";
import { Toaster, toast } from "sonner";
import SweetAlert2 from "react-sweetalert2";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const socket = io("https://laureles-ap.onrender.com", {
  withCredentials: true
}); // URL del servidor

const Servicio = ({
  servicios,
  MovilesState,
  handleUpdateMoviles,
  setServicios,
}) => {
  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [swalProps, setSwalProps] = useState({});
  const channel = new BroadcastChannel("mi-canal");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const actualizaInfoSockets = async () => {
    await axios
      .get("https://laureles-ap.onrender.com/api/v1/servicio/servicio")
      .then((res) => {
        channel.postMessage(res.data);
        setServicios(res.data);
        console.log("YA ENVIE CHANNEL");
        console.log(1);
      })
      .catch((err) => console.log(err));
    // Limpiar el canal al desmontar el componente
  };
  useEffect(() => {
    socket.on("dbChange", (data) => {
      console.log("Cambio en la base de datos:", data);
      //setServicios(servicios)
      actualizaInfoSockets();
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Limpiar el evento al desmontar el componente
    return () => {
      socket.off("dbChange");
    };
  }, []);

  useEffect(() => {
    channel.onmessage = (event) => {
      if (event.data === "nuevoDatoCreado") {
        // Actualiza el estado o realiza la solicitud para obtener los datos
        console.log("Nuevo dato creado, actualiza la vista");
        // Aquí podrías hacer una nueva petición GET
      }
    };
  }, [channel]);

  const handleClick = () => {
    setSwalProps({
      show: true,
      title: "Servicio Enviado Con Éxito",
      text: "El servicio se ha enviado correctamente",
    });
  };

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
    handleUpdateMoviles();
  };

  const redirige = () => {
     navigate("/principal");
  }
  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  // Función para abrir el modal
  const openModal2 = () => setIsModalOpen2(true);
  // Función para cerrar el modal
  const closeModal2 = () => setIsModalOpen2(false);
  const [linea, setLinea] = useState("");
  const [movil1, setMovil1] = useState("");
  const [usuario, setUsuario] = useState("");
  const [direccion, setDireccion] = useState("");
  const [barrio, setbarrio] = useState("Laureles");
  // const [nombreUsuario, setnombreUsuario] = useState("");

  const imprimir = (data) => {
    console.log('Soy data ', data)
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];
    let fecha = fechaFormateada;
    const fechaHora = new Date();
    const horaFormateada = fechaHora.toLocaleTimeString();
    let hora = horaFormateada
    console.log('Holita')
    console.log('Hola soy hora ', hora)
    console.log('Hola soy hora ', fecha)
    const payload =
      `{"nombreImpresora":"Gereri2",
      "serial":"MGE4NTNlM2VfXzIwMjUtMDEtMDlfXzIwMjUtMDItMDgjIyNWR1dlYm5HRGkwYWZCelpoU05rb1BEQlQ1cGFKS29rZnVkSC9CNUp1Z3dVb3JSc2traUFQMHFBS2JrSVB3Sjd5L3pjWVkrZklZMmgvL2F6WU1VWWRXN1FybkhBd0oybDAyNUh0Y2psOTFWb1pBWGVpdnlJYmt6YXJHNXNoeG01eXg3TFJNeXRRVVBWV0RuOG43MzNJYU1zWkNrVUZrMVhaMVVoMGVNS1NrcU9CRXZuMFZjR2N0SnU4ZlhRUEtTZXdoTzRhYXNTNEpPZVJRNmJDL0t0aitBRTFYdjRveEVIbWF6U0J0Zkp3dHZNSytKUjlmNCs0N1ZRVEN1NnJyaG13dGpENmh3OTlLd2FQUy96cDdURTVGTTZRcUJqd1J3ZlVLWmZKWktYaUZxV2dEdTZWYXJ2MkFMenRGYitNeXNqaDlVdzhFQWNnT1U1KzhseTR2QUh2eldLZlZ5amtXOWtON2ZGWlB4d0RLaHRwYWZyVkVpaXpoYVZiQlJRQzNyNUNXbyt3L0VqY1FFa2xDMityamMrN3pISkV0RnNIY1VEdVpPSkpsYi8rRUx0T0hiVHNZTHI2aS8zWkhTb3Q2UHVlay9ndEh5UCsxZTBoTUVqRU5kcHpUZHZSV3I2NnBWT3IzODNxMXhkVnhTVzdYVE9iN0k3V0ZFeVJVTW1SSmczamloY3ZXS0V4QTFMUWZoUythS05WRFNibXp1UGNhb0VocHd1OGJNNzFtMVJXL3hNNk1weHZCczlnVGFpY3MvRkpEd04vdGowM2xmS3VLME4rUlpGaHhRVnR2MW5iVUMvS25pU1RYRjVZZmt6TTVIV29xeldLYjJmR2hMeEpsT1Mvc3E2UFBNa0hDYitHRlUzWmNWMGlPbE4rbjBjUEVic1pETTdWSzdWVEcwWT0=",
      "operaciones":
      [ 
      {"nombre":"EstablecerTamañoFuente","argumentos":[3,2]},
      {"nombre":"EstablecerEnfatizado","argumentos":[true]},
      {"nombre":"EstablecerAlineacion","argumentos":[1]},
      {"nombre":"EstablecerSubrayado","argumentos":[false]},
      {"nombre":"EstablecerImpresionAlReves","argumentos":[false]},
      {"nombre":"EstablecerImpresionBlancoYNegroInversa","argumentos":[false]},
      {"nombre":"EstablecerRotacionDe90Grados","argumentos":[false]},
      {"nombre":"EscribirTexto","argumentos":["\\n\\n\\nCTM COOTRANSMEDE"]}
      ,{"nombre":"Feed","argumentos":[1]},{"nombre":"EstablecerTamañoFuente","argumentos":[2,2]},
      {"nombre":"EstablecerEnfatizado","argumentos":[true]},{"nombre":"EstablecerAlineacion","argumentos":[1]},
      {"nombre":"EstablecerSubrayado","argumentos":[false]},{"nombre":"EstablecerImpresionAlReves","argumentos":[false]},
      {"nombre":"EstablecerImpresionBlancoYNegroInversa","argumentos":[false]},
      {"nombre":"EstablecerRotacionDe90Grados","argumentos":[false]},
      {"nombre":"EscribirTexto","argumentos":["Acopio Exclusivo\\nSector de Laureles\\n\\n\\nSu Movil Seguro"]},
      {"nombre":"Feed","argumentos":[1]},
      {"nombre":"EstablecerTamañoFuente","argumentos":[4,3]},
      {"nombre":"EstablecerEnfatizado","argumentos":[true]},
      {"nombre":"EstablecerAlineacion","argumentos":[1]},
      {"nombre":"EstablecerSubrayado","argumentos":[false]},
      {"nombre":"EstablecerImpresionAlReves","argumentos":[false]},
      {"nombre":"EstablecerImpresionBlancoYNegroInversa","argumentos":[false]},
      {"nombre":"EstablecerRotacionDe90Grados","argumentos":[false]},{"nombre":"EscribirTexto","argumentos":["${data.creado.movil}\\n\\n"]},
      {"nombre":"Feed","argumentos":[1]},{"nombre":"EstablecerTamañoFuente","argumentos":[2,1]},{"nombre":"EstablecerEnfatizado","argumentos":[true]},
      {"nombre":"EstablecerAlineacion","argumentos":[1]},{"nombre":"EstablecerSubrayado","argumentos":[false]},
      {"nombre":"EstablecerImpresionAlReves","argumentos":[false]},{"nombre":"EstablecerImpresionBlancoYNegroInversa","argumentos":[false]},
      {"nombre":"EstablecerRotacionDe90Grados","argumentos":[false]},
      {"nombre":"EscribirTexto","argumentos":
      ["Fecha de solicitud del servicio ${fecha}\\nHora de solicitud del servicio ${hora}\\nDireccion: ${data.creado.direccion}\\n\\n"]}
      ,{"nombre":"Feed","argumentos":[1]},{"nombre":"EstablecerTamañoFuente","argumentos":[2,1]},{"nombre":"EstablecerEnfatizado","argumentos":[true]},
      {"nombre":"EstablecerAlineacion","argumentos":[1]},{"nombre":"EstablecerSubrayado","argumentos":[false]},{"nombre":"EstablecerImpresionAlReves","argumentos":[false]},
      {"nombre":"EstablecerImpresionBlancoYNegroInversa","argumentos":[false]},{"nombre":"EstablecerRotacionDe90Grados","argumentos":[false]},
      {"nombre":"EscribirTexto","argumentos":["PQRS: pqrs@ctmcootransmede.com\\n"]},{"nombre":"Feed","argumentos":[1]},
      
      {"nombre":"EstablecerTamañoFuente","argumentos":[2,1]},{"nombre":"EstablecerEnfatizado","argumentos":[true]},
      {"nombre":"EstablecerAlineacion","argumentos":[1]},{"nombre":"EstablecerSubrayado","argumentos":[false]},
      {"nombre":"EstablecerImpresionAlReves","argumentos":[false]},{"nombre":"EstablecerImpresionBlancoYNegroInversa","argumentos":[false]},
      {"nombre":"EstablecerRotacionDe90Grados","argumentos":[false]},{"nombre":"EscribirTexto","argumentos":
      ["Servicio de taxi\\n Via WhatsApp"]},{"nombre":"Feed","argumentos":[1]},
      
      {"nombre":"Feed","argumentos":[1]},{"nombre":"EstablecerTamañoFuente","argumentos":[2,1]},{"nombre":"EstablecerEnfatizado","argumentos":[true]},
      {"nombre":"EstablecerAlineacion","argumentos":[1]},{"nombre":"EstablecerSubrayado","argumentos":[false]},{"nombre":"EstablecerImpresionAlReves","argumentos":[false]},
      {"nombre":"EstablecerImpresionBlancoYNegroInversa","argumentos":[false]},{"nombre":"EstablecerRotacionDe90Grados","argumentos":[false]},
      {"nombre":"EscribirTexto","argumentos":["BOT: 5743220707\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n"]},{"nombre":"Feed","argumentos":[1]},
      
      
      {"nombre":"CorteParcial","argumentos":[]}]
      }`;

    fetch("http://localhost:8000/imprimir", {
      method: "POST",
      body: payload,
    }) 
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        if (respuesta === true) {
          // Éxito
          console.log("Impreso correctamente");
        } else {
          // Error (el mensaje de error está en "respuesta")
          console.log("Error con el plugin: " + respuesta);
        }
      })
      .catch((e) => {
        console.log(
          "Error haciendo petición. Verifica que el plugin se está ejecutando. El error dice: " +
          e
        );
      });
  };
  // const imprimir = (data) => {
  //   console.log('Me llego data ', data)
  //   const fechaActual = new Date();
  //   const fechaFormateada = fechaActual.toISOString().split('T')[0];
  //   let fecha = fechaFormateada;
  //   const fechaHora = new Date();
  //   const horaFormateada = fechaHora.toLocaleTimeString();
  //   let hora = horaFormateada
  //   console.log('Holita')
  //   console.log('Hola soy hora ', hora)
  //   console.log('Hola soy hora ', fecha)
 
  //   fetch("http://10.10.1.208:8000/imprimir", {
  //     method: "POST",
  //     body: payload,
  //   })
  //     .then(respuesta => respuesta.json())
  //     .then(respuesta => {
  //       if (respuesta === true) {
  //         // Éxito
  //         console.log("Impreso correctamente");
  //       } else {
  //         // Error (el mensaje de error está en "respuesta")
  //         console.log("Error con el plugin: " + respuesta);
  //       }
  //     })
  //     .catch(e => {
  //       console.log("Error haciendo petición. Verifica que el plugin se está ejecutando. El error dice: " + e);
  //     });
  // }
  const limpiar = () => {
    setLinea("");
    setMovil1("");
    setUsuario("");
    setDireccion("");
    //setbarrio("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedDate = format(now, "yyyy-MM-dd");
    const data = {
      textos_completos: "0",
      linea,
      movil: "",
      fecha: formattedDate,
      usuario,
      telefono: linea,
      conductor: "0",
      direccion,
      barrio,
      usrgraba: "Jostin",
    };

    let res12;
    let res13;

    try {
      res13 = await axios.get(`https://laureles-ap.onrender.com/api/v1/turno/turno`);

      data.movil = res13.data?.Turnos[0].movil;
    } catch (error) {
      alert("No hay nadie enturnado");
    }

    try {
      res12 = await axios.get(
        `https://laureles-ap.onrender.com/api/v1/turno/turno/${data.movil}`
      );
    } catch (error) {
      alert("El movil no esta en turno");
      return;
    }

    try {
      const res1 = await axios.delete(
        `https://laureles-ap.onrender.com/api/v1/turno/turno/${data.movil}`
      );
      console.log("Elimine, ", res1);
    } catch (error) {
      alert("El movil no esta en turno");
      return;
    }


    data.conductor = res12.data.turnos.cedconduce;


    await axios
      .get("https://laureles-ap.onrender.com/api/v1/servicio/servicio")
      .then((res) => {
        channel.postMessage(res.data);
        setServicios(res.data);

      })
      .catch((err) => console.log(err));

  
    toast("Información Servicio", {
      description: `Movil: ${data.movil}, Linea Usuario: ${data.linea}, Usuario Graba: ${data.usrgraba}, Dirección: ${data.direccion}`,
    });

    toast.success("Event has been created", {
      description: `Movil: ${data.movil}, Linea Usuario: ${data.linea}, Usuario Graba: ${data.usrgraba}, Dirección: ${data.direccion}`,
    });
    // onUpdateServicios();
    // setState(true);
    // localStorage.setItem("estoState", JSON.stringify(state))

    axios
      .get(`https://laureles-ap.onrender.com/api/v1/clientes/clientes/${linea}`)
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          // Realizar el POST solo si se recibe un 404
          axios
            .post("https://laureles-ap.onrender.com/api/v1/clientes/clientes", {
              clientes_codigo: '03',
              telefono: linea,
              nombre: 'Luis peralta',
              direccion,
              barrio: 'Laureles',
              notas: 'Sin Observaciones'

            })
            .then((postRes) => {
              console.log("POST exitoso:", postRes);
            })
            .catch((postErr) => {
              console.log("Error en el POST:", postErr);
            });
        } else {
          console.log("Error en la solicitud GET:", err);
        }
      });

    //imprimir(data);
  
    handleClick();
   
    // console.log("Cambie el estado: ", state)
    limpiar();
   
    await axios
      .post("https://laureles-ap.onrender.com/api/v1/servicio/servicio", data)
      .then((res) => console.log("hey ", res.data))
      .catch((err) => console.log(err));

    channel.close();
  };

  const getAllFields = async (e) => {
    console.log(e.target.value)
    if (e.target.value !== '') {
      await axios.get(`https://laureles-ap.onrender.com/api/v1/clientes/clientes/${e.target.value}`)
        .then(res => {
          console.log(res.data.Cliente)
          const { nombre, direccion } = res.data.Cliente;
          setUsuario(nombre);
          setDireccion(direccion)

        })
        .catch(err => console.log('404 Por nuevo usuario'))//ht71673790
    }
  };

  return (
    <div className="flex">
      <SweetAlert2
        {...swalProps}
        didOpen={() => {
          // run when swal is opened...
        }}
        didClose={() => {
          // run when swal is closed...
        }}
        onConfirm={(result) => {
          // run when clieked in confirm and promise is resolved...
        }}
        onError={(error) => {
          // run when promise rejected...
        }}
        onResolve={(result) => {
          // run when promise is resolved...
        }}
      />
      <Toaster position="top-right" richColors />
      <div className=" ">
        <div className=" w-full max-w-[550px]">
          <form
            onSubmit={handleSubmit}
            className="flex gap-1 h-screen border-green-500 border p-8 flex-col max-w-96"
          >
            <div className="mb-3">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Telefono
              </label>
              <input
                required
                value={linea}
                onChange={(e) => setLinea(e.target.value)}
                onBlur={getAllFields}
                type="text"
                name="Telefono"
                placeholder="Telefono"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-3">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Nombre
              </label>
              <input
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                type="text"
                name="Nombre"
                placeholder="Nombre"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-3">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Dirección
              </label>
              <input
                required
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                type="text"
                name="dir"
                placeholder="Dirección"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-3">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Barrio
              </label>
              <input
                required
                value={barrio}
                //onChange={(e) => setbarrio(e.target.value)}
                readOnly
                type="text"
                name="Barrio"
                placeholder="Barrio"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-3">
              {/* <label className="mb-3 block text-base font-medium text-[#07074D]">
                Nombre Usuario
              </label>
              <input
                required
                value={nombreUsuario}
                onChange={(e) => setnombreUsuario(e.target.value)}
                type="text"
                name="Nombre Usuario"
                placeholder="Nombre Usuario"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              /> */}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600 focus:outline-none transition-colors"
              >
                Enviar
              </button>
              <button
                type="button"
                onClick={limpiar}
                className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600 focus:outline-none transition-colors"
              >
                Limpiar
              </button>
            </div>
            <div className="flex gap-3 pt-3">
              <Link to="/informes"  className="bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 focus:outline-none transition-colors">Informes</Link>
              {/* <Moviles
                
                MovilesState={MovilesState}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                openModal={openModal}
                closeModal={closeModal}
              /> */}
              <button
                type="button" // Añadir type="button"
                className="bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 focus:outline-none transition-colors"
              >
                <Procesos
                  isModalOpen2={isModalOpen2}
                  setIsModalOpen2={setIsModalOpen2}
                  openModal2={openModal2}
                  closeModal2={closeModal2}
                />
              </button>
              <Link to="/conductores"  className="bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 focus:outline-none transition-colors">Conductores</Link>

            </div>

            {/* <div className="flex gap-3 pt-3">
                isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} openModal={openModal} closeModal={closeModal} />
            </div> */}
            {/* <span className=" pt-2 font-bold text-lg">Moviles <span className=" text-green-500 ">20</span></span> */}
          </form>
        </div>
      </div>
      <ScrollableTable servicios={servicios} />
    </div>
  );
};

export default Servicio;

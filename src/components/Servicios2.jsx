import React, { useEffect, useState } from "react";
import ScrollableTable from "./TableServices2";
import axios from "axios";
import { format } from "date-fns";
import BarCodeReader from "./BarCodeReader";
import { io } from 'socket.io-client';
const socket = io('https://laureles-ap.onrender.com', {
  withCredentials: true
}); // URL del servidor

const Servicio2 = ({
  servicios,
  setServicios,
  onUpdateServicios,
  handleUpdateMoviles,
}) => {
  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState("");
  const channel = new BroadcastChannel("mi-canal");

  console.log('Ohhh si, somos lo mejor de lo mejor')

  const imprimir = (data) => {
    console.log('Me llego data ', data.creado.linea)
    if(data.creado.linea == '6043220707'){
      return;
    }
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];
    let fecha = fechaFormateada;
    const nombreUsuario = data.creado.textos_completos
    const fechaHora = new Date();
    const horaFormateada = fechaHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let hora = horaFormateada
    console.log('Holita')
    console.log('Hola soy hora ', hora)
    console.log('Hola soy hora ', fecha)
    const payload =
      `{\"nombreImpresora\":\"Gereri2\",\"serial\":\"MGE4NTNlM2VfXzIwMjUtMDctMjJfXzIwMjUtMDgtMjEjIyNtVXRTMmFxUXkrMWIvdGRRd3NRSGpaQ0xCM3hIWmNIaG1BaEQySHl0RE56dW5vTlpwOUY5UTJwd2lvQ3J2eGpxNEIxNUdtWE5uNTJYdWtUaVZuY0FiUjNIRXdsRERwazBOcGYxWVA2TVdkbDhTOGN6QVZIOWZoZXVQWmFlUytOdGxmNUhHT1FEdlJ4NjdocHpObmhqeGN5cmpJaW45STNSc2ZyTUpwTGI3dW9qdzdjRmtOMUdsOG45WmE3Y0dXSkQxRWhIUTRSb1FtbkZ0N2YySWxNRU1vT0tET1BGakpMcnRIVjJCOHpXQTRuWTRCMVFHVDBReFdUNmZNdVNMNk9vMGhzNk1sSkdoQzR3aFJyNmNSNUtpL2tLeGRHMEdkeU1pbXFycnV3cTZVREdST09BQnUzNVE2Yy9ZYW53S2JlOUFXRTkyOG5OR00zNm5JRml0SG5QS01rSEVkNzY5NWNGd3dUbTBOelpSUnZMUXVUQkQ1L2NqSGVnbFFWWnJCTDd2b0dxU1NLVWtvc3JZZUU2UlpuNTJFdSthODd2UTFsb1hBSUpUaHRSOVUwTithOW14eEtzQkt5aUkwVmIxaHlYZ2g5OEZoUzM4Q1pnR2xialdjZEdwa1dmaHVKczJaVkpCS3lYVXFNeU9MQmovWktlMjljNmZFUzlPaGU5OGROUVpEazl0VmpqcGF6Y214cEhlaDk5VWpBNCt2b3RtZmNvUHBOQ25POUduT1BId0RuTW1IT24vMHJDM2RrL25PSDh2UzMza0IyTVRBdVYyWXRsSldXZ24raXZBZGdEWExraHIyWUExdW8zUXdYRzIyRzZkMzhRWXJXcjc0OHRacWtkc3dtM1BEbmRMZTdJNCtCSE1pRmpTbEYyR2NJZDhPNDRBbUF4cjNwSW4vYz0=\",\"operaciones\":[{\"nombre\":\"Iniciar\",\"argumentos\":[]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,2]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"CTM COOTRANSMEDE\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,1]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"Acopio Exclusivo\\n Sector Laureles\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"TextoSegunPaginaDeCodigos\",\"argumentos\":[2,\"CP850\",\"Su móvil seguro\"]},{\"nombre\":\"Feed\",\"argumentos\":[2]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,2]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"${data.creado.movil}\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,1]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"Fecha: ${fecha}\\nHora: ${hora}\\n\\n\ ${nombreUsuario}"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Feed\",\"argumentos\":[2]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,2]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"${data.creado.direccion} \\n\\n\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[1,1]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"PQRS: pqrs@ctmcootransmede.com\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,1]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"\\n\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"TextoSegunPaginaDeCodigos\",\"argumentos\":[2,\"cp850\",\"Servicio de Taxi\\n Via WhatsApp\\n\\n\"]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[3,2]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"300 653 52 51\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Iniciar\",\"argumentos\":[]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"ImprimirCodigoQr\",\"argumentos\":[\"https://wa.me/573006535251\",200,1,0]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[1,1]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"\\n\\n\\n\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Corte\",\"argumentos\":[1]}]}
`;
    // fetch("http://localhost:8000/imprimir", {
    //   method: "POST",
    //   body: payload,
    // })
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

  useEffect(() => {

    socket.on('dbChange2', async (data) => {
      console.log('Cambio en la base de datos XDDDDDDDDDDDDDDDDDDDD:', data);
      // axios.delete(
      //   `https://laureles-ap.onrender.com/api/v1/turno/turno/${data.creado.movil}`
      // ).then(res => console.log('Ya borre en sockets', res))
      // .catch(err => console.log(err, 'No borre en sockets'))


      await axios
        .get("https://laureles-ap.onrender.com/api/v1/servicio/servicio")
        .then((res) => setServicios(res.data))
        .catch((err) => console.log(err));

      await axios
        .get(`https://laureles-ap.onrender.com/api/v1/turno/turno/`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
      //setMessages((prevMessages) => [...prevMessages, data.message]);

      const numUser = data.creado.linea;
      
      await axios
      .get(`https://laureles-ap.onrender.com/api/v1/clientes/clientes/${numUser}`)
      .then((res) => {
        console.log('Voy a pasar valor')
        data.creado.textos_completos = res.data.Cliente.nombre;
      })
      .catch((err) => console.log(err));
      
      imprimir(data)
    });
    

    // Limpiar el evento al desmontar el componente
    return () => {
      socket.off('dbChange2');
    };
  }, []);

   useEffect(() => {

    socket.on('dbChange4', async (data) => {
      console.log('Cambio en la base de datos XDDDDDDDDDDDDDDDDDDDD:', data);
      // axios.delete(
      //   `https://laureles-ap.onrender.com/api/v1/turno/turno/${data.creado.movil}`
      // ).then(res => console.log('Ya borre en sockets', res))
      // .catch(err => console.log(err, 'No borre en sockets'))


      await axios
        .get("https://laureles-ap.onrender.com/api/v1/servicio/servicio")
        .then((res) => setServicios(res.data))
        .catch((err) => console.log(err));

      await axios
        .get(`https://laureles-ap.onrender.com/api/v1/turno/turno/`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
      //setMessages((prevMessages) => [...prevMessages, data.message]);
      //imprimir(data)
    });
    

    // Limpiar el evento al desmontar el componente
    return () => {
      socket.off('dbChange4');
    };
  }, []);

  useEffect(() => {
    channel.onmessage = async (event) => {
      await axios
        .get("https://laureles-ap.onrender.com/api/v1/servicio/servicio")
        .then((res) => setServicios(res.data))
        .catch((err) => console.log(err));

      await axios
        .get(`https://laureles-ap.onrender.com/api/v1/turno/turno/`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    };
    getTurnos();
    return () => {
      channel.close();
      channel.onmessage = null;
    };
  }, []);


  const getTurnos = async () => {
    await axios
      .get(`https://laureles-ap.onrender.com/api/v1/turno/turno/`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const getServices = async () => {
    await axios
      .get(`https://laureles-ap.onrender.com/api/v1/servicio/servicio`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  // console.log(data.Turnos[data.Turnos.length - 1]);
  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
    handleUpdateMoviles();
  };

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
  const [barrio, setbarrio] = useState("");

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
      movil: movil1,
      fecha: formattedDate,
      usuario,
      telefono: linea,
      conductor: "0",
      direccion,
      barrio,
      usrgraba: "Jostin",
    };

    let res12;

    console.log('Yo soy data ', data.Turnos)
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

    console.log('Soy la data creando turno ', data)

    axios
      .post("https://laureles-ap.onrender.com/api/v1/servicio/servicio", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    axios
      .get("https://laureles-ap.onrender.com/api/v1/servicio/servicio")
      .then((res) => setServicios(res.data))
      .catch((err) => console.log(err));

    alert("Servicio Enviado Con Exito");
    onUpdateServicios();
    imprimir(data);
    limpiar();
  };

  return (
    <div className="flex">
      <BarCodeReader getTurnos={getTurnos} getServices={getServices} />
      <div className=" ">
        <div className="w-full max-w-[550px]">
          <form
            onSubmit={handleSubmit}
            className="flex gap-1 h-screen border-green-500 border p-8 flex-col max-w-96"
          >
            <div className="container">
              {/* <h1 className="mb-4 text-[30px] font-bold text-center">Turnos</h1> */}
              {/* <p className=" text-[20px] font-bold text-center pt-1 ">Ultimo Movil</p> */}

              <div className="overflow-y-auto h-[830px] w-[175px] ">
                {" "}
                {/* Scroll vertical y altura fija */}
                <table className="text-center w-full">
                  <thead className="bg-green-500 text-white">
                    <tr>
                      <th className="p-2 w-1/4">Movil</th>
                    </tr>
                  </thead>
                  <tbody className="bg-grey-light">
                    {data.Turnos?.map((item, index) => (
                      <tr key={index} className="mb-2">
                        <td className="text-[25px]"><span className="text-green-600">{index+1}&nbsp;&nbsp;&nbsp;&nbsp; </span>  {item.movil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className=" text-[20px] font-bold text-center pt-1 ">Ultimo Movil</p>
              {data.Turnos?.length > 0 && (
                <div key={data.Turnos.length - 1} className="mb-2">
                  <p className="text-[25px] text-center ">{data?.Turnos[data.Turnos?.length - 1].movil}</p>
                </div>
              )}
              {/* <p className=" text-[20px] font-bold text-center pt-1 ">{data[data.length - 1]}</p> */}
            </div>

            {/* Tu código adicional aquí */}
          </form>
        </div>
      </div>
      <ScrollableTable servicios={servicios} />
    </div>
  );
};

export default Servicio2;

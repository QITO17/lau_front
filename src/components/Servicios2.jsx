

import { useEffect, useState } from "react";
import ScrollableTable from "./TableServices2";
import axios from "axios";
import { format } from "date-fns";
import BarCodeReader from "./BarCodeReader";
import { io } from 'socket.io-client';
import { toast } from "sonner";
const socket = io('https://laureles-ap.onrender.com', {
  withCredentials: true
}); // URL del servidor

const Servicio2 = ({
  servicios,
  setServicios,
  onUpdateServicios,
  
}) => {
  const [data, setData] = useState("");
  const channel = new BroadcastChannel("mi-canal");


  const imprimir = (data) => {
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
    const payload =
      `{\"nombreImpresora\":\"Gereri2\",\"serial\":\"MGE4NTNlM2VfXzIwMjUtMDYtMTNfXzIwMjUtMDctMTMjIyNPVnNwYm8wU05YNjdvK3p0emdVNlFPRUJweEgyK0c5d2RxM25aUHZXNzlKSmlCQTY5OG9XN1hrVTVBMERlSE15SUhlaUtOdkxLZUQxM3oyQStZTmduN2NscUtxNjlHWFg1clBURktxanVheTZVQUdtUm40QkpxWlFUMmYxR1drcjlna25Udi9uRGJSbUR3Q2szSFNrSXVwOFNhS0tiQkc5dFYvQ1lreHhvKzVEZDlyUEpMdlFLVEdwQ2o1VVRlWWhmam1NbE5BM0ovajVvaElERUd1V21lVlhPMU8vTUZ0b2N6VjJseGFhT0lXR0daamxUSlNjSzgvNk5LOWVwL1p5bTNzN3ZOMWhWcjloT2NsakI1Tkg2N1hMU05MUDVVQ2V3QkZacTA2T0dIMEtybytwS2h1WFExdktTZUVZNG1CVHNFOWIwc3pSNFNwQ0ZtRGtLNytyMm1jWk9hU3ZTakErK0dteGNTUjNZOTNSV2l4TGtXcmp0ak9QNzZXRTRvTVNra3FJT2ZFMXViMjAwaWVTV1hWbm9NckVjY1JBVkNaQnlYdTdtdXgxMUlTY1R1SGVueWVDZlpscGJTNGowL0lSeW00WXBqcHlyaElSUjBhMG1jRzViaVJ2d0dqSDEwdlc4cUU0b200WW5qbmIrYUlmOWRncThnZ1VSVzN0d3VNcnRBOFVseVJ2VzRtY05pbzdscEZNVDRUb0JEeEtha3NxZEgrbERNdzNZV1V2cjBReG82elFPWXp1TG9DbUNpOTNLYjNHRmJIY1IvWFpyS3k1cmd4aVJleHMxWGRrUGE5aDJORi84WUNlczdNRlZic1dlMEhJMnVGRXRjSUVMZGxsb0JsTnBtVWdaRnozMkdZTHlNQktOd3BDbUVKSTcrMnZuRXo2WmVUTVRaRT0=\",\"operaciones\":[{\"nombre\":\"Iniciar\",\"argumentos\":[]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,2]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"CTM COOTRANSMEDE\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,1]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"Acopio Exclusivo\\n Sector Laureles\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"TextoSegunPaginaDeCodigos\",\"argumentos\":[2,\"CP850\",\"Su móvil seguro\"]},{\"nombre\":\"Feed\",\"argumentos\":[2]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,2]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"${data.creado.movil}\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,1]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"Fecha: ${fecha}\\nHora: ${hora}\\n\\n\ ${nombreUsuario}"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Feed\",\"argumentos\":[2]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,2]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"${data.creado.direccion} \\n\\n\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[1,1]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"PQRS: pqrs@ctmcootransmede.com\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[2,1]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"\\n\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"TextoSegunPaginaDeCodigos\",\"argumentos\":[2,\"cp850\",\"Servicio de Taxi\\n Via WhatsApp\\n\\n\"]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[3,2]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[true]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"300 653 52 51\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Iniciar\",\"argumentos\":[]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"ImprimirCodigoQr\",\"argumentos\":[\"https://wa.me/573006535251\",200,1,0]},{\"nombre\":\"EstablecerTamañoFuente\",\"argumentos\":[1,1]},{\"nombre\":\"EstablecerEnfatizado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerAlineacion\",\"argumentos\":[1]},{\"nombre\":\"EstablecerSubrayado\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionAlReves\",\"argumentos\":[false]},{\"nombre\":\"EstablecerImpresionBlancoYNegroInversa\",\"argumentos\":[false]},{\"nombre\":\"EstablecerRotacionDe90Grados\",\"argumentos\":[false]},{\"nombre\":\"EscribirTexto\",\"argumentos\":[\"\\n\\n\\n\"]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Feed\",\"argumentos\":[1]},{\"nombre\":\"Corte\",\"argumentos\":[1]}]}`;
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



  useEffect(() => {

    socket.on('dbChange2', async (data) => {


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
    channel.onmessage = async () => {
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





  const [linea, setLinea] = useState("");
  const [movil1, setMovil1] = useState("");
  const [usuario, setUsuario] = useState("");
  const [direccion, setDireccion] = useState("");
  const [barrio] = useState("");

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

    try {
      res12 = await axios.get(
        `https://laureles-ap.onrender.com/api/v1/turno/turno/${data.movil}`
      );
    } catch (error) {
      toast.error("Error al obtener el turno.");
      console.error("Error al obtener el turno:", error);
      return;
    }

    try {
      const res1 = await axios.delete(
        `https://laureles-ap.onrender.com/api/v1/turno/turno/${data.movil}`
      );
    } catch (error) {
      toast.error("Error al eliminar el turno.");
      console.error("Error al eliminar el turno:", error);
      return;
    }

    data.conductor = res12.data.turnos.cedconduce;


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

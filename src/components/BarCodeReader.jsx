import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const BarCodeReader = ({ getTurnos }) => {
  const [barcode, setBarcode] = useState(""); 
  const [bloqueado, setBloqueado] = useState("");
  useEffect(() => {
    const handleKeyDown = async (event) => {
      let bloqueado;
      // Verifica si la tecla presionada es Enter (o la tecla que uses para terminar el código)
      if (event.key === "Enter") {
      
        // Resetea el código de barras después de imprimirlo
        try {
          const movil = barcode.substring(4, 8);
          const cedconduce = movil//barcode.substring(4, 8);

          const esSoloNumeros = (cadena) => /^[0-9]+$/.test(cadena);

          if(!esSoloNumeros(movil) || !esSoloNumeros(cedconduce) || movil[0] == '0' || movil <= 999){
           // toast.info("Mensaje", {
             // description: 'Su carnet no se pudo leer, Porfavor pongalo nuevamente',
            //});
            setBarcode("");
            return;
          }
           await axios.get(`https://laureles-ap.onrender.com/api/v1/bloq/bloqueos/${movil}`)
           .then(res => {
             bloqueado = '200'
           })
           .catch(err => {
             if(err.status == 404) bloqueado = 404
           })
          

          if(bloqueado == 200){
             toast.error("Mensaje", {
               description: 'NOVEDAD ADMINISTRATIVA',
               duration: 3000,
             });
            setBarcode("");
            setBloqueado("");
             return
           } 
          const res1 = await axios.post(
            `https://laureles-ap.onrender.com/api/v1/turno/turno`,
            {
              movil,
              cedconduce,
            }
          );
          getTurnos();      
        } catch (error) {
          const movil = barcode.substring(4, 8);
          const cedconduce = barcode.substring(4, 8);
          const ced = barcode.substring(8)
          
          if (error.response && error.response.status === 409) {
            const movil = barcode.substring(4, 8);
            let fecha;
            const fechaActual = new Date().toISOString().split('T')[0];
            const res2 = await axios.delete(`https://laureles-ap.onrender.com/api/v1/turno/turno/${movil}`);
         const dataQuemada = {
              textos_completos: "0",
              linea: "6043220707",
              movil: "0000",
              fecha: fechaActual,
              usuario: "CONDUCTOR [DESENTURNO]",
              telefono: "6043220707",
              conductor: movil,
              direccion: "ESTACIONAMIENTO ACOPIO LAURELES",
              barrio: "Laureles",
              usrgraba: "Dev",
            };
            
            axios
              .post("https://laureles-ap.onrender.com/api/v1/servicio/servicio", dataQuemada)
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err));
            setBarcode("");
            getTurnos();
            
            // Muestra el mensaje de error al usuario
            console.log(error);
          } else {
            console.error("Error inesperado:", error.message);
            // Maneja otros tipos de errores aquí
          }

          return;
        }

        // Una vez procesado el código, restablece el estado
        setBarcode(""); // Resetea el estado después de procesar
      } else {
        // Evita que se concatenen caracteres cuando el código ya fue procesado
        setBarcode((prev) => prev + event.key);
      }
    };

    // Agrega el listener para keydown
    window.addEventListener("keydown", handleKeyDown);

    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [barcode, getTurnos]);

  return (
    <div>
    <Toaster
  position="top-center"
  richColors
  toastOptions={{
    className: 'flex justify-center text-lg sm:text-xl text-center md:text-2xl p-6 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-2xl transform transition-all duration-300 ease-out',
    style: {
      fontSize: '3.125rem', // Tamaño de texto base
    },
  }}
/>

      <p></p>
    </div>
  );
};

export default BarCodeReader;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const BarCodeReader = ({ getTurnos }) => {
//   const [barcode, setBarcode] = useState("");

//   useEffect(() => {
//     const handleKeyDown = async (event) => {
//       // Verifica si la tecla presionada es Enter (o la tecla que uses para terminar el código)
//       if (event.key === "Enter") {

//         let bloqueo = false;
//         const validacion = barcode.substring(4, 8);
//         await axios.get(`https://laureles-ap.onrender.com/api/v1/bloq/bloqueos/${validacion}`)
//         .then(res => console.log(res))
//         .catch(err => {
//           if(err.response.status === 404){
//             console.log('Ya lo pase')
//             bloqueo = true;
//             console.clear();
//           }
//         })


//        if(bloqueo){
//         console.log("Código de barras leído:", barcode);
//         // Resetea el código de barras después de imprimirlo
//         try {
//           const movil = barcode.substring(4, 8);
//           const cedconduce = barcode.substring(4, 8);

//           const res1 = await axios.post(
//             `https://laureles-ap.onrender.com/api/v1/turno/turno`,
//             {
//               movil,
//               cedconduce,
//             }
//           );

//           console.log("Cree Turno, ", res1);
//           getTurnos();
//         } catch (error) {
//           const movil = barcode.substring(4, 8);
//           const cedconduce = barcode.substring(4, 8);
//           if (error.response && error.response.status === 409) {
//             console.log('Hola')
            
//             const res2 = await axios.delete(
//               `https://laureles-ap.onrender.com/api/v1/turno/turno/${cedconduce}`,
//               {
//                 movil,
//                 cedconduce,
//               }
//             );
//             console.log('Hola')
//             console.clear()
//             console.log('Soy res2 ', res2)
//             getTurnos();

//             console.log(
//               "Conflicto: El recurso ya ha sido enturnado no es posible enturnar de nuevo."
//             );
//             // Muestra el mensaje de error al usuario
//             console.log(error);
//           } else {
//             console.error("Error inesperado:", error.message);
//             // Maneja otros tipos de errores aquí
//           }
//           return;
//         }

//         setBarcode("");
//        }else{
//         console.log('Estas bloqueado')
//        }
//       } else {
//         // Agrega la tecla actual al código de barras
//         setBarcode((prev) => prev + event.key);
        
//       }
//     };

//     // Agrega el listener para keydown
//     window.addEventListener("keydown", handleKeyDown);

//     // Limpia el listener al desmontar el componente
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [barcode]);
//   return (
//     <div>
//       <p></p>
//     </div>
//   );
// };

// export default BarCodeReader;

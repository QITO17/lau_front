import React, { useEffect, useState } from "react";
import Servicio from "./Servicio";
import axios from "axios";

const Principal = () => {
  const [servicios, setServicios] = useState("");
  const [MovilesState, setMovilesState] = useState("");
  const [global, setGlobal] = useState('');
  
  const fetchServicios = () => {
    axios
      .get("https://laureles-ap.onrender.com/api/v1/servicio/servicio")
      .then((res) => setServicios(res.data))
      .catch((err) => console.log(err));
  };

  // Función para obtener moviles
  const fetchMoviles = () => {
    console.log('Te di los moviles')
    axios
      .get("https://laureles-ap.onrender.com/api/v1/turno/turno")
      .then((res) => setMovilesState(res.data))
      .catch((err) => console.log(err));
      console.log(MovilesState)
  };

  useEffect(() => {
   
    fetchServicios();
    fetchMoviles();
   
  }, []);

  const onUpdateServicios = () => {
    fetchServicios();
  };

  const handleUpdateMoviles = () => {
    fetchMoviles();
  };



  return (
    <div>
      <Servicio servicios={servicios} setServicios={setServicios} MovilesState={MovilesState} onUpdateServicios={onUpdateServicios} handleUpdateMoviles={handleUpdateMoviles} />
    </div>
  );
};

export default Principal;

import React, { useEffect, useState } from "react";
import Servicios2 from "./Servicios2";
import axios from "axios";

const ServiciosConductores = () => {
  const [servicios, setServicios] = useState("");
  const [MovilesState, setMovilesState] = useState([]);

  const fetchServicios = () => {
    axios
      .get("https://laureles-ap.onrender.com/api/v1/servicio/servicio")
      .then((res) => setServicios(res.data))
      .catch((err) => console.log(err));
  };

  // Función para obtener moviles
  const fetchMoviles = () => {
    axios
      .get("https://laureles-ap.onrender.com/api/v1/turno/turno")
      .then((res) => setMovilesState(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchServicios();
    fetchMoviles();
  }, []);

  const onUpdateServicios = () => {
    console.log("ME EJECUTEEEEEEEEEEE PANDASSSSSSSSSSSSSSSSSS");
    fetchServicios();
  };

  const handleUpdateMoviles = () => {
    fetchMoviles();
  };

  return (
    <div>
      <Servicios2
        setServicios={setServicios}
        servicios={servicios}
        MovilesState={MovilesState}
        onUpdateServicios={onUpdateServicios}
        handleUpdateMoviles={handleUpdateMoviles}
      />
    </div>
  );
};

export default ServiciosConductores;

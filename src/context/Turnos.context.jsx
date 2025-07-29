// src/GlobalContext.js
import  { createContext, useContext, useState } from 'react';

// Crea el contexto
const GlobalContext = createContext();

// Crea un proveedor del contexto
export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(false);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

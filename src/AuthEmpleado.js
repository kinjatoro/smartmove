import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const EmpleadoContext = createContext();

export function EmpleadoProvider({ children }) {
  const [empleado, setEmpleado] = useState(false);

  useEffect(() => {
    // Verifica si existe un token JWT en la cookie
    const jwtToken = getJwtToken();
    
    // decodifica el token (si lo encuentra)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      if (decodedToken.rol === "empleado"){
        setEmpleado(true);
      }

    }
  }, []);


  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  return (
    <EmpleadoContext.Provider value={{ empleado, setEmpleado }}>
      {children}
    </EmpleadoContext.Provider>
  );
}

export function useEmpleado() {
  return useContext(EmpleadoContext);
}


import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const PropietarioContext = createContext();

export function PropietarioProvider({ children }) {
  const [propietario, setPropietario] = useState(false);

  useEffect(() => {
    // Verifica si existe un token JWT en la cookie
    const jwtToken = getJwtToken();
    
    // decodifica el token (si lo encuentra)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      if (decodedToken.rol === "propietario"){
        setPropietario(true);
      }

    }
  }, []);


  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  return (
    <PropietarioContext.Provider value={{ propietario, setPropietario }}>
      {children}
    </PropietarioContext.Provider>
  );
}

export function usePropietario() {
  return useContext(PropietarioContext);
}


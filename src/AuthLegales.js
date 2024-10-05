import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const LegalesContext = createContext();

export function LegalesProvider({ children }) {
  const [legales, setLegales] = useState(false);

  useEffect(() => {
    // Verifica si existe un token JWT en la cookie
    const jwtToken = getJwtToken();
    console.log(jwtToken)
    
    // decodifica el token (si lo encuentra)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      if (decodedToken.rol === "legales"){
        setLegales(true);
      }

    }
  }, []);


  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  return (
    <LegalesContext.Provider value={{ legales, setLegales }}>
      {children}
    </LegalesContext.Provider>
  );
}

export function useLegales() {
  return useContext(LegalesContext);
}


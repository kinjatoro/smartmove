import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const CEOContext = createContext();

export function CEOProvider({ children }) {
  const [CEO, setCEO] = useState(false);

  useEffect(() => {
    // Verifica si existe un token JWT en la cookie
    const jwtToken = getJwtToken();
    
    // decodifica el token (si lo encuentra)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      if (decodedToken.rol === "CEO"){
        setCEO(true);
      }

    }
  }, []);


  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  return (
    <CEOContext.Provider value={{ CEO, setCEO }}>
      {children}
    </CEOContext.Provider>
  );
}

export function useCEO() {
  return useContext(CEOContext);
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const MudanzasContext = createContext();

export function MudanzasProvider({ children }) {
  const [mudanzas, setMudanzas] = useState(false);

  useEffect(() => {
    // Verifica si existe un token JWT en la cookie
    const jwtToken = getJwtToken();
    
    // decodifica el token (si lo encuentra)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      if (decodedToken.rol === "mudanzas"){
        setMudanzas(true);
      }

    }
  }, []);


  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  return (
    <MudanzasContext.Provider value={{ mudanzas, setMudanzas }}>
      {children}
    </MudanzasContext.Provider>
  );
}

export function useMudanzas() {
  return useContext(MudanzasContext);
}


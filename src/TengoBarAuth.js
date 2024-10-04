import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const TengoBarContext = createContext();

export function BarProvider({ children }) {
  const [myBar, setMyBar] = useState(false);

  useEffect(() => {
    // Verifica si existe un token JWT en la cookie
    const jwtToken = getJwtToken();
    
    // decodifica el token (si lo encuentra)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      if (decodedToken.rol === "master"){
        setMyBar(true);
      }

    }
  }, []);


  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  return (
    <TengoBarContext.Provider value={{ myBar, setMyBar }}>
      {children}
    </TengoBarContext.Provider>
  );
}

export function useMyBar() {
  return useContext(TengoBarContext);
}

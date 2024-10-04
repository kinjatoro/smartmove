import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const TengoAdminContext = createContext();

export function AdminProvider({ children }) {
  const [myAdmin, setMyAdmin] = useState(false);

  useEffect(() => {
    // Verifica si existe un token JWT en la cookie
    const jwtToken = getJwtToken();
    
    // decodifica el token (si lo encuentra)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      if (decodedToken.rol === "admin" || decodedToken.rol === "master"){
        setMyAdmin(true);
      }

    }
  }, []);


  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  return (
    <TengoAdminContext.Provider value={{ myAdmin, setMyAdmin }}>
      {children}
    </TengoAdminContext.Provider>
  );
}

export function useMyAdmin() {
  return useContext(TengoAdminContext);
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    // Verifica si existe un token JWT en la cookie
    const jwtToken = getJwtToken();

    // decodifica el token (si lo encuentra)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);

      // Puedes agregar más validaciones aquí, por ejemplo, verificar la fecha de expiración del token

      setAuth(true); // Si el token es válido, establece auth en true
    }
  }, []);

  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

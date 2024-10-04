import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const OnBoardingContext = createContext();

export function BoarProvider({ children }) {
    const [onBoar, setOnBoar] = useState(true);

  useEffect(() => {
    // Verifica si existe un token JWT en la cookie
    const jwtToken = getJwtToken();
    
    // decodifica el token (si lo encuentra)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);

      if (decodedToken.user_type === 1 && decodedToken.business_id === null){
        setOnBoar(false);
      }

    }
  }, []);

  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  return (
    <OnBoardingContext.Provider value={{ onBoar, setOnBoar }}>
      {children}
    </OnBoardingContext.Provider>
  );
}

export function useOnBoarding() {
  return useContext(OnBoardingContext);
}
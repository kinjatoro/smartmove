import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './Auth';
import { BarProvider } from './TengoBarAuth';
import { BoarProvider } from './OnBoarding';
import { AdminProvider } from './TengoAdminAuth'; // inquilino

import { CEOProvider } from './AuthCEO';
import { EmpleadoProvider } from './AuthEmpleado';
import { LegalesProvider } from './AuthLegales';
import { MudanzasProvider } from './AuthMudanzas';
import { PropietarioProvider } from './AuthPropietario';


// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  const [auth, setAuth] = useState(false);
  const [myBar, setMyBar] = useState(false);
  const [onBoar, setOnBoar] = useState(true);


  const [myAdmin, setMyAdmin] = useState(false);
  const [CEO, setCEO] = useState(false);
  const [empleado, setEmpleado] = useState(false);
  const [legales, setLegales] = useState(false);
  const [mudanzas, setMudanzas] = useState(false);
  const [propietario, setPropietario] = useState(false);

  return (   
    
    <AuthProvider value={{ auth, setAuth }}>
    <AdminProvider value={{ myAdmin, setMyAdmin }}>
    <BarProvider value={{ myBar, setMyBar }}>
    <BoarProvider value={{ onBoar, setOnBoar }}>
    <EmpleadoProvider value={{ empleado, setEmpleado }}>
    <LegalesProvider value={{ legales, setLegales }}>
    <MudanzasProvider value={{ mudanzas, setMudanzas }}>
    <PropietarioProvider value={{ propietario, setPropietario}}>
    <CEOProvider value={{ CEO, setCEO }}>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />      
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
    </CEOProvider>
    </PropietarioProvider>
    </MudanzasProvider>
    </LegalesProvider>
    </EmpleadoProvider>
    </BoarProvider>
    </BarProvider>
    </AdminProvider>
    </AuthProvider>
  );
}

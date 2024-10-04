import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './Auth';
import { BarProvider } from './TengoBarAuth';
import { BoarProvider } from './OnBoarding';
import { AdminProvider } from './TengoAdminAuth';

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



  return (   
    <AuthProvider value={{ auth, setAuth }}>
    <AdminProvider value={{ myAdmin, setMyAdmin }}>
    <BarProvider value={{ myBar, setMyBar }}>
    <BoarProvider value={{ onBoar, setOnBoar }}>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />      
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
    </BoarProvider>
    </BarProvider>
    </AdminProvider>
    </AuthProvider>
  );
}

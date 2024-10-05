import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';

import LoginPage from './pages/LoginPage';
import LoginPageBar from './pages/LoginPageBar';
import Page404 from './pages/Page404';
import RegisterPage from './pages/RegisterPage';
import RegisterPageBar from './pages/RegisterPageBar';
import LandingPage from './pages/LandingPage';
import BaresPage from './pages/BaresPage';
import MisPublicacionesPage from './pages/MisPublicacionesPage';
import ComentariosPage from './pages/ComentariosPage';
import IndividualBlog from './pages/IndividualBlog';
import ExpPage from './pages/ExpPage';
import RecoverPage from './pages/RecoverPage';
import VerificationPage from './pages/VerificationPage';
import OnBoardingBar from './pages/OnBoardingBar';
import PerfilBar from './pages/PerfilBar';
import PerfilUsuario from './pages/PerfilUsuario';
import IndividualBar from './pages/IndividualBar';
import { useAuth } from './Auth'
import { useOnBoarding } from './OnBoarding'
import { useMyBar } from './TengoBarAuth'
import { useMyAdmin } from './TengoAdminAuth'


import {useCEO} from './AuthCEO'
import {useLegales} from './AuthLegales'
import {useMudanzas} from './AuthMudanzas'
import {usePropietario} from './AuthPropietario'
import {useEmpleado} from './AuthEmpleado'


import  DashboardAppPage  from './pages/DashboardAppPage'
import  DashboardAppPage2  from './pages/DashboardAppPage2'

import DashboardPageEmpleado from './pages/DashboardPageEmpleado';
import DashboardPageLegales from './pages/DashboardPageLegales';
import DashboardPageCEO from './pages/DashboardPageCEO';
import DashboardPageMudanza from './pages/DashboardPageMudanza';
import DashboardPagePropietario from './pages/DashboardPagePropietario';
import DashboardPageInquilino from './pages/DashboardPageInquilino';

// ----------------------------------------------------------------------

export default function Router() {
  
  const { onBoar } = useOnBoarding();
  const { myBar } = useMyBar();
  const { myAdmin } = useMyAdmin();

  const { auth, setAuth } = useAuth(); // inquilino
  const {CEO, setCEO} = useCEO();
  const {empleado, setEmpleado} = useEmpleado();
  const {legales} = useLegales();
  const {mudanzas, setMudanzas} = useMudanzas();
  const {propietario, setPropietario} = usePropietario();
  
  const routes = useRoutes([

    {
      element: onBoar ? <DashboardLayout /> : <Navigate to="/registro/bar/onboarding" />,
      children: [
        { element: <Navigate to="/inicio" />, index: true },
        { path: 'inicio', element: <LandingPage /> },
        { path: 'ceo', element: <BlogPage /> },
        { path: 'bares', element: <BaresPage /> },
        { path: 'eventos/:idBlog', element: <IndividualBlog />,},
        { path: 'bares/:idBar', element: <IndividualBar />,},
        { path: 'legales', element: <DashboardPageLegales/>}, 
        { path: 'ceodashb', element: <DashboardPageCEO/>}, 
        { path: 'mudanzas', element: <DashboardPageMudanza/>}, 
        { path: 'propietario', element: <DashboardPagePropietario/>}, 
        { path: 'inquilino', element: <DashboardPageInquilino/>}, 
        { path: 'empleado', element: <DashboardPageEmpleado/>}, 
         
        
 
      ],
    },

    {
      element: myAdmin ? <DashboardLayout /> : <Navigate to="/inicio" />,
      children: [
        { element: <Navigate to="/inicio" />, index: true },
        {path: 'dashboards2', element: <DashboardAppPage2 />,},
      ],
    },

    {
      element: auth ? <DashboardLayout /> : <Navigate to="/inicio" />,
      children: [
        { element: <Navigate to="/inicio" />, index: true },
        {path: 'dashboards', element: <DashboardAppPage />,},
      ],
    },



    {
      element: myBar ? <DashboardLayout /> : <Navigate to="/inicio" />,
      children: [
        { element: <Navigate to="/inicio" />, index: true },
        { path: 'usuarios', element: <MisPublicacionesPage /> },
      ],
    },
    

    {
      path: '/cliente',
      element: onBoar ? <DashboardLayout /> : <Navigate to="/registro/bar/onboarding" />,
      children: [
        { element: <Navigate to="/inicio" />, index: true },
        { path: 'perfil', element: <PerfilUsuario /> ,},
      ],
    },


    {
      path: '/login',
      element: onBoar ? <SimpleLayout /> : <Navigate to="/registro/bar/onboarding" />,
      children: [
        {element: <Navigate to="/inicio" />, index: true},
        {path: 'cliente', element: <LoginPageBar />,},
        {path: 'bar', element: <LoginPage />,},
      ],
    },

    
    {

    path: '/dashboardsEmpleado', 
    element: empleado ? <SimpleLayout /> : <Navigate to="/inicio" />,
    children: [
    {element: <DashboardPageEmpleado/>
    }],
    },

    /* {
      path: '/dashboardsLegales',
      element: legales ? <DashboardPageLegales /> : <Navigate to="/inicio" />,
    }, */
     {
    path: '/dashboards', 
    element: legales ? <DashboardLayout /> : <Navigate to="/inicio" />,
    children: [
    {element: <Navigate to="/inicio" />, index: true},
    {path: 'legales', element: <DashboardPageLegales/>
    }],
    }, 
 
    {
    path: '/dashboardsCEO', element: <DashboardPageCEO/>
    },
    {
    path: '/dashboardsMudanza', element: <DashboardPageMudanza/>
    },
    {
    path: '/dashboardsPropietario', element: <DashboardPagePropietario/>
    },
    {
    path: '/dashboardsInquilino', element: <DashboardPageInquilino/>
    }, 
  
  
  
      


    {
      path: '/registro',

      children: [
        {element: <Navigate to="/inicio" />, index: true},
        
        {path: 'bar', element: onBoar ? <RegisterPageBar /> : <Navigate to="/registro/bar/onboarding" />,},
        
        {path: 'cliente', element: onBoar ? <RegisterPage /> : <Navigate to="/registro/bar/onboarding" />},

        {path: 'bar/onboarding', element: <OnBoardingBar />,},
        {path: 'cliente/onboarding', element: onBoar ? <ExpPage /> : <Navigate to="/registro/bar/onboarding" />},
      ],
    },

    
    {path: 'recupero', element: <RecoverPage />,},

    {path: 'verificacion', element: <VerificationPage />,},
    

   
 
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/inicio" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

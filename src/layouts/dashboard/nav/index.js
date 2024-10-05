import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, Divider} from '@mui/material';
import jwtDecode from 'jwt-decode';
// mock
import account from '../../../_mock/account';
import accountBar from '../../../_mock/accountBar';
import accountNo from '../../../_mock/accountNo';

// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//


import navConfig from './config';
import navConfigLogged from './configLogged';
import navConfigLoggedCEO from './configLoggedCEO'; 
import navConfigLoggedLegales from './configLoggedLegales'; 
import navConfigLoggedMudanza from './configLoggedMudanza'; 
import navConfigLoggedPropietario from './configLoggedPropietario';
import navConfigLoggedEmpleado from './configLoggedEmpleado';



import { useAuth } from '../../../Auth'
import { useMyBar } from '../../../TengoBarAuth';
import { useMyAdmin } from '../../../TengoAdminAuth';
import { useOnBoarding } from '../../../OnBoarding';


import {useCEO} from '../../../AuthCEO'
import {useLegales} from '../../../AuthLegales'
import {useMudanzas} from '../../../AuthMudanzas'
import {usePropietario} from '../../../AuthPropietario'
import {useEmpleado} from '../../../AuthEmpleado'

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const isDesktop = false;

  
  const { myBar, setMyBar } = useMyBar();  
  const { myAdmin, setMyAdmin } = useMyAdmin();  
  const {onBoar, setOnBoar} = useOnBoarding();

  const { auth, setAuth } = useAuth(); // inquilino
  const {CEO, setCEO} = useCEO();
  const {empleado, setEmpleado} = useEmpleado();
  const {legales, setLegales} = useLegales();
  const {mudanzas, setMudanzas} = useMudanzas();
  const {propietario, setPropietario} = usePropietario();

  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }
  
  const jwtToken = getJwtToken();
  const decodedToken = jwtToken ? jwtDecode(jwtToken) : null;

  const baseUrl = "https://music-lovers-production.up.railway.app";


  const [username, setUsername] = useState(decodedToken ? decodedToken.username : accountNo.displayName);
  const [logo, setLogo] = useState( accountNo.photoURL);
  

  const handleAuth = () => {
    onCloseNav();
    document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setAuth(false);
    setMyBar(false);
    setOnBoar(true);
    navigate('/inicio');
  };

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClick = () => {
    navigate('/login/cliente');
  }

  const handleClick2 = () => {
    navigate('/registro/cliente');
  }
  const handleClick3 = () => {
    if (myBar){
      navigate('/bar/perfil');
    } else {
      navigate('/cliente/perfil');
    }
  }
  
  const handleClick4 = () => {
    navigate('/login/bar');
  }

  const handleClick5 = () => {
    navigate('/registro/bar');
  }


  const maxFileNameLength = 17;
  const getFileDisplayName = () => {
    if (username) {
      if (username.length > maxFileNameLength) {
        return `${username.slice(0, maxFileNameLength)}...`;
      }
      return username;
    }
    return '';
  };
  
  



  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      
      <Box sx={{ px: 2.5, pb: 1, pt: 3, display: 'flex', alignItems: 'center' }}>
        <Box>
          <Logo />
       </Box>
       <Typography variant="h6" sx={{ marginLeft: 2, color: 'text.primary'}}>
           Bienvenido.
       </Typography>
      </Box>


      {auth ? (
      <Box sx={{ mb: 2, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>

          {!myBar ? (
          <><Avatar src={logo} alt="photoURL" /></>
        ) : (
          <><Avatar src={logo} alt="photoURL" /></>
        )}

            

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" onClick={handleClick3} sx={{ color: 'text.primary',cursor: 'pointer'  }}>
              {!myBar ? (
                <>{getFileDisplayName(username)}</>
                ) : (
              <>{getFileDisplayName(username)}</>
             )}
                
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>) : (<></>)}

      
      {
  auth && (
    <>
      {CEO && <NavSection data={navConfigLoggedCEO} />}
      {legales && <NavSection data={navConfigLoggedLegales} />}
      {mudanzas && <NavSection data={navConfigLoggedMudanza} />}
      {propietario && <NavSection data={navConfigLoggedPropietario} />}
      {empleado && <NavSection data={navConfigLoggedEmpleado} />}

      {!CEO && !legales && !mudanzas && !propietario && !empleado && (
        <NavSection data={navConfigLogged} />
      )}
    </>
  )
}


  
        

      {auth ? (
           <></>
            ) : (
            <>
            
           
             <Box sx={{ px: 2.5, pb: 0, mt: 2 }}>
      <Stack alignItems="center" spacing={1} sx={{ pt: 0, borderRadius: 2, position: 'relative' }}>
              
                <Box sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h6">
                  ¿Sos usuario?
                </Typography>
              </Box><Button onClick={handleClick} variant="contained" disableElevation>
                  Iniciar sesión
                </Button><Button onClick={handleClick2} variant='outlined'>
                  Registarme
                </Button></Stack></Box></>)}

                <Divider sx={{mt: 5, mr: 2, ml: 2}}/>

                <Box sx={{ px: 2.5, pb: 0, mt: 5 }}>
                <Stack alignItems="center" spacing={1} sx={{ pt: 0, borderRadius: 2, position: 'relative' }}>
      
                {auth ? (
           <><Button onClick={handleAuth} variant='outlined' color="error">
            Cerrar sesión
            </Button></>
            ) : (
            <>

                </>
         )}      </Stack>
     </Box> 

         
       {/* {auth ? (
          <p>Auth es verdadera.</p>
        ) : (
          <p>Auth es falsa.</p>
        )}

    {legales ? (
          <p>legales es verdadera.</p>
        ) : (
          <p>legales es falsa.</p>
        )}

    {CEO ? (
          <p>CEO es verdadera.</p>
        ) : (
          <p>CEO es falsa.</p>
        )} 

    {mudanzas ? (
          <p>mudanzas es verdadera.</p>
        ) : (
          <p>mudanzas es falsa.</p>
        )} 

        {propietario ? (
          <p>propietario es verdadera.</p>
        ) : (
          <p>propietario es falsa.</p>
        )} 

        {empleado ? (
          <p>empleado es verdadera.</p>
        ) : (
          <p>empleado es falsa.</p>
        )}  */}
    

        

      
    
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{

      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

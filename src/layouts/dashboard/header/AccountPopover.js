import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import jwtDecode from 'jwt-decode';
// mocks_
import account from '../../../_mock/account';
import accountBar from '../../../_mock/accountBar';
import accountNo from '../../../_mock/accountNo';

import { useAuth } from '../../../Auth';
import { useMyBar } from '../../../TengoBarAuth';

// ----------------------------------------------------------------------


export default function AccountPopover() {

  const { auth, setAuth } = useAuth();
  const { myBar, setMyBar } = useMyBar();  
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleAuth = () => {
    setOpen(null);
    setAuth(false);
    setMyBar(false);
    document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate('/inicio');

  };

  const handleInicio = () => {
    setOpen(null);
    navigate('/inicio');
  };

  const handleEventos = () => {
    setOpen(null);
    navigate('/eventos');
  };

  const handleBares = () => {
    setOpen(null);
    navigate('/bares');
  };

  const handleMisEventos = () => {
    setOpen(null);
    navigate('/bar/mispublicaciones');
  };
  const handleComentarios = () => {
    setOpen(null);
    navigate('/bar/comentarios');
  };
  const handlePerfil = () => {
    setOpen(null);
    if (myBar){
      navigate('/bar/perfil');
    } else {
      navigate('/cliente/perfil');
    }
    
  };

  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }
  
  const jwtToken = getJwtToken();
  const decodedToken = jwtToken ? jwtDecode(jwtToken) : null;
  

  const baseUrl = "https://music-lovers-production.up.railway.app";


  const [username, setUsername] = useState(decodedToken ? decodedToken.username : accountNo.displayName);
  const [email, setEmail] = useState(decodedToken ? decodedToken.email : accountNo.email);
  const [logo, setLogo] = useState( accountNo.photoURL);
  
  console.log(auth)
  

  

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
    
        {auth ? ( myBar ? (<><Avatar src={logo} alt="photoURL" /></>) : (<><Avatar src={logo} alt="photoURL" /></>)) : (<><Avatar src={accountNo.photoURL} alt="photoURL" /></>)}  
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
          {auth ? ( myBar ? (<>{username} </>) : (<>{username}</>)) : (<>{accountNo.displayName} </>)}  
   
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {auth ? ( myBar ? (<>{email} </>) : (<>{email}</>)) : (<></>)}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          
            <MenuItem onClick={handleInicio}>
              Inicio
            </MenuItem>

            
            
           
          
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        
        
       

        <Divider sx={{ borderStyle: 'dashed' }} />

        {auth ? (<>
        <MenuItem onClick={handleAuth} sx={{ m: 1 }}>
          Cerrar sesión
        </MenuItem></>) : (<></>)}


      </Popover>
    </>
  );
}

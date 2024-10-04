import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Container, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';

import { useAuth } from '../../../Auth'
import { useMyBar } from '../../../TengoBarAuth'
import { useOnBoarding } from '../../../OnBoarding'

// ----------------------------------------------------------------------

export default function LoginFormBar() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { auth, setAuth } = useAuth();

  const { myBar, setMyBar } = useMyBar();

  const { onBoar, setOnBoar } = useOnBoarding();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    navigate('/inicio');
    setAuth(true);
  };

  const handleClick2 = () => {
    navigate('/recupero');
  }

  const handleLoginBar = () => {
    navigate('/inicio');
    setAuth(true);
    setMyBar(true);
  }

  const validateFields = () => {
    if (
      email.trim() === '' ||
      password.trim() === ''

    ) {
      return false; 
    }
    return true; 
  };

  const handleLogin = async () => {

    /* --------------------------------- REVISAR ESTO -----------------------------------------------------*/
    if (!validateFields()) {
      alert('Por favor, complete los campos obligatorios.');
      return;
    }

    try {
    
      const response = await axios.post('https://music-lovers-production.up.railway.app/business/login/', {
        email,
        password,
    
      });
      // Crea el token
      const token = response.data.access;
      if (token){
        document.cookie = `jwtToken=${token}; path=/; SameSite=Strict;`;
        setAuth(true);
        setMyBar(true);

        const decodedToken = jwtDecode(token);
      
        if (decodedToken.user_type === 1 && decodedToken.business_id === null){
          setOnBoar(false);
        }

        navigate('/inicio');
      } 

      if (response.data.detail && response.data.detail[0] === "No user with this email exists."){
        alert('La dirección de correo electrónico no está registrada');  
      } 
      if (response.data.detail && response.data.detail[0] === "No active account found with the given credentials") {
        alert('La contraseña no es válida'); 
      }
      if (response.data.detail && response.data.detail[0] === "Access denied for this user type.") {
        alert('El mail ingresado está registrado como cliente'); 
      }
      

    } catch (error) {
      
      alert("Por favor, verifica los datos ingresados")
    }

    

  };

    // extrae el token de la cookie
    function getJwtToken() {
      const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
      return jwtCookie ? jwtCookie.split('=')[1] : null;
    }

    const handleDecode = async () => {
    const jwtToken = getJwtToken();

    // decodifica el token (si lo encuentra)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
    } else {
      console.error('No se encontró un token JWT en la cookie');
    }

    }

    const handleLogout = () => {
      document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      navigate('/login/cliente');
      setAuth(false);
    };

    

  return (
    <>
      <Stack spacing={3}>
        <TextField name="correo"
           label="Correo electrónico"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           />

        <TextField
          name="Contraseña"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2}}>
        
        <Checkbox name="remember" label="Remember me" /> 
        <Typography variant="subtitle2">
        Recordar mi usuario y contraseña</Typography>
        <Link variant="subtitle2" underline="hover" sx={{pl: 4, cursor: 'pointer',textAlign: "right"}} onClick={handleClick2}>
          ¿Olvidaste tu contraseña? 
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Iniciar Sesión
      </LoadingButton>

      
    </>
  );
}

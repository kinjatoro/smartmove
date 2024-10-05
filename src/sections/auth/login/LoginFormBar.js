import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Container, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';
import { useMyBar } from '../../../TengoBarAuth'


import { useAuth } from '../../../Auth' // INQUILINO
import {useCEO} from '../../../AuthCEO'
import {useLegales} from '../../../AuthLegales'
import {useMudanzas} from '../../../AuthMudanzas'
import {usePropietario} from '../../../AuthPropietario'
import {useEmpleado} from '../../../AuthEmpleado'

// ----------------------------------------------------------------------

export default function LoginFormBar() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);



  const { myBar, setMyBar } = useMyBar();

  

  const { auth, setAuth } = useAuth(); // inquilino
  const {CEO, setCEO} = useCEO();
  const {empleado, setEmpleado} = useEmpleado();
  const {legales, setLegales} = useLegales();
  const {mudanzas, setMudanzas} = useMudanzas();
  const {propietario, setPropietario} = usePropietario();
  

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
    
      const response = await axios.post('https://back-da2-production.up.railway.app/api/login', {
        email,
        password,
    
      });
      console.log(response.data);
      // Crea el token
      const token = response.data.token;
      if (token){
        setAuth(true)
        document.cookie = `jwtToken=${token}; path=/; SameSite=Strict;`;
        if (response.data.rol === 'inquilino'){
          setAuth(true);
          setMudanzas(false);
          setEmpleado(false);
          setPropietario(false);
          setCEO(false);
          setLegales(false);
        }

        if (response.data.rol === 'mudanzas'){
          setMudanzas(true);
          setEmpleado(false);
          setPropietario(false);
          setCEO(false);
          setLegales(false);
          
        }

        if (response.data.rol === 'empleado'){
          setMudanzas(false);
          setEmpleado(true);
          setPropietario(false);
          setCEO(false);
          setLegales(false);
          
        }

        if (response.data.rol ==='propietario'){
          setMudanzas(false);
          setEmpleado(false);
          setPropietario(true);
          setCEO(false);
          setLegales(false);
    
        }

        if (response.data.rol ==='CEO'){
          setMudanzas(false);
          setEmpleado(false);
          setPropietario(false);
          setCEO(true);
          setLegales(false);

        }

        if (response.data.rol === 'legales'){
          setMudanzas(false);
          setEmpleado(false);
          setPropietario(false);
          setCEO(false);
          setLegales(true);
        }
        

        const decodedToken = jwtDecode(token);
      
      

        navigate('/inicio');
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
      <Typography variant="h3" gutterBottom>
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              ¿No tenés cuenta? {''}
              <Link variant="subtitle2" onClick={handleClick} sx={{ cursor: 'pointer' }}>Registrate</Link>
            </Typography>

        
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

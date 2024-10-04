import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../../Auth'
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();

  const handleClick = () => {
    navigate('/inicio', { replace: true });
    setAuth(true);
  };

  const handleClick2 = () => {
    navigate('/registro/cliente/onboarding', { replace: true });
    setAuth(true);
  };

  const validateFields = () => {
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      username.trim() === '' 
    ) {
      return false; 
    }
    return true; 
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {

    if (!validateFields()) {
      alert('Por favor, completá los campos obligatorios.');
      return;
    }


    try {
      const response = await axios.post(
        "https://music-lovers-production.up.railway.app/client/register/",
        {
          email,
          password,
          username,
        }
      );

      const token = response.data.access;

      if (token){
        document.cookie = `jwtToken=${token}; path=/; SameSite=Strict;`;

       
        navigate('/registro/cliente/onboarding', { replace: true });
        setAuth(true);

      } else {
        alert('La dirección de correo electrónico no es válida'); 
      }
      
    } catch (error) {
      alert('Ocurrió un error inesperado. No se pudo completar el registro.');
    }
  };

  return (
    <>
        <Stack spacing={3}>

        <TextField
          name="username"
          label="Tu Nombre"
          value={username}
          onChange={handleChange}
        />

        <TextField
          name="email"
          label="Correo Electrónico"
          value={email}
          onChange={handleChange}
        />
        
        <TextField
          name="password"
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Continuar
      </LoadingButton>

    </>
  );
}

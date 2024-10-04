import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox,
         Typography, Container, Avatar, Card,CardActionArea,CardMedia, CardContent, CardActions,
         Box,Divider,Button, Grid,CardHeader, MenuItem,FormControl,InputLabel,Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useAuth } from '../../../Auth'

// components
import Iconify from '../../../components/iconify';

import foto from '../../../fb.jpg'


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();

  const [cambioLogo, setCambioLogo] = useState(false);

  const [logo, setLogo] = useState();
  const [genre1, setGenre1] = useState("");
  const [genre2, setGenre2] = useState("");
  const [genre3, setGenre3] = useState("");

  const handleLogoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile){
      setLogo(selectedFile);
      setCambioLogo(true);
    }
  };

  const handleGenre1Change = (e) => {
    setGenre1(e.target.value); 
  };

  const handleGenre2Change = (e) => {
    setGenre2(e.target.value); 
  };

  const handleGenre3Change = (e) => {
    setGenre3(e.target.value); 
  };

  const validateFields = () => {
    if (
      genre1.trim() === '' ||
      genre2.trim() === '' ||
      genre3.trim() === '' ||
      logo === null
    ) {
      return false; 
    }
    return true; 
  };

  const handleClick = () => {
    navigate('/eventos', { replace: true });
    setAuth(true);
  };

  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  const cookieValue = getJwtToken();
  const decodedToken = jwtDecode(cookieValue);

  
  const [username, setUsername] = useState(decodedToken.username);
  const [email, setEmail] = useState(decodedToken.email);

  const handleRegisterBack = async () => {


    if (!validateFields()) {
      alert('Por favor, completá los campos obligatorios.');
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${cookieValue}`,
        'Content-Type': 'multipart/form-data', // Importante para indicar que estás enviando un formulario con datos binarios (archivos)
      },
    };

    const genero1 = genre1.toUpperCase();
    const genero2 = genre2.toUpperCase();
    const genero3 = genre3.toUpperCase();

    const formData = new FormData();

    formData.append('genre1', genero1);
    formData.append('genre2', genero2);
    formData.append('genre3', genero3);

    if (cambioLogo){
      formData.append('logo', logo);
    } else {
      const blob = await fetch(foto).then((r) => r.blob()); // Convierte la referencia a una imagen en un blob
      const file = new File([blob], 'myImage.jpg'); // Crea un archivo a partir del blob
      formData.append('logo', file);

    }
    


    try {
      const response = await axios.put(
        "https://music-lovers-production.up.railway.app/client/modify/",
        formData,
        config
      );

      const token = response.data.access;

      if (token){
        document.cookie = `jwtToken=${token}; path=/; SameSite=Strict;`;

        navigate('/eventos', { replace: true });
        setAuth(true);

      } else {
        alert('Por favor, verifica los campos ingresados.');
      }

    } catch (error) {
      console.error("Error de registro", error);
      alert('Ocurrió un error inesperado. No se pudo completar la creación del evento.');
    }



  };

  return (
    <>
      <Stack spacing={1}>
      
      <Card sx={{mb:4,mr:3, ml:6}}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
              src={logo ? URL.createObjectURL(logo) : foto}
              sx={{
                height: 40,
                mb: 1,
                width: 40
              }}
              style={{ width: 80, height: 80 }}
            />
           
          
          <Typography
            gutterBottom
            variant="h5"
          >
          
                {username}
          
     
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {email}
          </Typography>

        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>

      <label htmlFor="fileInput" >
              <input
              type="file"
              accept="image/*" 
              style={{ display: 'none' }}
              onChange={handleLogoChange}
              id="fileInput"
            />
        <Button
          fullWidth
          variant="text"
          color='secondary'
          component="span"
        >
          Subir foto de usuario
        </Button></label>




      </CardActions>
    </Card>
    


    <Card sx={{ml:3}}> 
        <CardHeader
          title="Preferencias musicales"
          sx={{ml:2}}
        />
        <CardContent sx={{ mx:2 }}>
          <Box sx={{ }}>

           
           <FormControl fullWidth sx={{ mb:2 }}>
                  <InputLabel id="genre1">Género 1</InputLabel>
                  <Select
                    labelId="genre1"
                    id="genre1"
                    label="Género 1"
                    onChange={handleGenre1Change}
                    value={genre1}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 200} } }}

                  >
                    <MenuItem value="Rock">Rock</MenuItem>
                    <MenuItem value="Pop">Pop</MenuItem>
                    <MenuItem value="Electro">Electro</MenuItem>
                    <MenuItem value="Hiphop">Hiphop</MenuItem>
                    <MenuItem value="Reggae">Reggae</MenuItem>
                    <MenuItem value="Reggaeton">Reggaeton</MenuItem>
                    <MenuItem value="Cumbia">Cumbia</MenuItem>
                    <MenuItem value="Salsa">Salsa</MenuItem>
                    <MenuItem value="Tango">Tango</MenuItem>
                    <MenuItem value="Folklore">Folklore</MenuItem>
                    <MenuItem value="Jazz">Jazz</MenuItem>
                    <MenuItem value="Blues">Blues</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                    
                  </Select>
                </FormControl>
              

                <FormControl fullWidth sx={{ mb:2 }}>
                  <InputLabel id="genre">Género 2</InputLabel>
                  <Select
                    labelId="genre2"
                    id="genre2"
                    label="Género 2"
                    onChange={handleGenre2Change}
                    value={genre2}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}

                  >
                    <MenuItem value="Rock">Rock</MenuItem>
                    <MenuItem value="Pop">Pop</MenuItem>
                    <MenuItem value="Electro">Electro</MenuItem>
                    <MenuItem value="Hiphop">Hiphop</MenuItem>
                    <MenuItem value="Reggae">Reggae</MenuItem>
                    <MenuItem value="Reggaeton">Reggaeton</MenuItem>
                    <MenuItem value="Cumbia">Cumbia</MenuItem>
                    <MenuItem value="Salsa">Salsa</MenuItem>
                    <MenuItem value="Tango">Tango</MenuItem>
                    <MenuItem value="Folklore">Folklore</MenuItem>
                    <MenuItem value="Jazz">Jazz</MenuItem>
                    <MenuItem value="Blues">Blues</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                    
                  </Select>
                </FormControl>


                <FormControl fullWidth>
                  <InputLabel id="genre">Género 3</InputLabel>
                  <Select
                    labelId="genre3"
                    id="genre3"
                    label="Género 3"
                    onChange={handleGenre3Change}
                    value={genre3}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}

                  >
                    <MenuItem value="Rock">Rock</MenuItem>
                    <MenuItem value="Pop">Pop</MenuItem>
                    <MenuItem value="Electro">Electro</MenuItem>
                    <MenuItem value="Hiphop">Hiphop</MenuItem>
                    <MenuItem value="Reggae">Reggae</MenuItem>
                    <MenuItem value="Reggaeton">Reggaeton</MenuItem>
                    <MenuItem value="Cumbia">Cumbia</MenuItem>
                    <MenuItem value="Salsa">Salsa</MenuItem>
                    <MenuItem value="Tango">Tango</MenuItem>
                    <MenuItem value="Folklore">Folklore</MenuItem>
                    <MenuItem value="Jazz">Jazz</MenuItem>
                    <MenuItem value="Blues">Blues</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                    
                  </Select>
                </FormControl>
            
          </Box>
        </CardContent>

      </Card>          









    
      </Stack>

              





      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleRegisterBack} sx={{mt:3}}>
        Registrarme
      </LoadingButton>
    </>
  );
}

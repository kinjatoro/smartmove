import axios from 'axios';
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox,
         Typography, Container, Avatar, Card,CardActionArea,CardMedia, CardContent, CardActions,
         Box,Divider,Button, Grid,CardHeader, MenuItem,FormControl,InputLabel,Select } from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { useAuth } from '../../../Auth'
import { useMyBar } from '../../../TengoBarAuth'
import { useOnBoarding } from '../../../OnBoarding'

// components
import Iconify from '../../../components/iconify';

import foto from '../../../fb.jpg'
import negocio from '../../../negocio.jpg'
import bar from '../../../bar.jpg'


// ----------------------------------------------------------------------

export default function OnBoardingBarForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();

  const { myBar, setMyBar } = useMyBar();

  const { onBoar, setOnBoar } = useOnBoarding();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [description, setDescription] = useState('');
  
  const validateFields = () => {
    if (
      name.trim() === '' ||
      description.trim() === '' ||
      neighbourhood.trim() === '' ||
      address.trim() === '' ||
      city.trim() === '' ||
      phone.trim() === '' ||
      logo === null || 
      banner === null
    ) {
      return false; 
    }
    return true; 
  };
  
  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  const cookieValue = getJwtToken();

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

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('neighbourhood', neighbourhood);
    formData.append('city', city);
    formData.append('phone', phone);
    formData.append('logo', logo);
    formData.append('banner', banner); 
    formData.append('description', description);

    try {
      const response = await axios.post(
        "https://music-lovers-production.up.railway.app/business/create/",
        formData,
        config
      );
      const token = response.data.access;

      if (token){
        document.cookie = `jwtToken=${token}; path=/; SameSite=Strict;`;

        navigate('/bar/mispublicaciones', { replace: true });
        setAuth(true);
        setMyBar(true);
        setOnBoar(true);

      } else {
        alert('Por favor, verifica los campos ingresados.');
      }

      

    } catch (error) {
      console.error("Error de registro", error);
      alert('Ocurrió un error inesperado. No se pudo completar la creación del evento.');
    }






  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldFunctions = {
      name: setName,
      description: setDescription,
      phone: setPhone,
      address: setAddress,
      neighbourhood: setNeighbourhood,
      city: setCity,
    };
  
    const updateFunction = fieldFunctions[name];
    if (updateFunction) {
      updateFunction(value);
    }
  };
  
  const handleLogoChange = (event) => {
    const selectedFile = event.target.files[0];
    setLogo(selectedFile);
  };
  
  const handleBannerChange = (e) => {
    const selectedFile = e.target.files[0];
    setBanner(selectedFile);
  };


  return (
    <>
      <Stack spacing={1}>
      

    
    
  <Card sx={{ ml: 3 }}>
  <CardHeader   />
  <CardContent sx={{ mx: 2 }}>
    <Box sx={{ "& > *": { mb: 2 } }}>
      <Grid xs={12} md={12}>
        <TextField
          fullWidth
          label="Nombre del Bar"
          name="name"
          onChange={handleChange}
          value={name}
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          fullWidth
          label="Descripcion"
          name="description"
          onChange={handleChange}
       
          value={description}
          multiline
          rows={3}
        />
      </Grid>
     
      
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Número de teléfono"
          name="phone"
          onChange={handleChange}
          type="number"
          value={phone}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Ciudad"
          name="city"
          onChange={handleChange}

          value={city}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Barrio"
          name="neighbourhood"
          onChange={handleChange}

          value={neighbourhood}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Dirección"
          name="address"
          onChange={handleChange}

          value={address}
        />
      </Grid>
    </Box>
  </CardContent>
</Card>
         

      





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
              src={logo ? URL.createObjectURL(logo) : bar}
              sx={{
                height: 40,
                mb: 1,
                width: 40
              }}
              style={{ width: 80, height: 80 }}
            />
           
          
          <Typography gutterBottom variant="h5">
              {name}
          </Typography>

          <Typography gutterBottom variant="body2">
                {address}
          </Typography>

        </Box>
      </CardContent>
      <Divider />
      
      <label htmlFor="fileInput" >
              <input
              type="file"
              accept="image/*" // Puedes especificar el tipo de archivo que esperas aquí
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
          Subir logo del bar
        </Button></label>
      
    </Card>






















    <Card sx={{mb:4,mr:3, ml:6}}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
            
          }}
        >
   
              <img src={banner ? URL.createObjectURL(banner) : negocio} alt='banner' style={{ 
              width: "200px",
              height: "200px", 
              objectFit: "cover", 
              objectPosition: "center",
              borderRadius: "10%",
              }
              }/>

              
        
        </Box>
      </CardContent>
      <Divider />
      <label htmlFor="fileInput2" >
              <input
              type="file"
              accept="image/*" 
              style={{ display: 'none' }}
              onChange={handleBannerChange}
              id="fileInput2"
            />
        <Button
          fullWidth
          variant="text"
          color='secondary'
          component="span"
        >
          Subir foto del bar
        </Button></label>
    </Card>

    
      </Stack>

              





      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleRegisterBack} sx={{mt:3}}>
        Completar registro
      </LoadingButton>
    </>
  );
}

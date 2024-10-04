import {Avatar,Box, Button, Card, CardActions, CardHeader, CardContent, Container, Divider, Stack, TextField, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useCallback, useState,useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
// @mui
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useMyBar } from '../TengoBarAuth';



import foto from '../logo.svg'
import {AccountProfileDetailsBar, AccountProfileBar} from '../sections/auth/login';



// ----------------------------------------------------------------------



const DATOS = {
  name: 'El rincón del vago',
  address: 'Santa Clara del Corazón 243',
  neighbourhood: 'Palermo',
  city: 'CABA',
  phone: '4296-2007',
  logo: '../logo.svg',
  banner: '/assets/images/avatars/ID_20827.jpg',
  description: 'esta es una descripcion'
};



export default function PerfilBar() {

function getJwtToken() {
  const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
  return jwtCookie ? jwtCookie.split('=')[1] : null;
}

const jwtToken = getJwtToken();
const decodedToken = jwtDecode(jwtToken);

  useEffect(() => {
    handleLogin();
  }, []);

const handleLogin = async () => {

  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  };


  try {
    const response = await axios.get('https://music-lovers-production.up.railway.app/business/view/', config);
    
    // Crea el token
    const aux = response.data;
    setId(aux.id)
    setName(aux.name);
    setAddress(aux.address);
    setNeighbourhood(aux.neighbourhood);
    setCity(aux.city);
    setPhone(aux.phone);
    setLogo(baseUrl+aux.logo);
    setBanner(baseUrl+aux.banner);
    setDescription(aux.description);

  } catch (error) {
    console.error('Error de inicio de sesión', error);
  }

};

const { myBar, setMyBar } = useMyBar();
const [id, setId] = useState();
const [name, setName] = useState();
const [username, setUsername] = useState(decodedToken.username);
const [email, setEmail] = useState(decodedToken.email);
const [address, setAddress] = useState();
const [neighbourhood, setNeighbourhood] = useState();
const [city, setCity] = useState();
const [phone, setPhone] = useState();
const [logo, setLogo] = useState();
const [banner, setBanner] = useState();
const [description, setDescription] = useState();

const baseUrl = "https://music-lovers-production.up.railway.app";

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

const [cambioLogo, setCambioLogo] = useState(false);
const [cambioBanner, setCambioBanner] = useState(false);


const handleLogoChange = (e) => {
  const selectedFile = e.target.files[0];
  
  if (selectedFile){
    setLogo(selectedFile);
    setCambioLogo(true);
  }
  
};

const handleBannerChange = (e) => {
  const selectedFile = e.target.files[0];

  if (selectedFile){
    setBanner(selectedFile);
    setCambioBanner(true);
  }
};

const handleBackGuardarCambios = async () => {
  if (!validateFields()) {
    alert('Por favor, complete los campos obligatorios.');
    return;
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'multipart/form-data', // Importante para indicar que estás enviando un formulario con datos binarios (archivos)
    },
  };

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('neighbourhood', neighbourhood);
    formData.append('phone', phone);
    
    if (cambioLogo){
      formData.append('logo', logo);
    }
    

    if (cambioBanner){
    formData.append('banner', banner);
    }

    formData.append('description', description);

    try {
      await axios.put(
        "https://music-lovers-production.up.railway.app/business/modify/",
        formData,
        config
      );

      window.location.reload();

    } catch (error) {
      console.error("Error de registro", error);
      alert('Ocurrió un error inesperado. No se pudo completar la modificación del perfil.');
    }

}


  
  return (

  
    <>

      <Helmet>
        <title> Perfil Bar | SmartMove </title>
      </Helmet>

      <Container>
        <Stack spacing={3}>
          <div>
            <Typography variant="h3" sx={{mb:2, ml:2, mt:-4}}>
              Cuenta
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              
              <Grid
                xs={12}
                md={6}
                lg={4}
                
              >
                <>
    <Card sx={{mb:4,mr:3, ml:2}}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
        
                <Avatar
                src={cambioLogo ? URL.createObjectURL(logo) : logo}
                sx={{
                  height: 57,
                  mb: 2,
                  width: 57
                }}
              />
              
          
          <Typography
            gutterBottom
            variant="h5"
          >
          
                {name}
                
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {address}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {neighbourhood}
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
            Cambiar foto de perfil
          </Button></label>




        </CardActions>
    </Card></>
    <>

    <Card sx={{mb:4,mr:3, ml:2}}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <img src={cambioBanner ? URL.createObjectURL(banner): banner} alt="banner" style={{ 
          width: "200px",
          height: "200px", /* Alto deseado */
          objectFit: "cover", /* Recorta la imagen para que llene el contenedor */
          objectPosition: "center", /* Mantiene el centro de la imagen visible */
          borderRadius: "10%",
}
 }/>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>

                

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
            Cambiar banner
          </Button></label>




</CardActions>
    </Card>
    
    </>
              </Grid>
              
              
              <Grid
                xs={12}
                 md={6}
                lg={8}
              >
                <>
 
      <Card sx={{ml:1}}> 
        <CardHeader
          title="Tus datos"
          sx={{py:2,ml:1}}
        />
        <CardContent sx={{ pt: 0, mx:2 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Nombre del Bar"
                  name="name"
                  onChange={handleChange}
                  value={name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                
              >
                <TextField
                  fullWidth
                  label="Descripcion"
                  name="description"
                  onChange={handleChange}
                  value={description}
                  multiline
                  rows={3}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Nombre de usuario"
                  name="username"
                  onChange={handleChange}
                  
                  value={username}
                  disabled
                />
              </Grid>


              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  
                  value={email}
                  disabled
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Número de teléfono"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={phone}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Ciudad"
                  name="city"
                  onChange={handleChange}
                  value={city}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Barrio"
                  name="neighbourhood"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={neighbourhood}
                />
                  
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Dirección"
                  name="address"
                  onChange={handleChange}
                  value={address}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              
              </Grid>
              
            </Grid>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button  color='primary' sx={{mx:3,mb:1,mt:-2}} variant="contained" onClick={handleBackGuardarCambios}>
            Guardar cambios
          </Button>
        </CardActions>
      </Card>
  
    </>
                {/* <AccountProfileDetailsBar /> */}
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>

     
    </>
  );
}

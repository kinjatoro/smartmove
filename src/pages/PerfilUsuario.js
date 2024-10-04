import {Avatar,Box, Button, Card, MenuItem,FormControl,InputLabel,Select, CardActions, CardHeader, CardContent, Container, Divider, Stack, TextField, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useCallback, useState, useEffect } from 'react';

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



export default function PerfilUsuario() {

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
  const response = await axios.get('https://music-lovers-production.up.railway.app/client/get-preferences/', config);
  
  // Crea el token
  const aux = response.data;
  setId(aux.id);
  if (aux.genre1){
    const lowerCaseText = aux.genre1.toLowerCase();
    const capitalizedText = lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1);
    setGenre1(capitalizedText);
  }

  if (aux.genre2){
    const lowerCaseText2 = aux.genre2.toLowerCase();
    const capitalizedText2 = lowerCaseText2.charAt(0).toUpperCase() + lowerCaseText2.slice(1);
    setGenre2(capitalizedText2);
  }


  if (aux.genre3){
    const lowerCaseText3 = aux.genre3.toLowerCase();
    const capitalizedText3 = lowerCaseText3.charAt(0).toUpperCase() + lowerCaseText3.slice(1);
    setGenre3(capitalizedText3);
  }

  if (aux.logo){
    setLogo(baseUrl+aux.logo);
  }



  


} catch (error) {
  console.error('Error de inicio de sesión', error);
}

};

const { myBar, setMyBar } = useMyBar();

const [username, setUsername] = useState(decodedToken.username);
const [email, setEmail] = useState(decodedToken.email);
const [logo, setLogo] = useState();
const [genre1, setGenre1] = useState("");
const [genre2, setGenre2] = useState("");
const [genre3, setGenre3] = useState("");
const [cambioLogo, setCambioLogo] = useState(false);
const baseUrl = "https://music-lovers-production.up.railway.app";
const [id, setId] = useState();

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


const handleBackGuardarCambios = async () => {


  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'multipart/form-data', // Importante para indicar que estás enviando un formulario con datos binarios (archivos)
    },
  };

    const genero1 = genre1.toUpperCase();
    const genero2 = genre2.toUpperCase();
    const genero3 = genre3.toUpperCase();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('genre1', genero1);
    formData.append('genre2', genero2);
    formData.append('genre3', genero3);


    
    if (cambioLogo){
      formData.append('logo', logo);
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

        window.location.reload();

      } else {
        alert('Por favor, verifica los campos ingresados.');
      }

      

    } catch (error) {
      console.error("Error de registro", error);
      alert('Ocurrió un error inesperado. No se pudo completar la modificación del perfil.');
    }

}

  
  return (

  
    <>

      <Helmet>
        <title> Perfil Usuario | SmartMove </title>
      </Helmet>

      <Container>
        <Stack spacing={3}>
          <div>
            <Typography variant="h3" sx={{mb:2, ml:2}}>
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
    <Card sx={{mb:1,mr:3, ml:2}}>
      <CardContent sx={{mb:-2}}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
        
                <Avatar
                src={cambioLogo ? URL.createObjectURL(logo): logo}
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
          
                {username}
                
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
          >
            {email} </Typography>

        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>

                

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
          Cambiar foto de perfil
        </Button></label>




      </CardActions>
    </Card></>
    <>

    
    
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
                md={6}
              >
                <TextField
                  fullWidth
                  label="Nombre de usuario"
                  name="username"
                  
                  
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
                  
                  
                  value={email}
                  disabled
                />
              </Grid>


              <Grid
                xs={12}
                md={6}
              >
              <FormControl fullWidth>
                  <InputLabel id="genre1">Género 1</InputLabel>
                  <Select
                    labelId="genre1"
                    id="genre1"
                    label="Género 1"
                    onChange={handleGenre1Change}
                    value={genre1}
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
              
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
              <FormControl fullWidth>
                  <InputLabel id="genre2">Género 2</InputLabel>
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
              
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
              <FormControl fullWidth>
                  <InputLabel id="genre3">Género 3</InputLabel>
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

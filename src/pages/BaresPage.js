import { useState,useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container,  Menu, MenuItem,  Box,
  Stack,

  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel} from '@mui/material';


  import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Scrollbar from '../components/scrollbar';

import { ProductSort} from '../sections/@dashboard/products';

// components
import Iconify from '../components/iconify';

import { BarPostCard, BlogPostsSort, BlogPostsSearch,ProductFilterSidebar } from '../sections/@dashboard/blog';

// ----------------------------------------------------------------------


export const FILTER_CATEGORIA_OPTIONS = ['Matemática', 'Música', 'Química', 'Historia', 'Geografía', 'Inglés', 'Programación' ];
export const FILTER_TIPOCLASE_OPTIONS = ['Individual', 'Grupal'];
export const FILTER_RATING_OPTIONS = ['up5Star', 'up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_FRECUENCIA_OPTIONS = ['Única', 'Semanal', 'Mensual'];

export default function BaresPage() {
  const [EVENTOS, setEVENTOS] = useState([]);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.get('https://music-lovers-production.up.railway.app/business/filter/');

      const aux = response.data;
      setEVENTOS(aux);
      setFilteredBlog(aux);



    } catch (error) {
      console.error('Ocurrió un error al intentar cargar los eventos', error);
    }

  };


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlog, setFilteredBlog] = useState(EVENTOS);

  
  const [open, setOpen] = useState(null);

  const [orden, setOrden] = useState('Destacado');

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Filtra las cartas en función de la búsqueda y orden actual
    const filtered = EVENTOS.filter((card) =>
      card.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBlog(filtered); // Actualiza el estado con el resultado de la búsqueda
  };

  

  const handleDestacado = () => {
    setFilteredBlog(EVENTOS);
    setOpen(null);
    setOrden('Destacado');
  };

  const handleGenero = () => {
    const sortedBlog = [...filteredBlog];
    sortedBlog.sort((a, b) => {
      const generoA = a.neighbourhood; // Asegúrate de usar la propiedad correcta que almacena el género de las publicaciones
      const generoB = b.neighbourhood; // Asegúrate de usar la propiedad correcta que almacena el género de las publicaciones
  
      // Realiza la comparación de género. Puedes usar una lógica personalizada o comparar cadenas de texto.
      // Por ejemplo, ordenar alfabéticamente las cadenas de texto de género.
      return generoA.localeCompare(generoB);
    });
  
    setFilteredBlog(sortedBlog); // Actualiza el estado con el nuevo orden
    setOpen(null);
    setOrden('Barrio'); // Establece la etiqueta del orden
  };
  
  const handleCalificacion = () => {
    const sortedBlog = [...filteredBlog];
    sortedBlog.sort((a, b) => {
      const priceA = parseFloat(a.average_rating);
      const priceB = parseFloat(b.average_rating);
      return  priceB - priceA;
    });
    setFilteredBlog(sortedBlog); // Actualiza el estado con el nuevo orden
    setOpen(null);
    setOrden('Calificación');
  };
  

  
  return (

  
    <>
      <Helmet>
        <title> Bares | SmartMove </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h3" gutterBottom>
            Bares
          </Typography>
          
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
              <input
              type="text"
              placeholder="Buscar por título..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                width: '300px',
                height: '55px', 
                fontSize: '16px',
                borderRadius: '10px', // Cambia el redondeo de las esquinas
                border: '2px solid #f0f0f0',
                paddingLeft: "10px",
                backgroundColor: '#F9FAFB'
              }}
            />
              
            <Box sx={{textAlign: "right"}}>

                <Button
                  color="inherit"
                  disableRipple
                  onClick={handleOpen}
                  endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
                >

                  {/* Ordenar Por: */}
                  
                  &nbsp;
                  <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary', ml:0.5 }}>
                    {orden}
                  </Typography>
                </Button>
                <Menu
                  keepMounted
                  anchorEl={open}
                  open={Boolean(open)}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  
                    <MenuItem
                      key={"destacado"}
                      selected={"destacado" === 'newest'}
                      onClick={handleDestacado}
                      sx={{ typography: 'body2' }}
                    >
                      {"Destacado"}
                    </MenuItem>
                  


                    <MenuItem
                      key={"barrio"}
                      selected={"barrio" === 'newest'}
                      onClick={handleGenero}
                      sx={{ typography: 'body2' }}
                    >
                      {"Barrio"}
                    </MenuItem>

                    <MenuItem
                      key={"calificacion"}
                      selected={"calificacion" === 'newest'}
                      onClick={handleCalificacion}
                      sx={{ typography: 'body2' }}
                    >
                      {"Calificación"}
                    </MenuItem>


                </Menu>

            </Box>

        </Stack>

        <Grid container spacing={3}>
          {filteredBlog.map((evento , index) => (
            <BarPostCard post={evento} index={index} />
          ))}
        </Grid>
      </Container>


    </>
  );
}

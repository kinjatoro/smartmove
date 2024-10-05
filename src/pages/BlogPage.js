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
  FormControlLabel,InputLabel,Select,FormControl,TextField} from '@mui/material';


  import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Scrollbar from '../components/scrollbar';

import { ProductSort} from '../sections/@dashboard/products';

// components
import Iconify from '../components/iconify';

import { BlogPostCard, BlogPostsSort, BlogPostsSearch,ProductFilterSidebar } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';



import { useAuth } from '../Auth'
import { useMyBar } from '../TengoBarAuth'

// ----------------------------------------------------------------------







export default function BlogPage() {

  const FILTER_GENERO_OPTIONS = ['Rock', 'Pop', 'Electro', 'Hiphop', 'Reggae', 'Reggaeton', 'Cumbia','Salsa','Tango','Folklore','Jazz','Blues','Otro' ];
  const [EVENTOS, setEVENTOS] = useState([]);
  const [URL, setURL] = useState("https://music-lovers-production.up.railway.app/business/events/filter/?");

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {

    try {
      let newURL = "https://music-lovers-production.up.railway.app/business/events/filter/?";
  
      if (dia && mes && anio) {

        const fecha1 = `mindate=${anio}-${mes}-${dia}&`;
        newURL += fecha1;
      }
  
      if (dia2 && mes2 && anio2) {

        const fecha2 = `maxdate=${anio2}-${mes2}-${dia2}&`;
        newURL += fecha2;
      }
  
      if (price) {
       
        const fecha3 = `minprice=${price}&`;
        newURL += fecha3;
      }

      if (price2) {
        
        const fecha4 = `maxprice=${price2}&`;
        newURL += fecha4;
      }
      if (selectedGenres.length > 0) {
        const generos = selectedGenres.map((genero) => `genre=${genero}`).join('&');
        newURL += `${generos}&`;
      }
      
  
      await setURL(newURL); // Actualiza URL de manera síncrona


  
      const response = await axios.get(newURL); // Usa la nueva URL

      const aux = response.data;
      setEVENTOS(aux);
      setFilteredBlog(aux);
    
    } catch (error) {
      console.error('Ocurrió un error al intentar cargar los eventos', error);
    }
    setOpenFilter(false);
  };
  




  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("2023");

  const [dia2, setDia2] = useState("");
  const [mes2, setMes2] = useState("");
  const [anio2, setAnio2] = useState("2023");



  const [price, setPrice] = useState("");
  const [price2, setPrice2] = useState("");

  const [selectedGenres, setSelectedGenres] = useState([]);



  const [openFilter, setOpenFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlog, setFilteredBlog] = useState(POSTS);

  
  const [open, setOpen] = useState(null);

  const [orden, setOrden] = useState('Destacado');

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };



  const handleDiaChange = (e) => {
    setDia(e.target.value); 
  };

  const handleMesChange = (e) => {
    setMes(e.target.value); 
  };

  const handleAnioChange = (e) => {
    setAnio(e.target.value); 
  };

  const handleDia2Change = (e) => {
    setDia2(e.target.value); 
  };

  const handleMes2Change = (e) => {
    setMes2(e.target.value); 
  };

  const handleAnio2Change = (e) => {
    setAnio2(e.target.value); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldFunctions = {
      price: setPrice,
      price2: setPrice2,
    };
  
    const updateFunction = fieldFunctions[name];
    if (updateFunction) {
      updateFunction(value);
    }
  };
 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Filtra las cartas en función de la búsqueda y orden actual
    const filtered = POSTS.filter((card) =>
      card.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBlog(filtered); // Actualiza el estado con el resultado de la búsqueda
  };

  const handleMayorPrecio = () => {
    const sortedBlog = [...filteredBlog];
    sortedBlog.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return priceB - priceA;
    });
    setFilteredBlog(sortedBlog); // Actualiza el estado con el nuevo orden
    setOpen(null);
    setOrden('Mayor Precio');
  };

  const handleMenorPrecio = () => {
    const sortedBlog = [...filteredBlog];
    sortedBlog.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return  priceA - priceB;
    });
    setFilteredBlog(sortedBlog); // Actualiza el estado con el nuevo orden
    setOpen(null);
    setOrden('Menor Precio');
  };

  const handleProximamente = () => {
    const sortedBlog = [...filteredBlog];
    sortedBlog.sort((a, b) => {
      const dateA = new Date(a.datetime).getTime();
      const dateB = new Date(b.datetime).getTime();
      return dateA - dateB;
    });
  
    setFilteredBlog(sortedBlog);
    setOpen(null);
    setOrden('Proximamente');
  };
  

  const handleDestacado = () => {
    setFilteredBlog(EVENTOS);
    setOpen(null);
    setOrden('Destacado');
  };


  
  
  const handleGeneroChange = (e, genero) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedGenres([...selectedGenres, genero]);
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genero));
    }
  };
  


  
  return (

  
    <>
      <Helmet>
        <title> Lista de dashboards | SmartMove </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h3" gutterBottom>
            Lista de dashboards
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
                borderRadius: '10px', 
                border: '2px solid #f0f0f0',
                paddingLeft: "10px",
                backgroundColor: '#F9FAFB',
                
              }}
            />
              
            <Box sx={{textAlign: "right"}}>
              
            <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} >
                Filtrar&nbsp;
             </Button>



                <Button
                  color="inherit"
                  disableRipple
                  
                  endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} 
                   
                  />
                 
                }
                >
                  {/* // Ordenar Por: */}
                  
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
                      key={"proximamente"}
                      selected={"nuevo" === 'newest'}
                      onClick={handleProximamente}
                      sx={{ typography: 'body2' }}
                    >
                      {"Próximamente"}
                    </MenuItem>


                    <MenuItem
                      key={"mayor precio"}
                      selected={"mayor precio" === 'newest'}
                      onClick={handleMayorPrecio}
                      sx={{ typography: 'body2' }}
                    >
                      {"Mayor precio"}
                    </MenuItem>


                    <MenuItem
                      key={"menor precio"}
                      selected={"menor precio" === 'newest'}
                      onClick={handleMenorPrecio}
                      sx={{ typography: 'body2' }}
                    >
                      {"Menor precio"}
                    </MenuItem>


                    <MenuItem
                      key={"genero"}
                      selected={"genero" === 'newest'}
             
                      sx={{ typography: 'body2' }}
                    >
                      {"Género"}
                    </MenuItem>


                </Menu>





            </Box>

        </Stack>

        <Grid container spacing={3}>
          {filteredBlog.map((POSTS, index) => (
            <BlogPostCard post={POSTS} index={index} />
          ))}
        </Grid>
      </Container>













































      <Drawer
        anchor="right"
        open={openFilter}
        onClose={handleCloseFilter}
        PaperProps={{
          sx: { width: 350, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
        
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filtrar
          </Typography>
          <IconButton onClick={handleCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>


          <div>
              <Typography variant="subtitle1" gutterBottom>
                Rango de Precios
              </Typography>
              

              
          <Box mt={2} backgroundColor='white'>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField label="Mínimo" type="number" size="small" fullWidth value={price} name="price" onChange={handleChange} />
              </Grid>
              <Grid item xs={2} mt = {0.2} ml={-1} mr={-1}
              sx={{display: "flex",
                  justifyContent: "center",
                  alignIitems: "center",
                  }}> _
                
              </Grid>

              <Grid item xs={5}>
                <TextField  label="Máximo" type="number" size="small" fullWidth value={price2} name="price2" onChange={handleChange} />
              </Grid>
            </Grid>
          </Box>

            </div>
            <Divider />

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Desde
              </Typography>

              <Box mt={2} backgroundColor='white' >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="dia">Dia</InputLabel>
                  <Select
                    labelId="dia"
                    id="dia"
                    label="Día"
                    onChange={handleDiaChange}
                    value={dia}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}

                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="13">13</MenuItem>
                    <MenuItem value="14">14</MenuItem>
                    <MenuItem value="15">15</MenuItem>
                    <MenuItem value="16">16</MenuItem>
                    <MenuItem value="17">17</MenuItem>
                    <MenuItem value="18">18</MenuItem>
                    <MenuItem value="19">19</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="21">21</MenuItem>
                    <MenuItem value="22">22</MenuItem>
                    <MenuItem value="23">23</MenuItem>
                    <MenuItem value="24">24</MenuItem>
                    <MenuItem value="25">25</MenuItem>
                    <MenuItem value="26">26</MenuItem>
                    <MenuItem value="27">27</MenuItem>
                    <MenuItem value="28">28</MenuItem>
                    <MenuItem value="29">29</MenuItem>
                    <MenuItem value="30">30</MenuItem>
                    <MenuItem value="31">31</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="mes">Mes</InputLabel>
                  <Select
                    labelId="mes"
                    id="mes"
                    label="Mes"
                    onChange={handleMesChange}
                    value={mes}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}

                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="anio">Año</InputLabel>
                  <Select
                    labelId="anio"
                    id="anio"
                    label="Año"
                    onChange={handleAnioChange}
                    value={anio}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}

                  >
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2025">2025</MenuItem>
                    <MenuItem value="2026">2026</MenuItem>
                    <MenuItem value="2027">2027</MenuItem>
                    <MenuItem value="2028">2028</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>  


            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Hasta
              </Typography>

              <Box mt={2} backgroundColor='white' >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="dia2">Dia</InputLabel>
                  <Select
                    labelId="dia2"
                    id="dia2"
                    label="Día"
                    onChange={handleDia2Change}
                    value={dia2}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}

                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="13">13</MenuItem>
                    <MenuItem value="14">14</MenuItem>
                    <MenuItem value="15">15</MenuItem>
                    <MenuItem value="16">16</MenuItem>
                    <MenuItem value="17">17</MenuItem>
                    <MenuItem value="18">18</MenuItem>
                    <MenuItem value="19">19</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="21">21</MenuItem>
                    <MenuItem value="22">22</MenuItem>
                    <MenuItem value="23">23</MenuItem>
                    <MenuItem value="24">24</MenuItem>
                    <MenuItem value="25">25</MenuItem>
                    <MenuItem value="26">26</MenuItem>
                    <MenuItem value="27">27</MenuItem>
                    <MenuItem value="28">28</MenuItem>
                    <MenuItem value="29">29</MenuItem>
                    <MenuItem value="30">30</MenuItem>
                    <MenuItem value="31">31</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="mes2">Mes</InputLabel>
                  <Select
                    labelId="mes2"
                    id="mes2"
                    label="Mes"
                    onChange={handleMes2Change}
                    value={mes2}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}

                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="anio2">Año</InputLabel>
                  <Select
                    labelId="anio2"
                    id="anio2"
                    label="Año"
                    onChange={handleAnio2Change}
                    value={anio2}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}

                  >
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2025">2025</MenuItem>
                    <MenuItem value="2026">2026</MenuItem>
                    <MenuItem value="2027">2027</MenuItem>
                    <MenuItem value="2028">2028</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>  

         
          </div> 

          <Divider/>
             <div>
                
             <Typography variant="subtitle1" gutterBottom >
               Género
             </Typography>
            
             <FormGroup>
             {FILTER_GENERO_OPTIONS.map((genero, index) => (
              <label key={index} htmlFor={`genero-${index}`} >


                <Checkbox
                checked={selectedGenres.includes(genero)}
                onChange={(e) => handleGeneroChange(e, genero)}
                
              />
                {genero}
              </label >
            ))}

             </FormGroup>
           </div>




          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"

            variant="contained"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={handleLogin}
          >
            Buscar
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

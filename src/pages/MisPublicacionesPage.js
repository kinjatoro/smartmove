import { Helmet } from 'react-helmet-async';
import { filter, set } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination, Modal, Box, Grid, TextField, Divider, FormControl, InputLabel, Select,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'servicio', label: 'ID', alignRight: false },
  { id: 'duracion', label: 'Nombre', alignRight: false },
  { id: 'frecuencia', label: 'Email', alignRight: false },
  { id: 'costo', label: 'Rol', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  /* -------------------------COOKIES ---------------------------------*/

  const [EVENTOS, setEVENTOS] = useState([]);



  useEffect(() => {
    handleLogin();
  }, []);



  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  const cookieValue = getJwtToken();

  const handleLogin = async () => {

    try {
      const response = await axios.get('http://localhost:4000/api/users/');
      
      // Crea el token
      const aux = response.data;
      setEVENTOS(aux);

    } catch (error) {
      console.error('Error de inicio de sesión', error);
    }

   

  };



  /* -------------------------COOKIES ---------------------------------*/







  EVENTOS.map((item) => {
    return null; // El valor de retorno no es importante en este caso
  });


  const [address2, setAddress2] = useState();
  const [neighbourhood2, setNeighbourhood2] = useState();
  const [city2, setCity2] = useState();
  

  const [open, setOpen] = useState(null);


  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setidEvento(id);

  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = EVENTOS.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EVENTOS.length) : 0;

  const filteredUsers = applySortFilter(EVENTOS, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const [openModal, setOpenModal] = useState(false);

  const [openModal2, setOpenModal2] = useState(false);

  const [openModal3, setOpenModal3] = useState(false);

  const handlePublicarServicio = () => {
    setOpenModal(true);
  };

  const [eventoMod, setEventoMod] = useState('');

  const handleModificarServicio = () => { 
    setOpenModal2(true);
    setOpen(null);
    
    const aux = EVENTOS.find(item => item.id === idEvento);

    const fecha = new Date(aux.datetime);

    const aniox = fecha.getFullYear();   // Obtener el año (ej. 2028)
    const mesx = fecha.getMonth() + 1; // Obtener el mes (0-11, por lo que sumamos 1 para obtener 1-12)
    const diax = fecha.getDate();      // Obtener el día del mes (1-31)
    const horax = fecha.getHours();    // Obtener la hora (0-23)
    const minutosx = fecha.getMinutes(); // Obtener los minutos (0-59)

    if (minutosx === 0){
      setMinutos("00")
    } else {
      setMinutos(String(minutosx))
    }

    setEventoMod(aux);


    setTitle(aux.title);
    setDescription(aux.description);
    setPrice(String(aux.price));

    
    setDia(String(diax))
    setMes(String(mesx))
    setAnio(String(aniox))
    setHora(String(horax))
    
    
    setArtist(aux.artist);

    const lowerCaseText = aux.genre.toLowerCase();
    const capitalizedText = lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1);
    setGenre(capitalizedText);

    setAdress(aux.address);
    setNeighbourhood(aux.neighbourhood);
    setCity(aux.city);
    

  };

  const handleEliminar = () => { 
    setOpenModal3(true);
    setOpen(null);
  };

  /* ------------------------------------------------BACKEND--------------------------------------*/

  const handleEliminarBack = async () => { 

      const config = {
        headers: {
          'Authorization': `Bearer ${cookieValue}`,
        },
      };

      const formData = new FormData();
      formData.append('id', idEvento);
      

      try {
        
        await axios.delete('https://music-lovers-production.up.railway.app/business/event/delete-event/', {
          headers: {
            Authorization: `Bearer ${cookieValue}`
          },
          data: {
            id: idEvento
          }
        });

        window.location.reload();

      } catch (error) {
        alert('Ocurrió un error inesperado. No se puedo eliminar el evento.');
      }
      setOpenModal3(false);

    };

    

  const handleEliminarNoBack = () => { 
    setOpenModal3(false);

  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
    setTitle('');
    setDescription('');
    setPrice('');
    setDia('')
    setMes('')
    setAnio('')
    setHora('')
    setMinutos('')
    setArtist('');
    setGenre('');
    setAdress('');
    setNeighbourhood('');
    setCity('');
    setBanner('');
    setFile('');
  };

  const handleCloseModal3 = () => {
    setOpenModal3(false);
  };


  /* ------------------------------------------------BACKEND-------------------------------------*/

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");


  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [hora, setHora] = useState("");
  const [minutos, setMinutos] = useState("");


  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [address, setAdress] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [city, setCity] = useState("");
  const [banner, setBanner] = useState("");


  const [idEvento, setidEvento] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldFunctions = {
      title: setTitle,
      description: setDescription,
      price: setPrice,
      artist: setArtist,
      address: setAdress,
      neighbourhood: setNeighbourhood,
      city: setCity,
      banner: setBanner,
    };
  
    const updateFunction = fieldFunctions[name];
    if (updateFunction) {
      updateFunction(value);
    }
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value); 
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

  const handleHoraChange = (e) => {
    setHora(e.target.value); 
  };

  const handleMinutosChange = (e) => {
    setMinutos(e.target.value); 
  };
  
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleBackendPublicar = async () => {

    if (!validateFields()) {
      // Si la validación no se cumple, muestra un mensaje de error o toma la acción adecuada
      alert('Por favor, complete los campos obligatorios.');
      return;
    }

    setOpenModal(false);

    const config = {
      headers: {
        'Authorization': `Bearer ${cookieValue}`,
        'Content-Type': 'multipart/form-data', 
      },
    };

    const genreInUppercase = genre.toUpperCase();
    const datetime = `${anio}-${mes}-${dia} ${hora}:${minutos}:00`;
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('datetime', datetime);
    formData.append('artist', artist);
    formData.append('genre', genreInUppercase);
    formData.append('address', address2);
    formData.append('neighbourhood', neighbourhood2);
    formData.append('city', city2);
    formData.append('banner', file); 


    try {
      await axios.post(
        "https://music-lovers-production.up.railway.app/business/event/create/",
        formData,
        config
      );

      window.location.reload();

    } catch (error) {
      console.error("Error de registro", error);
      alert('Ocurrió un error inesperado. No se pudo completar la creación del evento.');
    }

  };

   /* ------------------------------------------------BACKEND-------------------------------------*/


  const handleBackendModificar = async () => {
    setOpenModal2(false);
    
    if (!validateFields2()) {
      alert('Por favor, complete los campos obligatorios.');
      return;
    }
    

    const config = {
      headers: {
        'Authorization': `Bearer ${cookieValue}`,
        'Content-Type': 'multipart/form-data', // Importante para indicar que estás enviando un formulario con datos binarios (archivos)
      },
    };

    const genreInUppercase = genre.toUpperCase();
    const datetime = `${anio}-${mes}-${dia} ${hora}:${minutos}:00`;
    
    const formData = new FormData();
    formData.append('id', idEvento);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('datetime', datetime);
    formData.append('artist', artist);
    formData.append('genre', genreInUppercase);
    formData.append('address', address2);
    formData.append('neighbourhood', neighbourhood2);
    formData.append('city', city2);

    if (file!=null){
       formData.append('banner', file); }


    try {
      await axios.put(
        "https://music-lovers-production.up.railway.app/business/event/modify/",
        formData,
        config
      );

      window.location.reload();

    } catch (error) {
      console.error("Error de registro", error);
      alert('Ocurrió un error inesperado. No se pudo completar la creación del evento.');
    }

  };

  const maxFileNameLength = 40;
  const getFileDisplayName = () => {
    if (file) {
      const fileName = file.name;
      if (fileName.length > maxFileNameLength) {
        return `...${fileName.slice(-maxFileNameLength)}`;
      }
      return fileName;
    }
    return '';
  };

  const validateFields = () => {
    if (
      title.trim() === '' ||
      description.trim() === '' ||
      price.trim() === '' ||
      dia.trim() === '' ||
      mes.trim() === '' ||
      anio.trim() === '' ||
      hora.trim() === '' ||
      minutos.trim() === '' ||
      artist.trim() === '' ||
      genre.trim() === '' ||
      file === null
    ) {
      return false; 
    }
    return true; 
  };

  const validateFields2 = () => {
    if (
      title.trim() === '' ||
      description.trim() === '' ||
      price.trim() === '' ||
      dia.trim() === '' ||
      mes.trim() === '' ||
      anio.trim() === '' ||
      hora.trim() === '' ||
      minutos.trim() === '' ||
      artist.trim() === '' ||
      genre.trim() === ''
    ) {
      return false; 
    }
    return true; 
  };

  
  



  return (
    <>
      <Helmet>
        <title> Lista de | SmartMove </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Lista de usuarios
          </Typography>
          
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={EVENTOS.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {EVENTOS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, nombre, email, rol } = row;
                    const selectedUser = selected.indexOf(title) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <bullet />
                        </TableCell>



                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{nombre}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{rol}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>



                      </TableRow>


                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            No encontrado
                          </Typography>

                          <Typography variant="body2">
                            No se encontraron resultados para &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Prueba escribiendo otra palabra.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={EVENTOS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >

        

        <MenuItem  onClick={handleEliminar}  sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>

      </Popover>




































      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{overflow: 'auto'}}
      >
        <Container maxWidth="sm" sx={{ mt: 2, padding: '20px', maxHeight: '690px', backgroundColor: 'white', borderRadius: 5 }}>

          <Box mt={1} mb={2} backgroundColor='white' align='center'>
            <Typography variant="h4" gutterBottom>

              <strong>Publicar Evento</strong>
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }} backgroundColor='white'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  variant="outlined"
                  label="Título del evento"
                  fullWidth
                  multiline
                  rows={1}
                  value={title}
                  name="title"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>

          <Box mt={2} backgroundColor='white'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Artista"  size="small" fullWidth value={artist} name="artist" onChange={handleChange}/>
              </Grid>
            </Grid>
          </Box>

          <Box mt={2} backgroundColor='white'>

            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                label="Descripción"
                fullWidth
                multiline
                rows={3}
                value={description} name="description" onChange={handleChange}
              />
            </Grid>
          </Box>


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







          <Box mt={2} backgroundColor='white' >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="hora">Hora</InputLabel>
                  <Select
                    labelId="hora"
                    id="hora"
                    label="Hora"
                    onChange={handleHoraChange}
                    value={hora}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                  >

                    <MenuItem value="18">18</MenuItem>
                    <MenuItem value="19">19</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="21">21</MenuItem>
                    <MenuItem value="22">22</MenuItem>
                    <MenuItem value="23">23</MenuItem>
                    <MenuItem value="00">00</MenuItem>
                    <MenuItem value="01">01</MenuItem>
                    <MenuItem value="02">02</MenuItem>
                    <MenuItem value="03">03</MenuItem>
                    <MenuItem value="04">04</MenuItem>
                    <MenuItem value="05">05</MenuItem>
                    <MenuItem value="06">06</MenuItem>
                    <MenuItem value="07">07</MenuItem>
                    <MenuItem value="08">08</MenuItem>
                    <MenuItem value="09">09</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="13">13</MenuItem>
                    <MenuItem value="14">14</MenuItem>
                    <MenuItem value="15">15</MenuItem>
                    <MenuItem value="16">16</MenuItem>
                    <MenuItem value="17">17</MenuItem>


                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="minutos">Minutos</InputLabel>
                  <Select
                    labelId="minutos"
                    id="minutos"
                    label="Minutos"
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                    onChange={handleMinutosChange}
                    value={minutos}
                  >
                    <MenuItem value="00">00</MenuItem>
                    <MenuItem value="15">15</MenuItem>
                    <MenuItem value="30">30</MenuItem>
                    <MenuItem value="45">45</MenuItem>
                  </Select>
                </FormControl>
              </Grid>


            </Grid>
          </Box>







          <Box mt={2} backgroundColor='white'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Costo (USD)" type="number" size="small" fullWidth value={price} name="price" onChange={handleChange} />
              </Grid>
            </Grid>
          </Box>





          <Box mt={2} backgroundColor='white'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="genre">Género  </InputLabel>
                  <Select
                    labelId="genre"
                    id="genre"
                    label="Género"
                    value={genre}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                    onChange={handleGenreChange}

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



          <Box my={2} align="center" backgroundColor='white'sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <label htmlFor="fileInput" >
              <input
              type="file"
              accept="image/*" // Puedes especificar el tipo de archivo que esperas aquí
              style={{ display: 'none' }}
              onChange={handleFileChange}
              id="fileInput"
            />
            
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Iconify icon="eva:cloud-upload-outline" />}
                component="span"
                
              >
                Subir foto
              </Button>
            </label>
            {file && (
              <>
          <p style={{ padding: 0, margin: 0 }}> {getFileDisplayName()}</p>
          </>
       
      )}


          </Box>
          <Box my={2}>
            <Divider />
          </Box>
          <Box backgroundColor='white'>
            <Grid align="center">
              <Button variant="contained" 
              
                color="primary"
                startIcon={<Iconify icon="ic:baseline-plus" />}
                onClick={handleBackendPublicar}
              
              >
                Publicar
              </Button>
            </Grid>
          </Box>
        </Container>
      </Modal>





























































      <Modal
        open={openModal2}
        onClose={handleCloseModal2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{overflow: 'auto'}}
      >

      
        <Container maxWidth="sm" sx={{ mt: 4, padding: '20px', maxHeight: '675px', backgroundColor: 'white', borderRadius: 5 }}>

          <Box mt={1} mb={2} backgroundColor='white' align='center'>
            <Typography variant="h4" gutterBottom>

              <strong>Modificar Evento</strong>
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }} backgroundColor='white'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  variant="outlined"
                  label="Título del evento"
                  fullWidth
                  multiline
                  rows={1}
                  value={title}
                  name="title"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>

          <Box mt={2} backgroundColor='white'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Artista"  size="small" fullWidth value={artist} name="artist" onChange={handleChange}/>
              </Grid>
            </Grid>
          </Box>

          <Box mt={2} backgroundColor='white'>

            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                label="Descripción"
                fullWidth
                multiline
                rows={3}
                value={description} name="description" onChange={handleChange}
              />
            </Grid>
          </Box>


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







          <Box mt={2} backgroundColor='white' >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="hora">Hora</InputLabel>
                  <Select
                    labelId="hora"
                    id="hora"
                    label="Hora"
                    onChange={handleHoraChange}
                    value={hora}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                  >

                    <MenuItem value="18">18</MenuItem>
                    <MenuItem value="19">19</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="21">21</MenuItem>
                    <MenuItem value="22">22</MenuItem>
                    <MenuItem value="23">23</MenuItem>
                    <MenuItem value="00">00</MenuItem>
                    <MenuItem value="01">01</MenuItem>
                    <MenuItem value="02">02</MenuItem>
                    <MenuItem value="03">03</MenuItem>
                    <MenuItem value="04">04</MenuItem>
                    <MenuItem value="05">05</MenuItem>
                    <MenuItem value="06">06</MenuItem>
                    <MenuItem value="07">07</MenuItem>
                    <MenuItem value="08">08</MenuItem>
                    <MenuItem value="09">09</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="13">13</MenuItem>
                    <MenuItem value="14">14</MenuItem>
                    <MenuItem value="15">15</MenuItem>
                    <MenuItem value="16">16</MenuItem>
                    <MenuItem value="17">17</MenuItem>


                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="minutos">Minutos</InputLabel>
                  <Select
                    labelId="minutos"
                    id="minutos"
                    label="Minutos"
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                    onChange={handleMinutosChange}
                    value={minutos}
                  >
                    <MenuItem value="00">00</MenuItem>
                    <MenuItem value="15">15</MenuItem>
                    <MenuItem value="30">30</MenuItem>
                    <MenuItem value="45">45</MenuItem>
                  </Select>
                </FormControl>
              </Grid>


            </Grid>
          </Box>







          <Box mt={2} backgroundColor='white'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Costo (USD)" type="number" size="small" fullWidth value={price} name="price" onChange={handleChange} />
              </Grid>
            </Grid>
          </Box>



              

          <Box mt={2} backgroundColor='white'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="genre">Género  </InputLabel>
                  <Select
                    labelId="genre"
                    id="genre"
                    label="Género"
                    value={genre}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                    onChange={handleGenreChange}

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



          <Box my={2} align="center" backgroundColor='white'sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <label htmlFor="fileInput" >
              <input
              type="file"
              accept="image/*" // Puedes especificar el tipo de archivo que esperas aquí
              style={{ display: 'none' }}
              onChange={handleFileChange}
              id="fileInput"
            />
            
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Iconify icon="eva:cloud-upload-outline" />}
                component="span"
                
              >
                Subir foto
              </Button>
            </label>
            {file && (
              <>
          <p style={{ padding: 0, margin: 0 }}> {getFileDisplayName()}</p>
          </>
       
      )}


          </Box>
          <Box my={2}>
            <Divider />
          </Box>
          <Box backgroundColor='white'>
            <Grid align="center">
              <Button variant="contained" 
              
                color="primary"
                startIcon={<Iconify icon="ic:baseline-plus" />}
                onClick={handleBackendModificar}
              
              >
                Guardar cambios
              </Button>
            </Grid>
          </Box>
        </Container>
      </Modal>












































































      <Modal
        open={openModal3}
        onClose={handleCloseModal3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm" sx={{ mt:25, padding: '20px', maxHeight: '675px', backgroundColor: 'white', borderRadius: 5 }}>

          <Box mt={1} mb={2} backgroundColor='white' align='center'>
            <Typography variant="h4" gutterBottom>

            <strong>¿Estás seguro que deseas eliminar al usuario?</strong>
            </Typography>
          </Box>

          <Box backgroundColor='white'>
            <Grid align="center">
              <Button variant="contained" size="large" color="primary" onClick={handleEliminarBack}>Eliminar</Button>
              <Button sx= {{ml: 3}} variant="outlined" size="large" color="primary" onClick={handleEliminarNoBack}>Volver atrás</Button>
            </Grid>
          </Box>
        </Container>
      </Modal>




















    </>

  );
}

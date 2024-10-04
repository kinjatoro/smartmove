import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,Box,
  TableRow,Modal,Grid,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
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
  { id: 'name', label: 'Usuario', alignRight: false },

  { id: 'comentario', label: 'Comentario', alignRight: false },

  { id: 'servicio', label: 'Publicación', alignRight: false },

  { id: 'estadoComentario', label: 'Fecha creación', alignRight: false },
  { id: '' },
];

const TABLE_HEAD2 = [
  { id: 'name', label: 'Usuario', alignRight: false },
  { id: 'servicio', label: 'Comentario', alignRight: false },

  { id: 'comentario', label: 'Calificación', alignRight: false },

  { id: 'estadoComentario', label: 'Fecha creación', alignRight: false },
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
    return filter(array, (_user) => _user.servicio.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  
  const [open, setOpen] = useState(null);

  const [esEvento, setEsEvento] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [idEvento, setidEvento] = useState("");

  /* ----------------------------------------------------COOKIES-----------------------------------------*/

  const [EVENTOS, setEVENTOS] = useState([]);
  const [NEGOCIO, setNEGOCIO] = useState([]);



  useEffect(() => {
    handleLogin();
  }, []);



  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  const cookieValue = getJwtToken();

  const handleEliminarBack = async () => { 

  

      const config = {
        headers: {
          'Authorization': `Bearer ${cookieValue}`,
        },
      };

      try {
        if(esEvento){
          await axios.delete(`https://music-lovers-production.up.railway.app/business/event/comments/delete/?id=${idEvento}`, config);
        } else {
          await axios.delete(`https://music-lovers-production.up.railway.app/business/comments/delete/?id=${idEvento}`, config);
        }
        

        window.location.reload();

      } catch (error) {
        alert('Ocurrió un error inesperado. No se puedo eliminar el comentario.');
      }
      setOpenModal3(false);

    };


  const handleLogin = async () => {

    const config = {
      headers: {
        'Authorization': `Bearer ${cookieValue}`,
      },
    };


    try {
      const response = await axios.get('https://music-lovers-production.up.railway.app/business/comments/', config);
      
      // Crea el token
      const aux = response.data;
      setNEGOCIO(aux.business_comments);
      setEVENTOS(aux.event_comments);


    } catch (error) {
      console.error('Error de carga de comentarios', error);
    }

  };


  /*--------------------------------------------------------------------------------------------*/

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setidEvento(id);
    setEsEvento(true);
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

  const baseURL = "https://music-lovers-production.up.railway.app";



  /* ---------------------------------------------------------------- COPIA --------------------------------------------------------------------------*/


  const [open2, setOpen2] = useState(null);

  const [page2, setPage2] = useState(0);

  const [order2, setOrder2] = useState('asc');

  const [selected2, setSelected2] = useState([]);

  const [orderBy2, setOrderBy2] = useState('name');

  const [filterName2, setFilterName2] = useState('');

  const [rowsPerPage2, setRowsPerPage2] = useState(5);


  const [openModal3, setOpenModal3] = useState(false);

  const handleOpenMenu2 = (event, id) => {
    setOpen2(event.currentTarget);
    setidEvento(id);
    setEsEvento(false);
  };

  const handleCloseMenu2 = () => {
    setOpen2(null);
  };

  const handleRequestSort2 = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder2(isAsc ? 'desc' : 'asc');
    setOrderBy2(property);
  };

  const handleSelectAllClick2 = (event) => {
    if (event.target.checked) {
      const newSelecteds = NEGOCIO.map((n) => n.name);
      setSelected2(newSelecteds);
      return;
    }
    setSelected2([]);
  };

  const handleClick2 = (event, name) => {
    const selectedIndex = selected2.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected2, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected2.slice(1));
    } else if (selectedIndex === selected2.length - 1) {
      newSelected = newSelected.concat(selected2.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected2.slice(0, selectedIndex), selected2.slice(selectedIndex + 1));
    }
    setSelected2(newSelected);
  };

  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };

  const handleChangeRowsPerPage2 = (event) => {
    setPage2(0);
    setRowsPerPage2(parseInt(event.target.value, 10));
  };

  const handleFilterByName2 = (event) => {
    setPage2(0);
    setFilterName2(event.target.value);
  };

  const handleEliminar = () => { 
    setOpenModal3(true);
    setOpen(null);
    setOpen2(null);
  };

  const handleEliminarNoBack = () => { 
    setOpenModal3(false);
  };

  const handleCloseModal3 = () => {
    setOpenModal3(false);
  };

  const emptyRows2 = page2 > 0 ? Math.max(0, (1 + page2) * rowsPerPage2 - NEGOCIO.length) : 0;

  const filteredUsers2 = applySortFilter(NEGOCIO, getComparator(order2, orderBy2), filterName2);

  const isNotFound2 = !filteredUsers2.length && !!filterName2;







  return (
    <>
      <Helmet>
        <title> Comentarios | SmartMove </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Comentarios de mis eventos
          </Typography>

        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    /* eslint-disable camelcase */
                    const { id, event, user_name, user,user_logo, text,rating,event_name,created_at } = row;
                    const selectedUser = selected.indexOf(user) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell padding="checkbox"/>
                          
                    

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={'avatar'} src={baseURL+user_logo} />
                            <Typography variant="subtitle2" noWrap>
                              {user_name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{text}</TableCell>
                        <TableCell align="left">{event_name}</TableCell>
                        
                        


                        <TableCell align="left">
                          <Label>{created_at.slice(0, 10)}</Label>
                        </TableCell>

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



      <Box sx={{m: 5}} />
                          


      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Comentarios de mi bar
          </Typography>

        </Stack>

        <Card>
          <UserListToolbar numSelected={selected2.length} filterName={filterName2} onFilterName={handleFilterByName2} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order2}
                  orderBy={orderBy2}
                  headLabel={TABLE_HEAD2}
                  rowCount={NEGOCIO.length}
                  numSelected={selected2.length}
                  onRequestSort={handleRequestSort2}
                  onSelectAllClick={handleSelectAllClick2}
                />
                <TableBody>
                  {filteredUsers2.slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2).map((row) => {
                    /* eslint-disable camelcase */
                    const { id, business, user, user_name,user_logo, text,rating,created_at } = row;
                    const selectedUser2 = selected2.indexOf(user) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell padding="checkbox"/>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={user} src={baseURL+user_logo} />
                            <Typography variant="subtitle2" noWrap>
                              {user_name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{text}</TableCell>
                        
                        <TableCell align="left">
                          <Label color={ (rating === 1 && 'error') || (rating === 2 && 'error') || (rating === 3 && 'warning') || 'success'}>
                          {rating}
                          </Label>
                          </TableCell>


                        <TableCell align="left">
                          <Label >{created_at.slice(0, 10)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu2(event, id)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows2 > 0 && (
                    <TableRow style={{ height: 53 * emptyRows2 }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound2 && (
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
                            <strong>&quot;{filterName2}&quot;</strong>.
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
            count={NEGOCIO.length}
            rowsPerPage={rowsPerPage2}
            page={page2}
            onPageChange={handleChangePage2}
            onRowsPerPageChange={handleChangeRowsPerPage2}
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
        <MenuItem onClick={handleEliminar} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>


















      <Popover
        open={Boolean(open2)}
        anchorEl={open2}
        onClose={handleCloseMenu2}
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
       <MenuItem onClick={handleEliminar} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>



























      <Modal
        open={openModal3}
        onClose={handleCloseModal3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm" sx={{ mt:25, padding: '20px', maxHeight: '675px', backgroundColor: 'white', borderRadius: 5 }}>

          <Box mt={1} mb={2} backgroundColor='white' align='center'>
            <Typography variant="h4" gutterBottom>

            <strong>¿Estás seguro que deseas eliminar el comentario?</strong>
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

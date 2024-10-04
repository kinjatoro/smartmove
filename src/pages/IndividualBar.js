import { faker } from '@faker-js/faker';
import { useState,useEffect } from 'react';
import { sample } from 'lodash';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Box,Divider } from '@mui/material';
import axios from 'axios';
import { ProductSort} from '../sections/@dashboard/products';

// components
import Iconify from '../components/iconify';

import {BarPostCardInd,BlogPostCard} from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/bar';
import BLOGS from '../_mock/blog';
import COMENTARIOS from '../_mock/comentarios';

import {AppNewsUpdateBar} from '../sections/@dashboard/app';



// ----------------------------------------------------------------------

export default function BarPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const { idBar } = useParams();
  const index = parseInt(idBar, 10); 

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [BB, setBB] = useState(null);
  const [comentarios, setComentarios] = useState(null);

  useEffect(() => {

    handleLogin();
  }, []);

  const handleLogin = async () => {

    try {
      const response = await axios.get(`https://music-lovers-production.up.railway.app/business/get/?id=${index}`);
      const aux = response.data;

      setBB(aux.business);
      setComentarios(aux.comments);



    } catch (error) {
      console.error('Ocurrió un error al intentar cargar los eventos', error);
    }

  };
  
  if (!BB) {
    return <div/>;
  }

  return (
    
  
    <>
      <Helmet>
        <title> {BB.name} </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={-4}>
          <Typography variant="h3" gutterBottom>
          {BB.name}
          </Typography>
          
        </Stack>

        <Grid container spacing={3}>
        
            <BarPostCardInd key={BB.id} post={BB} index={index} />
            
        </Grid>
        <Grid item xs={12} md={6} lg={8} >
            <AppNewsUpdateBar
              sx={{borderRadius: "0px"}}
              title="Agregar un comentario sobre el bar"
              list={comentarios}
            />
          </Grid>
          <Divider/>


      </Container>


    </>
  );
}

import { faker } from '@faker-js/faker';
import { useState,useEffect } from 'react';
import { sample } from 'lodash';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Box } from '@mui/material';

import axios from 'axios';

import { ProductSort} from '../sections/@dashboard/products';

// components
import Iconify from '../components/iconify';

import {BlogPostCardInd} from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import COMENTARIOS from '../_mock/comentarios';

import {AppNewsUpdate} from '../sections/@dashboard/app';



// ----------------------------------------------------------------------

export default function BlogPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const { idBlog } = useParams();
  const index = parseInt(idBlog, 10); 

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };


  const [GG, setGG] = useState(null);
  const [BB, setBB] = useState(null);
  const [comentarios, setComentarios] = useState(null);


  useEffect(() => {

    handleLogin();
  }, []);

  const handleLogin = async () => {

    try {
      const response = await axios.get(`https://music-lovers-production.up.railway.app/business/events/get/?id=${index}`);

      const aux = response.data;
      
      setGG(aux.event);
      setBB(aux.business);
      setComentarios(aux.comments);

    } catch (error) {
      console.error('Ocurrió un error al intentar cargar los eventos', error);
    }
  };
  if (!GG) {
    return <div/>;
  }


  
  return (

  
    <>
      <Helmet>
        <title> {GG.title} </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={-4}>
          <Typography variant="h3" gutterBottom>
          {GG.title}
          </Typography>
          
        </Stack>

        <Grid container spacing={3}>
        
            <BlogPostCardInd key={GG.id} post={GG} index={index} bs={BB} />
            
        </Grid>
        <Grid item xs={12} md={6} lg={8} >
            <AppNewsUpdate
              sx={{borderRadius: "0px"}}
              title="Agregar comentario"
              list={comentarios}
            />
          </Grid>
      </Container>


    </>
  );
}

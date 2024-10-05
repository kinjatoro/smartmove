import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent,Button,Stack,Chip } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import foto from '../../../logo.svg'

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: 'none',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'start',
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index }) {
  /* eslint-disable camelcase */
  const { cover, business, address, city, neighbourhood, title,description, price, datetime, artist,genre_display,banner,business_logo } = post;
  const latestPostLarge = index === 500;
  const latestPost = index === 501 || index === 502;
  
  const baseUrl = cover;
  const fullImageUrl = cover;
  const fullImageUrl2 = cover;




  function formatoConCero(numero) {
    // Agrega un cero inicial si el número es menor que 10
    return numero < 10 ? `0${numero}` : numero;
  }

  

// Crear un objeto Date a partir de la fecha ISO
const fecha = "";

const dia = "";
const mes = ""; // Suma 1 porque en JavaScript los meses van de 0 a 11
const anio =  "";
const hora = "";
const minutos = "";

// Formatear la fecha en el formato deseado
const fechaFormateada = `${dia}/${mes}-${anio}-${hora}:${minutos}`;



  const POST_INFO = [
   
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    if (title === 'CEO'){
      navigate('/ceodashb')} 
    else {
      navigate(`/${title}`);
    }

    
  };

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          
          

          <StyledCover alt={title} src={fullImageUrl} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          
          <Typography  gutterBottom variant="h6" sx={{ color: 'black', mt: -1 }} align="center">
            {title}            
           </Typography>
          


          
          
          <Stack sx={{alignContent: "center"}}> 
          <Button onClick={handleClick} variant="outlined">Abrir dashboard</Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}

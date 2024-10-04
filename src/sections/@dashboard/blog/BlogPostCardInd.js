import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Button, Grid, Avatar, Typography, CardContent,Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(64% * 3 / 4)',

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
  width: 64,
  height: 64,
  position: 'absolute',
  right: theme.spacing(7.25),
  bottom: theme.spacing(-3.5),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: "center",
  marginTop: theme.spacing(3),
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

BlogPostCardInd.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCardInd({ post, index, bs }) {
  /* eslint-disable camelcase */
  const { business, address, city, neighbourhood, title,description, price, datetime, artist,genre_display,banner } = post;
  const { name, logo } = bs;
  const latestPostLarge = index === 500;
  const latestPost = index === 501 || index === 502;
  
  const baseUrl = "https://music-lovers-production.up.railway.app";
  const fullImageUrl = baseUrl + banner;
  const fullImageUrl2 = baseUrl + logo;

  const isMdScreenOrLarger = useMediaQuery((theme) => theme.breakpoints.up('md'));

  function formatoConCero(numero) {
    // Agrega un cero inicial si el número es menor que 10
    return numero < 10 ? `0${numero}` : numero;
  }
  
    // Crear un objeto Date a partir de la fecha ISO
    const fecha = new Date(datetime);

    const dia = formatoConCero(fecha.getDate());
    const mes = formatoConCero(fecha.getMonth() + 1); // Suma 1 porque en JavaScript los meses van de 0 a 11
    const anio = fecha.getFullYear();
    const hora = formatoConCero(fecha.getHours());
    const minutos = formatoConCero(fecha.getMinutes());

    // Formatear la fecha en el formato deseado
    const fechaFormateada = `${dia}/${mes}-${anio}-${hora}:${minutos}`;


    let formattedAddress = address;
    if (neighbourhood) {
      formattedAddress += `, ${neighbourhood}`;
    }
    formattedAddress += `, ${city}.`;


    const POST_INFO = [
      { string: fechaFormateada.slice(0, 5), icon: 'solar:calendar-bold-duotone' },
      { string: fechaFormateada.slice(11, 16), icon: 'mdi:clock' },
      { string: genre_display, icon: "eva:music-fill" },
      { string: isMdScreenOrLarger ? formattedAddress : null, icon: 'line-md:map-marker-filled' },

    ];

    const navigate = useNavigate();

    const handleClick = () => {
      window.open(`/bares/${business}`, '_blank');
    };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card sx={{ position: 'relative', borderRadius: "0px"}}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(10% * 4 / 3)',
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
                xs: 'calc(10% * 4 / 3)',
                sm: 'calc(10% * 3 / 4.66)',
              },
            }),
          }}
        >
          <div style={{display: "flex", justifyContent: "flex-end"}}>
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              
              width: 180,
              height: 72,
              zIndex: 9,
              bottom: -30,
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          /> </div>
          <StyledAvatar
            alt={business}
            src={fullImageUrl2}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />
         <StyledCover  alt={title} src={fullImageUrl} />
          
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


          <StyledTitle
            color="inherit"
            variant="h6"
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}
          > 
         
          <Box sx={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
              <Link onClick={handleClick} underline='hover' sx={{ color: 'text.primary',cursor: 'pointer' }}>
              {name} </Link>
              
              </Box>
          </StyledTitle>
          
          <Typography sx={{textAlign: "justify", mt:-1}}>{bs.description}</Typography>
          <Box sx={{borderTop: '1px solid #f0f0f0', mt:2}}> </Box>
          
          <Typography sx={{textAlign: "justify", mt:2}}>{description}</Typography>
            
          <StyledInfo>
            <div style={{display: 'flex', flexContent:"row", alignItems: 'center'}}>
          <Typography variant="h5" align="center" sx={{mr:1, color: "black"}}>{`$${price}`}</Typography>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                
                  alignItems: 'center',
                  ml: 1.5,
                  pt: 0.5,
                  display: info.string || info.string === 0 ? 'flex' : 'none',
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 24, height: 24, mr: 0.5, mt:-1 }} />
                <Typography variant="body2" sx={{mt:-0.7}}>
                  {(info.string)}
                  </Typography>
                
                
              </Box>
            ))}
            </div>
            
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}

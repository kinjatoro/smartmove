import PropTypes from 'prop-types';
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

BarPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BarPostCard({ post, index }) {
  /* eslint-disable camelcase */
  const { id, name, address, city, neighbourhood,phone, logo, banner, description, average_rating} = post;
  const latestPostLarge = index === 500;
  const latestPost = index === 501 || index === 502;

  const baseUrl = "https://music-lovers-production.up.railway.app";
  const fullImageUrlLogo = baseUrl + logo;
  const fullImageUrlBanner = baseUrl + banner;


  const POST_INFO = [
    { string: address, icon: 'line-md:map-marker-filled' },

    
    
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/bares/${post.id}`);
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
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          />
          <StyledAvatar
            alt={name}
            src={fullImageUrlLogo}
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

          <StyledCover alt={name} src={fullImageUrlBanner} />
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
          
          <Typography  gutterBottom variant="h6" sx={{ color: 'black', mt: -1 }}>
            {name}            
           </Typography>
          

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            
            sx={{
              
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}> 

            
              <Typography>
               {neighbourhood} 
               </Typography>
            
          </StyledTitle>
          
          <StyledInfo>
           
            {POST_INFO.map((info, index) => (
              
              <Box
                
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500',
                  }),
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 18, mr: 0.5, mt:-1 }} />
                <Typography variant="body2" sx={{mt:-1}}>
                  {(info.string)}
                  </Typography>
                
              </Box>
            ))}
            
          </StyledInfo>
          <Stack sx={{alignItems: "center",  display: 'flex', flexDirection: "row", justifyContent:"space-between", mt: 2 }}> 
          
          <Stack sx={{color: 'grey.500'}} alignItems="center">
          <Typography sx={{alignItems: "center",display: 'flex'}}><Iconify sx={{mt:-0.35, mr:0.5}}  icon="solar:star-bold" />

          {  ( average_rating === 0.0 ? (<> 0.0 </>) : (<> {average_rating.toFixed(1)}</>)) }
          
          
          </Typography>
          </Stack>
          
          <Button onClick={handleClick} variant="outlined">Ver más</Button>
          </Stack>
        </CardContent>  
      </Card>
    </Grid>
  );
}

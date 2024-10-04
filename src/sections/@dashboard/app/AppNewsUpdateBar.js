import {useState} from 'react';
// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader, TextField, MenuItem,Select,FormControl,InputLabel  } from '@mui/material';
// utils
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useAuth } from '../../../Auth'
import { useMyBar } from '../../../TengoBarAuth';
import { useOnBoarding } from '../../../OnBoarding';

// ----------------------------------------------------------------------

AppNewsUpdateBar.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdateBar({ title, subheader, list, ...other }) {
  
  const [state, setState ] = useState(true);

  const { auth, setAuth } = useAuth();
  const { myBar, setMyBar } = useMyBar();  
  const { onBoar, setOnBoar} = useOnBoarding();

  const [text, setText] = useState('');
  const [rating, setRating] = useState('');

  const { idBar } = useParams();
  const index = parseInt(idBar, 10); 

  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }
  const jwtToken = getJwtToken();

  const handleRatingChange = (e) => {
    setRating(e.target.value); 
  };

  const handleClick = async () => {

    if (text.trim() === '') {
      alert('No se puede publicar un comentario vacío');
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data', 
      },
    };


    const formData = new FormData();
    formData.append('business', index);
    formData.append('text', text);
    formData.append('rating', rating);

    try {
      await axios.post(
        "https://music-lovers-production.up.railway.app/client/business/add-comment/",
        formData,
        config
      );

      window.location.reload();

    } catch (error) {
      
      alert("No se pudo realizar el comentario.")
    }
    
    
  }

  return (
  <>










  
    


      <Card {...other}>

      {auth && !myBar ? (

        
      
          <>
           <CardHeader title={title} subheader={subheader} />
      <Stack spacing={2} sx={{ pt: 3, px: 3 }}>
     
      <TextField name="comentario" label="Agregar un comentario" multiline rows={3} value={text} onChange={(e) => setText(e.target.value)}/>

      <FormControl fullWidth>
        <InputLabel id="calificacion">Calificación</InputLabel>
        <Select
          labelId="calificacion"
          id="calificacion"
          label="calificacion"
          onChange={handleRatingChange}
          value={rating}
        >
         <MenuItem value="1"><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/></MenuItem>
         <MenuItem value="2"><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/></MenuItem>
         <MenuItem value="3"><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/></MenuItem>
         <MenuItem value="4"><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/></MenuItem>
         <MenuItem value="5"><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#1976d2'}} icon={'solar:star-bold'}/></MenuItem>
        </Select>
      </FormControl>

      <div style={{textAlign: "right"}}>
      <Button variant="outlined" onClick={handleClick}>Agregar comentario</Button></div>
      </Stack>
          </>
   
        



    ) : (
      <></>
    )}




        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, pr: 0, pt: 2 }}>
            <Typography variant="h6">Comentarios</Typography>
            {  ( list.length === 0 ? (<div> No hay comentarios. </div>) : (<> {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}</>)) }
          </Stack>
        </Scrollbar>
      </Card>




















  </>
);
    }

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  /* eslint-disable camelcase */
  const { id, event, user, user_name,user_logo,text,rating } = news;
  const baseUrl = "https://music-lovers-production.up.railway.app";
  const fullImageUrl = baseUrl + user_logo;

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{borderTop: '1px solid #f0f0f0', }}>
      <Box component="img" alt={user_name} src={fullImageUrl} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {user_name}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "justify", pr:2 }}>
          {text}
        </Typography>
      </Box>

      



      <Stack sx={{color: 'grey.500', pr:3}} alignItems="center">
          <Typography sx={{alignItems: "center",display: 'flex'}}><Iconify sx={{mt:-0.35, mr:0.5}}  icon="solar:star-bold" />

          {rating}
          
          </Typography>
          </Stack>
      
      

    </Stack>
  );
}

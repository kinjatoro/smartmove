import {useState} from 'react';
// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader, TextField, MenuItem,Select,FormControl,InputLabel  } from '@mui/material';
// utils
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useAuth } from '../../../Auth'
import { useMyBar } from '../../../TengoBarAuth';
import { useOnBoarding } from '../../../OnBoarding';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ title, subheader, list, ...other }) {

  const { auth, setAuth } = useAuth();
  const { myBar, setMyBar } = useMyBar();  
  const { onBoar, setOnBoar} = useOnBoarding();
  
  const [state, setState ] = useState(true);
  const [text, setText] = useState('');

  const { idBlog } = useParams();
  const index = parseInt(idBlog, 10); 


  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }
  const jwtToken = getJwtToken();



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
    formData.append('event', index);
    formData.append('text', text);

    try {
      await axios.post(
        "https://music-lovers-production.up.railway.app/client/event/add-comment/",
        formData,
        config
      );

      window.location.reload();

    } catch (error) {
      
      alert("Por favor, verifica los datos ingresados")
    }
    
    
  }
  

  return (
    <Card {...other}>
      {auth && !myBar ? (

        
      
<>
        
      <CardHeader title={title} subheader={subheader} />
      <Stack spacing={2} sx={{ pt: 3, px: 3 }}>
      <TextField name="comentario" label="Agregá un comentario..." multiline rows={3} value={text}
           onChange={(e) => setText(e.target.value)}/>

      <div style={{textAlign: "right"}}>
      <Button variant="outlined" onClick={handleClick}>Publicar</Button></div>
      </Stack>

      </>
   
        



    ) : (
      <></>
    )}

    
      
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0, pt:2 }}>
        <Typography variant="h6">Comentarios</Typography>




        {  ( list.length === 0 ? (<div> No hay comentarios. </div>) : (<> {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}</>)) }


          





        </Stack>
      </Scrollbar>

    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    id: PropTypes.number,
    event: PropTypes.number,
    user: PropTypes.number,
    user_name: PropTypes.string,
    user_logo: PropTypes.string,
    text: PropTypes.string,
    rating: PropTypes.number,
  }),
};

function NewsItem({ news }) {
  /* eslint-disable camelcase */
  const { id, event, user, user_name,user_logo,text,rating } = news;
  const baseUrl = "https://music-lovers-production.up.railway.app";
  const fullImageUrl = baseUrl + user_logo;
  console.log(user_logo)


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

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {rating}
      </Typography>
    </Stack>
  );
}

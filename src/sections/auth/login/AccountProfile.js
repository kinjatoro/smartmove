import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';

  import { useMyBar } from '../../../TengoBarAuth';
  
  const user = {
    avatar: '/assets/images/avatars/ID_20827.jpg',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
  };
  
  export default function AccountProfile ()  {
    const { myBar, setMyBar } = useMyBar();  
    return (
      <>
    <Card sx={{mb:4,mr:3, ml:6}}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {!myBar ? (
                <><Avatar
                src={user.avatar}
                sx={{
                  height: 80,
                  mb: 2,
                  width: 80
                }}
              /></>
                ) : (
              <><Avatar
              src={'/assets/images/avatars/polvorines.jpg'}
              sx={{
                height: 80,
                mb: 2,
                width: 80
              }}
            /></>
             )}
          
          <Typography
            gutterBottom
            variant="h5"
          >
          {!myBar ? (
                <>Christopher Waltz</>
                ) : (
              <>Los Polvorines</>
             )}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.city} {user.country}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
          color='secondary'
        >
          subir foto
        </Button>
      </CardActions>
    </Card></>
    );
  };
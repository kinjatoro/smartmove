import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography,Box,AppBar,Toolbar } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Billetera Virtual | SmartMove </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2, mt:-3 }}>
          Billetera virtual
        </Typography>
        <Grid sx={{mb:-5}}>

          
        <Grid container spacing={3}>
     
          <Grid item xs={12} sm={12} md={6}>
            <AppWidgetSummary title="Tu saldo" total={1352831} color='orange' icon={'material-symbols:attach-money-rounded'}/>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <AppOrderTimeline
              title="Tus movimientos"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '+$10.302 | Javier Nuñez',
                  '-$46.304 | Esteban Suarez',
                  '-$28.153 | Joaquín Hernandez',
                  '+$53.252 | Sebastián Ferreira',
                  '+$893.934 | Maxi Arrizabalaga',

                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
          
        </Grid> 
        
        
        </Grid >

        <AppBar position="fixed" sx={{top: 'auto',bottom: 0, width: '100%', p: 1.5}}  >
                  
                    <Typography variant="body1">
                      © {new Date().getFullYear()} SmartMove.
                    </Typography>
                 
                </AppBar>
      </Container>
    </>
  );
}

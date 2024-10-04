import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
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
        <title> Dashboard | SmartMove </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bienvenido, administrador.
        </Typography>

        <Grid container spacing={3}>
          

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Visitas a la página web"
              subheader="(+43%) respecto al año anterior"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Grupo A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Grupo B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Grupo C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Visitas actuales"
              chartData={[
                { label: 'América', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europa', value: 1443 },
                { label: 'África', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Cantidad de visitas (en miles) por provincia"
              subheader="(+43%) respecto al año anterior"
              chartData={[
                { label: 'Buenos Aires', value: 1380 },
                { label: 'Córdoba', value: 1200 },
                { label: 'Santa Fe', value: 1100 },
                { label: 'Mendoza', value: 690 },
                { label: 'San Juan', value: 580 },
                { label: 'Corrientes', value: 540 },
                { label: 'Tierra del Fuego', value: 470 },
                { label: 'Catamarca', value: 448 },
                { label: 'Salta', value: 430 },
                { label: 'Jujuy', value: 400 },
                
                
              
                
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Gastos por provincia"
              chartLabels={['Servicios', 'Alimentos', 'Ropa', 'Otros', 'Impuestos', 'Electrónicos']}
              chartData={[
                { name: 'Buenos Aires', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Córdoba', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Santa Fe', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          
          

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Cantidad de visitas de nuestros perfiles en agosto"
              list={[
                {
                  name: 'Facebook',
                  value: 323000,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341000,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411000,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443000,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tareas"
              list={[
                { id: '1', label: 'Aprobación de préstamos' },
                { id: '2', label: 'Recibir camión blindado' },
                { id: '3', label: 'Reunión con el CEO' },
                { id: '4', label: 'Realizar reporte semanal' },
                { id: '5', label: 'Gestión de morosos' },
                { id: '6', label: 'Entrevista con pasante' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

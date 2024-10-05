import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import {tokenPbi} from '../tokenPbi';



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

      <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <Typography variant="h4" sx={{ mb: 5 }}>
        Dashboards - Área inquilinos
        </Typography>

        <Grid container spacing={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <PowerBIEmbed
          embedConfig={{
            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
            id: '7a7ba1f1-fcac-4b40-8793-2605844014e7',
            embedUrl: "https://app.powerbi.com/reportEmbed?reportId=7a7ba1f1-fcac-4b40-8793-2605844014e7&groupId=bd9cea22-9ffa-493d-bbd4-b71b552943ec&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
            accessToken: tokenPbi, 
            tokenType: models.TokenType.Aad,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: true
                }
              },
            }
          }}

          eventHandlers={
            new Map([
              ['loaded', function () { console.log('Report loaded'); window.postMessage("Report loaded")}],
              ['rendered', function () { console.log('Report rendered'); window.postMessage("Report rendered")}],
              ['error', function (event) { console.log(event.detail); window.postMessage("Report error")}]
            ])
          }

          cssClassName={"Embed-container"}

          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />

        </Grid>
      </Container>
    </>
  );
}

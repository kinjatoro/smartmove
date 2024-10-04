import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { OnBoardingBarForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function OnBoardingPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Registro Bar | SmartMove </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'absolute',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" gutterBottom >
            Registrá tu bar. 
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
                Hacenos saber más sobre tu local para poder llegar a más personas.
            </Typography>
            <OnBoardingBarForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

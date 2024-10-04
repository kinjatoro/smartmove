// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
 

  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(14),
  height: theme.spacing(14),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, color , sx, ...other }) {
  return (
    <Card
      sx={{
        py: 20.3,
        boxShadow: 1,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
        display: 'flex',
        justifyContent: 'center',
        
       
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.4
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={65} height={65} />
      </StyledIcon>

      <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

      <Typography variant="h1">{fShortenNumber(total)}</Typography>

      <Typography variant="h3" sx={{ opacity: 0.72 }}>
        {title}
      </Typography></div>
    </Card>
  );
}

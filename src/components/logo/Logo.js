import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
import MyLogo from './logo.png';
import { useAuth } from '../../Auth'
import { useMyBar } from '../../TengoBarAuth';
import { useOnBoarding } from '../../OnBoarding';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {

  const { auth, setAuth } = useAuth();
  const { myBar, setMyBar } = useMyBar();  
  const { onBoar, setOnBoar} = useOnBoarding();

  const handleLogout = () => {
    if (myBar && !onBoar){
      document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      setAuth(false);
      setMyBar(false);
      setOnBoar(true);
    }
  };

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 60,
        height: 60,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
       <img src={MyLogo} alt="Logo" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}  onClick={handleLogout}>
      {logo}
    </Link>
    
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import Badges from '../components/Badges';
import FooterBar from '../components/Bar';
import Copyright from '../components/Copyright';
import Logo from '../components/Logo';
import Nav from '../components/Nav';
import Social from '../components/Social';

const StandardFooter: React.FC = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const brand = (
    <>
      <Box mb={{ xs: 3, md: 2 }}>
        <Logo />
      </Box>
      <Box mb={4}>
        <Badges />
      </Box>
      <Box mb={1}>
        <Social />
      </Box>
      <Box>
        <Copyright />
      </Box>
    </>
  );

  return (
    <FooterBar>
      <Grid container spacing={4}>
        {desktop ? (
          <>
            <Grid item md={4}>
              {brand}
            </Grid>
            <Grid item md={8}>
              <Nav desktop={true} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Nav desktop={false} />
            </Grid>
            <Grid item xs={12}>
              {brand}
            </Grid>
          </>
        )}
      </Grid>
    </FooterBar>
  );
};

export default StandardFooter;

import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import FooterBar from '../components/Bar';
import { DesktopNav, MobileNav } from '../components/Nav';
import Brand from './Brand';

const StandardFooter: React.FC = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <FooterBar>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          {desktop ? <Brand /> : <MobileNav />}
        </Grid>
        <Grid item xs={12} md={8}>
          {desktop ? <DesktopNav /> : <Brand />}
        </Grid>
      </Grid>
    </FooterBar>
  );
};

export default StandardFooter;

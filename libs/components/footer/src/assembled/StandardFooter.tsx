import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import FooterBar from '../components/Bar';
import Navigation from '../components/Navigation';
import Brand from './Brand';

const StandardFooter: React.FC = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  if (desktop) {
    return (
      <FooterBar>
        <Grid container spacing={4}>
          <Grid item md={4}>
            <Brand />
          </Grid>
          <Grid item md={8}>
            <Navigation />
          </Grid>
        </Grid>
      </FooterBar>
    );
  } else {
    return (
      <FooterBar>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Navigation />
          </Grid>
          <Grid item xs={12}>
            <Brand />
          </Grid>
        </Grid>
      </FooterBar>
    );
  }
};

export default StandardFooter;

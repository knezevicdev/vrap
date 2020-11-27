import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import Logo from 'src/components/Logo';

const Header: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Logo />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h2">Logistics Dashboard</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button color="inherit">
            <Typography variant="body1">Login</Typography>
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Header;

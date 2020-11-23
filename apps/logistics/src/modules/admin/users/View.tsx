import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Filters from './Filters';
import Table from './Table';

const UsersView: React.FC = () => {
  return (
    <Paper square>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h5">Users</Typography>
        </Grid>
        <Grid item>
          <Filters />
        </Grid>
      </Grid>
      <Table />
    </Paper>
  );
};

export default UsersView;

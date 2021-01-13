import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import CarrierFilter from './Carrier';
import UserStatusFilter from './UserStatus';

const Filters: React.FC = () => {
  return (
    <Paper square>
      <Box p={2}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="body1">Filter Menu</Typography>
          </Grid>
          <Grid item xs={12}>
            <CarrierFilter />
          </Grid>
          <Grid item xs={12}>
            <UserStatusFilter />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Filters;

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

import Filters from './Filters';
import UserTable from './Table';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const UsersView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.getUserStatuses();
  }, [viewModel]);

  return (
    <Box p={5}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="body1">Admin Management</Typography>
        </Grid>
        <Grid item xs={3}>
          <Filters />
        </Grid>
        <Grid item xs={9}>
          <UserTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsersView;

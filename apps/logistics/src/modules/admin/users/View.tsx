import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
    <Paper square>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h5">Users</Typography>
        </Grid>
        <Grid item>
          <Filters />
        </Grid>
      </Grid>
      <UserTable />
    </Paper>
  );
};

export default UsersView;

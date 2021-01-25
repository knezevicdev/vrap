import { Box, Grid, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import Filters from './Filters';
import UserTable from './Table';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const UsersView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.init();
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

export default observer(UsersView);

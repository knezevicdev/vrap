import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import React from 'react';

import SimilarVehicles from './components/SimilarVehicles';
import ViewModel from './ViewModel';

import VehicleNotFound from 'src/components/VehicleNotFound';

interface Props {
  viewModel: ViewModel;
}

const ContentErrorView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Box mt={4} mb={6}>
      <VehicleNotFound
        errorTop={viewModel.errorTop}
        errorBottom={viewModel.errorBottom}
      />
      <Box mt={12}>
        <Grid container>
          <Grid item xs={12}>
            <SimilarVehicles />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default observer(ContentErrorView);

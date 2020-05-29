import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import { ReactComponent as NoVehiclesFoundIcon } from './no-vehicles-found.svg';

import Typography from 'src/ui/Typography';

interface Props {
  errorTop: string;
  errorBottom: string;
}

const VehicleNotFound: React.FC<Props> = (props) => {
  const { errorTop, errorBottom } = props;
  return (
    <Grid container spacing={6} justify="center">
      <Grid item>
        <NoVehiclesFoundIcon />
      </Grid>
      <Grid item xs={12}>
        <Box mb={2}>
          <Typography
            variant="h2"
            fontWeight="fontWeightMedium"
            textAlign="center"
          >
            {errorTop}
          </Typography>
        </Box>
        <Typography
          variant="h2"
          fontWeight="fontWeightLight"
          textAlign="center"
        >
          {errorBottom}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default VehicleNotFound;

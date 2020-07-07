import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import { ReactComponent as NoVehiclesFoundIcon } from './no-results.svg';

interface Props {
  errorTop: string;
  errorBottom: string;
}

const Top = styled(Typography)(() => ({
  fontSize: '28px',
}));

const Bottom = styled(Typography)(() => ({
  fontSize: '28px',
}));

const Icon = styled(NoVehiclesFoundIcon)(() => ({
  width: '64px',
}));

const VehicleNotFound: React.FC<Props> = (props) => {
  const { errorTop, errorBottom } = props;
  return (
    <Grid container spacing={6} justify="center">
      <Icon />
      <Grid item xs={12}>
        <Top fontWeight="fontWeightMedium" textAlign="center">
          {errorTop}
        </Top>
        <Bottom fontWeight="fontWeightLight" textAlign="center">
          {errorBottom}
        </Bottom>
      </Grid>
    </Grid>
  );
};

export default VehicleNotFound;

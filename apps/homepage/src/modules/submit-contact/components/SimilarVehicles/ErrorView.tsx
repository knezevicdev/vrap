import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

import Button from 'src/ui/Button';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const ErrorView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12} md={4}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={viewModel.handleErrorButtonClick}
        >
          <Typography variant="body1" fontWeight="fontWeightMedium">
            {viewModel.errorButtonLabel}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default observer(ErrorView);

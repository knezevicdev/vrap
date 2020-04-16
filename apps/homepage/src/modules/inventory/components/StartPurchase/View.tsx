import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

import Button from 'src/ui/Button';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}
const StartPurchaseView: React.FC<Props> = props => {
  const { viewModel } = props;
  const handleClick = (): void => viewModel.handleClick();

  return (
    <Grid item xs={12} sm={3} md={2} container alignItems="center">
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={handleClick}
      >
        <Typography variant="body1" fontWeight="fontWeightMedium">
          {viewModel.purchaseText}
        </Typography>
      </Button>
    </Grid>
  );
};

export default observer(StartPurchaseView);

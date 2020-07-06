import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const CustomButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-contained.Mui-disabled': {
    backgroundColor: theme.palette.grey['400'],
    color: theme.palette.text.primary,
  },
}));

const StartPurchaseView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const handleClick = (): void => viewModel.handleClick();

  return (
    <Grid item xs={12} sm={3} md={2} container alignItems="center">
      <CustomButton
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={handleClick}
        disabled={viewModel.isAvailableSoon()}
      >
        <Typography variant="body1" fontWeight="fontWeightMedium">
          {viewModel.isAvailableSoon()
            ? viewModel.availableSoon
            : viewModel.purchaseText}
        </Typography>
      </CustomButton>
    </Grid>
  );
};

export default observer(StartPurchaseView);

import { styled } from '@material-ui/core/styles';
import { Button } from '@vroom-web/ui';
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
    <>
      <CustomButton
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={viewModel.isAvailableSoon()}
      >
        {viewModel.isAvailableSoon()
          ? viewModel.availableSoon
          : viewModel.purchaseText}
      </CustomButton>
    </>
  );
};

export default observer(StartPurchaseView);

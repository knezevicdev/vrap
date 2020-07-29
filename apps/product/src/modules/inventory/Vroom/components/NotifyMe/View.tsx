import { styled } from '@material-ui/core/styles';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const CustomButton = styled(Button)(({ theme }) => ({
  width: '100%',

  '&.MuiButton-contained.Mui-disabled': {
    backgroundColor: '#f5f5f5',
    color: theme.palette.grey['A100'],
    border: `1px solid ${theme.palette.grey['A100']}`,
  },
}));

const NotifyMeView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const handleClick = (): void => viewModel.handleClick();

  return (
    <>
      <CustomButton variant="contained" color="primary" onClick={handleClick}>
        <Typography variant="button" fontWeight={600}>
          {viewModel.notifyMeText}
        </Typography>
      </CustomButton>
    </>
  );
};

export default observer(NotifyMeView);

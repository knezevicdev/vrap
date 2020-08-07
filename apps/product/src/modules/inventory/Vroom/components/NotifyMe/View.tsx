import { styled } from '@material-ui/core/styles';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
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

  React.useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);

  const handleDialogClick = (): void => viewModel.handleClick();
  console.log(viewModel.getAccessToken(), 'token');
  return (
    <>
      <CustomButton
        variant="outlined"
        color="primary"
        onClick={handleDialogClick}
      >
        <Typography variant="button" fontWeight={600}>
          {viewModel.notifyMeButton}
        </Typography>
      </CustomButton>
      {viewModel.isLoggedIn() ? (
        <LoggedIn viewModel={viewModel} />
      ) : (
        <LoggedOut viewModel={viewModel} />
      )}
    </>
  );
};

export default observer(NotifyMeView);

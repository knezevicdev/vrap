import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
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

const DialogTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: theme.spacing(2),
}));

const DialogContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingBottom: theme.spacing(4),
}));

const DialogBody = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 8, 4, 8),
}));

const DialogButton = styled(Button)(({ theme }) => ({
  width: '50%',
  marginBottom: theme.spacing(2),
}));

const NotifyMeView: React.FC<Props> = (props) => {
  const { viewModel } = props;

  React.useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);

  const handleDialogClick = (): void => viewModel.handleClick();
  const handleDialogActions = (location: string): void =>
    viewModel.handleDialogActions(location);
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
        <Dialog
          onClose={handleDialogClick}
          fullWidth={true}
          maxWidth={'sm'}
          open={viewModel.isOpen()}
        >
          <DialogContent>
            <DialogTitle variant="h2" fontWeight="fontWeightMedium">
              {viewModel.dialogTitle}
              <StyledIconButton aria-label="close" onClick={handleDialogClick}>
                <CloseIcon />
              </StyledIconButton>
            </DialogTitle>
            <DialogBody>{viewModel.getUserEmail()}</DialogBody>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog
          onClose={handleDialogClick}
          fullWidth={true}
          maxWidth={'sm'}
          open={viewModel.isOpen()}
        >
          <DialogContent>
            <DialogTitle variant="h2" fontWeight="fontWeightMedium">
              {viewModel.dialogTitle}
              <StyledIconButton aria-label="close" onClick={handleDialogClick}>
                <CloseIcon />
              </StyledIconButton>
            </DialogTitle>
            <DialogBody>{viewModel.dialogBodyLoggedOut}</DialogBody>
            <DialogButton
              variant="contained"
              color="primary"
              onClick={(): void => handleDialogActions('create')}
            >
              <Typography variant="button" fontWeight={600}>
                {viewModel.createAccountButton}
              </Typography>
            </DialogButton>
            <DialogButton
              variant="outlined"
              color="primary"
              onClick={(): void => handleDialogActions('login')}
            >
              <Typography variant="button" fontWeight={600}>
                {viewModel.logInButton}
              </Typography>
            </DialogButton>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default observer(NotifyMeView);

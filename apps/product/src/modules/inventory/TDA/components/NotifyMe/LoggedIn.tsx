import { CircularProgress } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

const DialogHeader = styled('div')(({ theme }) => ({
  borderBottom: '1px solid rgba(0, 0, 0, .2)',
  margin: theme.spacing(2, 0),
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
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4, 8),
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(2),
  },
}));

const DialogButton = styled(Button)(() => ({
  display: 'flex',
  alignSelf: 'center',
  width: '100%',
}));

const HeaderContent = styled('div')(({ theme }) => ({
  margin: theme.spacing(4, 0),
  [theme.breakpoints.only('xs')]: {
    width: '100%',
    margin: theme.spacing(0),
  },
}));

const CheckboxContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(2, 0),
  margin: theme.spacing(4, 0),
  backgroundColor: theme.palette.grey[100],
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.grey[900],
}));

const ErrorContainer = styled('div')(({ theme }) => ({
  border: '3px solid #F26900',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '33%',
  padding: theme.spacing(2),
}));

const ErrorButton = styled(DialogButton)(({ theme }) => ({
  width: '50%',
  alignSelf: 'center',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ErrorHeader = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ErrorBody = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  fontSize: '18px',
}));

const CheckboxTypography = styled(Typography)(() => ({
  cursor: 'pointer',
}));

const DialogTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    marginBottom: theme.spacing(1),
    fontSize: '24px',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const LoggedInView: React.FC<Props> = ({ viewModel }) => {
  const handleDialogClick = (): void => viewModel.handleClick();
  const handleDialogActions = (location: string) => (): void =>
    viewModel.handleDialogActions(location);
  const handleCheckboxChange = (): void => viewModel.handleCheckbox();
  return (
    <Dialog
      onClose={handleDialogClick}
      maxWidth={'sm'}
      open={viewModel.isOpen()}
    >
      <DialogContent>
        <DialogHeader>
          <HeaderContent>
            <DialogTitle variant="h2">
              {viewModel.isSuccessful().dialogTitle}
            </DialogTitle>
          </HeaderContent>
          <StyledIconButton aria-label="close" onClick={handleDialogClick}>
            <CloseIcon />
          </StyledIconButton>
        </DialogHeader>
        <DialogBody>
          <Typography>{viewModel.loggedIn.body}</Typography>
          <CheckboxContainer>
            <StyledCheckbox
              checked={viewModel.isChecked()}
              onChange={handleCheckboxChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <CheckboxTypography onClick={handleCheckboxChange}>
              {viewModel.loggedIn.checkboxText}
            </CheckboxTypography>
          </CheckboxContainer>
          {!viewModel.hasError() ? (
            <DialogButton
              variant="contained"
              color="primary"
              onClick={handleDialogActions('submit')}
              disabled={viewModel.dialogButtonDisabled()}
            >
              <Typography variant="button" fontWeight={600}>
                {viewModel.getDialogButtonLoading() ? (
                  <CircularProgress />
                ) : (
                  viewModel.loggedIn.buttonText
                )}
              </Typography>
            </DialogButton>
          ) : (
            <ErrorContainer>
              <ErrorHeader color="orange" fontWeight="fontWeightMedium">
                {viewModel.loggedIn.error.headerText}
              </ErrorHeader>
              <ErrorBody>{viewModel.loggedIn.error.bodyText}</ErrorBody>
              <ErrorButton
                variant="contained"
                color="primary"
                onClick={handleDialogActions('submit')}
                disabled={viewModel.dialogButtonDisabled()}
              >
                <Typography variant="button" fontWeight={600}>
                  {viewModel.getDialogButtonLoading() ? (
                    <CircularProgress />
                  ) : (
                    viewModel.loggedIn.error.buttonText
                  )}
                </Typography>
              </ErrorButton>
            </ErrorContainer>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default observer(LoggedInView);

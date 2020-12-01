import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';
import styled from 'styled-components';
import { Hero, Body } from 'src/core/Typography';
import { Button } from 'src/core/Button';

const DialogTitle = styled(Hero.Three)`
  padding-bottom: 8px;
  @media (max-width: 768px) {
    padding-bottom: 16px;
  }
`;

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: theme.spacing(2),
}));

const DialogContent = styled.div`
  padding: 96px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-bottom: 4px solid #e7131a;
  @media (max-width: 768px) {
    padding: 64px 32px;
  }
`;

const DialogBody = styled(Body.Regular)`
  padding-bottom: 64px;
  @media (max-width: 768px) {
    padding-bottom: 56px;
  }
`;

const CreateAccountButton = styled(Button.Primary)`
  @media (min-width: 768px) {
    min-width: 280px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  margin-bottom: 16px;
`;

const LogInButton = styled(Button.Outline)`
  @media (min-width: 768px) {
    min-width: 280px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  margin-bottom: 16px;
`;

interface Props {
  viewModel: ViewModel;
}

const LoggedOutView: React.FC<Props> = ({ viewModel }) => {
  const handleDialogActions = (location: string) => (): void =>
    viewModel.handleDialogActions(location);
  const handleDialogClick = (): void => viewModel.handleDialog();
  return (
    <Dialog
      onClose={handleDialogClick}
      fullWidth={true}
      maxWidth={'sm'}
      open={viewModel.isOpen()}
    >
      <DialogContent>
        <DialogTitle>
          {viewModel.dialogTitle}
          {/* <StyledIconButton aria-label="close" onClick={handleDialogClick}>
            <CloseIcon />
          </StyledIconButton> */}
        </DialogTitle>
        <DialogBody>{viewModel.dialogBody}</DialogBody>
        <CreateAccountButton onClick={handleDialogActions('create')}>
          {viewModel.createAccountButton}
        </CreateAccountButton>
        <LogInButton onClick={handleDialogActions('login')}>
          {viewModel.logInButton}
        </LogInButton>
      </DialogContent>
    </Dialog>
  );
};

export default observer(LoggedOutView);

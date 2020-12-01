import Dialog from '@material-ui/core/Dialog';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';
import styled from 'styled-components';
import { Hero, Body } from 'src/core/Typography';
import { Button } from 'src/core/Button';
import Icon, { Icons } from 'src/core/Icon';

const DialogTitle = styled(Hero.Three)`
  padding-bottom: 8px;
  @media (max-width: 768px) {
    padding-bottom: 16px;
  }
`;

const CloseIcon = styled(Icon)`
  cursor: pointer;
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  padding: 16px;
`;

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
      PaperProps={{
        style: {
          borderRadius: 0,
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <span onClick={handleDialogClick}>
        <CloseIcon icon={Icons.CLOSE} />
      </span>
      <DialogContent>
        <DialogTitle>{viewModel.dialogTitle}</DialogTitle>
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

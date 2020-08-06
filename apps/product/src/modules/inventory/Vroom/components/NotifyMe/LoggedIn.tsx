import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

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

interface Props {
  viewModel: ViewModel;
}

const LoggedInView: React.FC<Props> = ({ viewModel }) => {
  const handleDialogClick = (): void => viewModel.handleClick();
  return (
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
  );
};

export default observer(LoggedInView);

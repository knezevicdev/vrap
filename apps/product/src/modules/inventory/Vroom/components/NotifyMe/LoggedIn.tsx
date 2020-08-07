import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import CarCard from '../SimilarVehicles/components/CarCard';
import ViewModel from './ViewModel';

const DialogHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'row',
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

const HeaderContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const CarCardContainer = styled('div')(({ theme }) => ({
  width: '25%',
  margin: theme.spacing(0, 8),
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
      maxWidth={'lg'}
      open={viewModel.isOpen()}
    >
      <DialogContent>
        <DialogHeader>
          <CarCardContainer>
            <CarCard car={viewModel.getCar()} key={viewModel.getVin()} />
          </CarCardContainer>
          <HeaderContent>
            <Typography variant="h2">{viewModel.dialogTitle}</Typography>
            <Typography>{viewModel.dialogBodyLoggedIn1}</Typography>
            <Typography>{viewModel.dialogBodyLoggedIn2}</Typography>
          </HeaderContent>
          <StyledIconButton aria-label="close" onClick={handleDialogClick}>
            <CloseIcon />
          </StyledIconButton>
        </DialogHeader>
        <DialogBody>{viewModel.getUserEmail()}</DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default observer(LoggedInView);

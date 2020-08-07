import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import CarCard from '../SimilarVehicles/components/CarCard';
import ViewModel from './ViewModel';

const DialogHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: theme.palette.grey[100],
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
  padding: theme.spacing(4, 0),
  width: '33%',
}));

const DialogButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  width: '33%',
  marginBottom: theme.spacing(2),
}));

const HeaderContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(8, 0),
  justifyContent: 'space-between',
}));

const CarCardContainer = styled('div')(({ theme }) => ({
  width: '25%',
  margin: theme.spacing(0, 8),
}));

const Email = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  alignSelf: 'center',
}));

const CheckboxContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: theme.spacing(3),
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.grey[900],
}));

interface Props {
  viewModel: ViewModel;
}

const LoggedInView: React.FC<Props> = ({ viewModel }) => {
  const handleDialogClick = (): void => viewModel.handleClick();
  const handleDialogActions = (location: string): void =>
    viewModel.handleDialogActions(location);
  const handleCheckboxChange = (): void => viewModel.handleCheckbox();
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
            <Typography variant="body1">
              {viewModel.loggedIn.header1}
            </Typography>
            <Typography variant="body1">
              {viewModel.loggedIn.header2}
            </Typography>
          </HeaderContent>
          <StyledIconButton aria-label="close" onClick={handleDialogClick}>
            <CloseIcon />
          </StyledIconButton>
        </DialogHeader>
        <DialogBody>
          <Typography>
            <strong>{viewModel.loggedIn.bodyTitle}</strong>
          </Typography>
          <Email>{viewModel.getUserEmail()}</Email>
          <Typography>{viewModel.loggedIn.body}</Typography>
          <CheckboxContainer>
            <StyledCheckbox
              checked={viewModel.isChecked()}
              onChange={handleCheckboxChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography>{viewModel.loggedIn.checkboxText}</Typography>
          </CheckboxContainer>
        </DialogBody>
        <DialogButton
          variant="contained"
          color="primary"
          onClick={(): void => handleDialogActions('submit')}
          disabled={!viewModel.isChecked()}
        >
          <Typography variant="button" fontWeight={600}>
            {viewModel.loggedIn.buttonText}
          </Typography>
        </DialogButton>
      </DialogContent>
    </Dialog>
  );
};

export default observer(LoggedInView);

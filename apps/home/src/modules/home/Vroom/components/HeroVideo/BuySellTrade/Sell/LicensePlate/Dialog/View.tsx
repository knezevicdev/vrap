import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Radio from '@material-ui/core/Radio';
import { makeStyles, styled } from '@material-ui/core/styles';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Options = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Option = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(1),
  border: '1px solid rgb(214, 215, 218)',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 3px 0px',
  padding: theme.spacing(2),
}));

const Label = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  margin: theme.spacing(2, 4),
}));

const Vehicle = styled(Typography)(() => ({
  fontSize: '24px',
  fontWeight: 600,
}));

const VIN = styled(Typography)(() => ({
  fontSize: '16px',
}));

const radioStyle = makeStyles((theme) => ({
  root: {
    color: theme.palette.grey['500'],
    padding: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}));

const NextButton = styled(Button)(({ theme }) => ({
  margin: `${theme.spacing(2)}px auto`,
}));

const LicensePlateDialogView: React.FC<Props> = ({ viewModel }) => {
  const radioClass = radioStyle();

  return (
    <Dialog
      onClose={viewModel.handleClose}
      aria-labelledby="vehicle-identification-number-information"
      scroll="paper"
      open={viewModel.isOpen()}
    >
      <Title lineHeight="normal" variant="h2">
        {viewModel.title}
      </Title>
      <DialogContent dividers>
        <Options>
          {viewModel.getVehicles().map((vehicle) => {
            return (
              <Option key={vehicle.vin}>
                <Radio
                  classes={radioClass}
                  checked={viewModel.isRadioCheck(vehicle.vin)}
                  onChange={viewModel.handleChange}
                  value={vehicle.vin}
                />
                <Label>
                  <Vehicle lineHeight="normal">{vehicle.vehicle}</Vehicle>
                  <VIN lineHeight="normal">{vehicle.vin}</VIN>
                </Label>
              </Option>
            );
          })}
        </Options>
      </DialogContent>
      <NextButton
        disabled={viewModel.isButtonDisabled()}
        onClick={viewModel.handleButtonClick}
        variant="contained"
        color="primary"
      >
        {viewModel.buttonLabel}
      </NextButton>
    </Dialog>
  );
};

export default observer(LicensePlateDialogView);

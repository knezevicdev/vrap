import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import LicensePlateDialog from './Dialog';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const LicensePlateContainer = styled('div')(() => ({}));

const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInput-formControl': {
    marginTop: theme.spacing(1),
  },
  '& .MuiInputLabel-root': {
    position: 'static',
    transform: 'none',
    fontSize: '14px',
    fontWeight: theme.typography.fontWeightLight,
    lineHeight: '14px',
    color: theme.palette.text.primary,
  },
  '& input, .MuiSelect-root': {
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  '& .Mui-error input': {
    borderColor: theme.palette.error.main,
  },
  '& .Mui-error.MuiInputLabel-root': {
    color: theme.palette.error.main,
  },
  '& .MuiFormHelperText-root': {
    display: 'none',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    display: 'initial',
  },
}));

const StateSelect = styled(Input)(({ theme }) => ({
  width: theme.spacing(20),
  marginLeft: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const Inputs = styled('div')(() => ({
  display: 'flex',
}));

const LicensePlateView: React.FC<Props> = ({ viewModel }) => {
  return (
    <LicensePlateContainer>
      <Inputs>
        <Input
          id="license-plate"
          focused={true}
          label={viewModel.licensePlateLabel}
          placeholder={viewModel.licensePlateLabel}
          value={viewModel.getInputValue()}
          onChange={viewModel.onChange}
          error={viewModel.hasError()}
          helperText={viewModel.error}
          InputProps={{ disableUnderline: true, inputProps: { maxLength: 8 } }}
        />
        <StateSelect
          id="state"
          select
          label={'State'}
          placeholder={viewModel.licensePlateLabel}
          value={viewModel.getSelectedState()}
          onChange={viewModel.handleChange}
          InputProps={{ disableUnderline: true }}
        >
          {viewModel.getStates().map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </StateSelect>
      </Inputs>
      <SubmitButton
        disabled={viewModel.isButtonDisabled()}
        onClick={viewModel.handleButtonClick}
        variant="contained"
        color="secondary"
      >
        {viewModel.getButtonLabel()}
      </SubmitButton>
      <LicensePlateDialog
        homeStore={viewModel.homeStore}
        licensePlateStore={viewModel.licensePlateStore}
      />
    </LicensePlateContainer>
  );
};

export default observer(LicensePlateView);

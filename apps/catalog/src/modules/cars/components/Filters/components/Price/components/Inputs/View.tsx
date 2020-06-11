import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import InputsViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

const ContainerForErrorAndInputs = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const InputsContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-around',
}));

const Input = styled(OutlinedInput)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(5),
  fontSize: '12px',
  '& .MuiTypography-colorTextSecondary': {
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-adornedStart': {
    paddingLeft: theme.spacing(1),
  },
}));

const Error = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  lineHeight: '1.4',
  textAlign: 'center',
}));

interface InputsViewProps {
  viewModel: InputsViewModel;
}

const InputsView: React.FC<InputsViewProps> = ({ viewModel }) => {
  const onMinChange = (event: object): void => {
    const {
      target: { value },
    } = event as React.ChangeEvent<HTMLSelectElement>;
    viewModel.setValues([value, viewModel.getMax()]);
  };

  const onMaxChange = (event: object): void => {
    const {
      target: { value },
    } = event as React.ChangeEvent<HTMLSelectElement>;
    viewModel.setValues([viewModel.getMin(), value]);
  };

  return (
    <ContainerForErrorAndInputs>
      {viewModel.getError() && (
        <Error variant="body1" color="error.main">
          {viewModel.errorLabel}
        </Error>
      )}

      <InputsContainer>
        <Input
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          error={viewModel.getError()}
          value={viewModel.getMin()}
          onChange={onMinChange}
          placeholder={viewModel.leftPlaceholder}
        />
        <Input
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          error={viewModel.getError()}
          value={viewModel.getMax()}
          onChange={onMaxChange}
          placeholder={viewModel.rightPlaceholder}
        />
      </InputsContainer>
    </ContainerForErrorAndInputs>
  );
};

export default observer(InputsView);

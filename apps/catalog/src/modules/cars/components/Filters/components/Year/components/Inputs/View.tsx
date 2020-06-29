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
  const handleMinInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    viewModel.handleMinInputChange(value);
  };

  const handleMaxInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    viewModel.handleMaxInputChange(value);
  };

  const hasError = viewModel.hasError();

  return (
    <ContainerForErrorAndInputs>
      {hasError && (
        <Error variant="body1" color="error.main">
          {viewModel.errorLabel}
        </Error>
      )}

      <InputsContainer>
        <Input
          error={hasError}
          value={viewModel.getMin()}
          onChange={handleMinInputChange}
          placeholder={viewModel.minInputPlaceholder}
        />
        <Input
          error={hasError}
          value={viewModel.getMax()}
          onChange={handleMaxInputChange}
          placeholder={viewModel.maxInputPlaceholder}
        />
      </InputsContainer>
    </ContainerForErrorAndInputs>
  );
};

export default observer(InputsView);

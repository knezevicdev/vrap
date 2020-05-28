import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Input = styled(TextField)(({ theme }) => ({
  width: theme.spacing(22),
}));

const Error = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  lineHeight: '1.4',
  textAlign: 'center',
}));

export interface InputsViewProps {
  viewModel: InputsViewModel;
}

const InputsView: React.FC<InputsViewProps> = ({ viewModel }) => {
  const onChange = (event: object): void => {
    const {
      target: { value },
    } = event as React.ChangeEvent<HTMLSelectElement>;
    const miles = parseInt(value);
    viewModel.setValue(miles);
  };

  return (
    <ContainerForErrorAndInputs>
      {viewModel.getError() && (
        <Error color="error.main">{viewModel.errorLabel}</Error>
      )}
      <InputsContainer>
        <Typography variant="overline">Mileage Maximum</Typography>
        <Input
          size="small"
          variant="outlined"
          error={viewModel.getError()}
          value={viewModel.getValue()}
          onChange={onChange}
          placeholder={viewModel.placeholder}
        />
      </InputsContainer>
    </ContainerForErrorAndInputs>
  );
};

export default observer(InputsView);

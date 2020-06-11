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
  justifyContent: 'space-around',
}));

const Input = styled(TextField)(() => ({
  width: '66px',
}));

const Error = styled(Typography)(() => ({
  marginBottom: '16px',
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
          size="small"
          variant="outlined"
          error={viewModel.getError()}
          value={viewModel.getMin()}
          onChange={onMinChange}
          placeholder={viewModel.leftPlaceholder}
        />
        <Input
          size="small"
          variant="outlined"
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

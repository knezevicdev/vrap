import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';

import { range } from '../../ViewModel';
import { InputsViewProps } from './types';
import { changeYearUrl, updateInputState } from './util';

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

const Inputs: React.FC<InputsViewProps> = ({ onDone, state, viewModel }) => {
  /* TODO
    Extract local state to a Filters mobx store
   */
  const { min, max } = range;
  const [error, setError] = useState(false);
  const [values, setValues] = useState<string[] | undefined>(state);
  const left = values ? values[0] : '';
  const right = values ? values[1] : '';

  useEffect(() => {
    if (updateInputState(state, values)) {
      setValues(state);
      setError(false);
    }
  }, [state]);

  useEffect(() => {
    if (changeYearUrl(state, values, error)) {
      onDone([parseInt(left), parseInt(right)]);
    }
  }, [values]);

  const onLeftChange = (event: object): void => {
    const {
      target: { value },
    } = event as React.ChangeEvent<HTMLSelectElement>;
    const year = parseInt(value);
    if (year) {
      setValues([value, right ? right : max.toString()]);
      const hasError = year < min || year > parseInt(right);
      setError(hasError);
    } else {
      setValues(['', right]);
      setError(true);
    }
  };

  const onRightChange = (event: object): void => {
    const {
      target: { value },
    } = event as React.ChangeEvent<HTMLSelectElement>;
    const year = parseInt(value);
    if (year) {
      setValues([left ? left : min.toString(), value]);
      const isHigherThanMax = year > max;
      const isLeftEmpty = left === '';
      const isLowerThanLeftOrMin = isLeftEmpty
        ? year < min
        : year < parseInt(left);
      const hasError = isHigherThanMax || isLowerThanLeftOrMin;
      setError(hasError);
    } else {
      setValues([left, '']);
      setError(true);
    }
  };

  return (
    <ContainerForErrorAndInputs>
      {error && (
        <Error variant="body1" color="error.main">
          {viewModel.errorLabel}
        </Error>
      )}

      <InputsContainer>
        <Input
          size="small"
          variant="outlined"
          error={error}
          value={left}
          onChange={onLeftChange}
          placeholder={viewModel.leftPlaceholder}
        />
        <Input
          size="small"
          variant="outlined"
          error={error}
          value={right}
          onChange={onRightChange}
          placeholder={viewModel.rightPlaceholder}
        />
      </InputsContainer>
    </ContainerForErrorAndInputs>
  );
};

export default Inputs;

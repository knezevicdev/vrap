import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { styled } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import { InputsViewProps } from './types';
/* TODO
  Remove from util, should hep when we have a mobx store.
 */
import { changeUrl, updateInputState } from './util';

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

const InputsView: React.FC<InputsViewProps> = ({
  onDone,
  state,
  viewModel,
}) => {
  /* TODO
    Extract local state to a Filters mobx store
    Reuse? Miles Price and Year all uses somewhat similar UI (I guess this one is different..)
   */
  const { min, max } = viewModel.getRange();
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
    if (changeUrl(state, values, error)) {
      onDone({ min: parseInt(left), max: parseInt(right) });
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
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          error={error}
          value={left}
          onChange={onLeftChange}
          placeholder={viewModel.leftPlaceholder}
        />
        <Input
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          error={error}
          value={right}
          onChange={onRightChange}
          placeholder={viewModel.rightPlaceholder}
        />
      </InputsContainer>
    </ContainerForErrorAndInputs>
  );
};

export default InputsView;

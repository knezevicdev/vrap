import OutlinedInput from '@material-ui/core/OutlinedInput';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import { Variant } from './index';
import SliderValueLabelView from './SliderValueLabelView';
import ViewModel from './ViewModel';

import UISlider from 'src/ui/Slider';

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

const StyledSlider = styled(UISlider)(({ theme }) => ({
  width: theme.spacing(24),
  margin: theme.spacing(2, 0, 2, 2),
}));

const Value = styled(Typography)(() => ({
  fontSize: '16px',
  alignSelf: 'center',
}));

interface Props {
  viewModel: ViewModel;
}

const MaxAndMinInputsView: React.FC<Props> = ({ viewModel }) => {
  const handleMaxInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    viewModel.handleMaxInputChange(value);
  };

  const handleMinInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    viewModel.handleMinInputChange(value);
  };

  const handleSliderChange = (
    _event: React.ChangeEvent<{}>,
    value: number | number[]
  ): void => {
    viewModel.handleSliderChange(value);
  };

  const handleSliderChangeCommitted = (
    _event: React.ChangeEvent<{}>,
    value: number | number[]
  ): void => {
    viewModel.handleSliderChangeCommitted(value);
  };

  const hasInputError = viewModel.hasInputError();

  const getMinInputForVariant = (): React.ReactNode => {
    if (viewModel.variant === Variant.MAX_ONLY) {
      return <Value>{viewModel.maxOnlyInputLabel}</Value>;
    }
    return (
      <Input
        startAdornment={viewModel.inputStartAdornment}
        error={hasInputError}
        value={viewModel.getMinInputValue()}
        onChange={handleMinInputChange}
        placeholder={viewModel.minInputPlaceholder}
      />
    );
  };

  return (
    <>
      <ContainerForErrorAndInputs>
        {hasInputError && (
          <Error variant="body1" color="error.main">
            {viewModel.inputErrorLabel}
          </Error>
        )}

        <InputsContainer>
          {getMinInputForVariant()}
          <Input
            startAdornment={viewModel.inputStartAdornment}
            error={hasInputError}
            value={viewModel.getMaxInputValue()}
            onChange={handleMaxInputChange}
            placeholder={viewModel.maxInputPlaceholder}
          />
        </InputsContainer>
      </ContainerForErrorAndInputs>
      <StyledSlider
        ValueLabelComponent={SliderValueLabelView}
        valueLabelDisplay="auto"
        min={viewModel.min}
        max={viewModel.max}
        value={viewModel.getSliderValue()}
        step={viewModel.step}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommitted}
      />
    </>
  );
};

export default observer(MaxAndMinInputsView);

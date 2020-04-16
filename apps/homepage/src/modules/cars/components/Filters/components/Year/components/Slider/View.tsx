import { styled } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

import SliderValueLabel from '../../../SliderValueLabel/View';
import { SliderViewProps } from './types';

import UISlider from 'src/ui/Slider';

const StyledSlider = styled(UISlider)(() => ({
  width: '192px',
  margin: '16px 0px 32px 12px',
}));

const Slider: React.FC<SliderViewProps> = ({ state, onDone, viewModel }) => {
  /* TODO
    Extract local state to a Filters mobx store
  */
  const [values, setValues] = React.useState(state);

  useEffect(() => {
    setValues(state);
  }, [state]);

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ): void => {
    setValues(newValue as number[]);
  };

  const onChangeCommitted = (
    _event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ): void => {
    onDone(newValue as number[]);
  };

  return (
    <StyledSlider
      ValueLabelComponent={SliderValueLabel}
      valueLabelDisplay="auto"
      min={viewModel.min}
      max={viewModel.max}
      value={values}
      onChange={handleChange}
      onChangeCommitted={onChangeCommitted}
    />
  );
};

export default Slider;

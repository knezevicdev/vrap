import { styled } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

import SliderValueLabel from '../../../SliderValueLabel/View';
import { SliderViewProps } from './types';

import UISlider from 'src/ui/Slider';

const StyledSlider = styled(UISlider)(({ theme }) => ({
  width: theme.spacing(24),
  margin: theme.spacing(2, 0, 4, 2),
}));

const Slider: React.FC<SliderViewProps> = ({ state, onDone, viewModel }) => {
  /* TODO
    Extract local state to a Filters mobx store
  */
  const [price, setPrice] = React.useState(state);

  useEffect(() => {
    setPrice(state);
  }, [state]);

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ): void => {
    const values = newValue as number[];
    setPrice({ min: values[0], max: values[1] });
  };

  const onChangeCommitted = (
    _event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ): void => {
    const values = newValue as number[];
    onDone({ min: values[0], max: values[1] });
  };

  const values = [price.min, price.max];

  return (
    <StyledSlider
      ValueLabelComponent={SliderValueLabel}
      valueLabelDisplay="auto"
      min={viewModel.min}
      max={viewModel.max}
      value={values}
      step={1000}
      onChange={handleChange}
      onChangeCommitted={onChangeCommitted}
    />
  );
};

export default Slider;

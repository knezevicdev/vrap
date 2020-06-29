import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import SliderValueLabel from '../../../SliderValueLabel/View';
import SliderViewModel from './ViewModel';

import UISlider from 'src/ui/Slider';

const StyledSlider = styled(UISlider)(({ theme }) => ({
  width: theme.spacing(24),
  margin: theme.spacing(2, 0, 4, 2),
}));

interface SliderViewProps {
  viewModel: SliderViewModel;
}

const Slider: React.FC<SliderViewProps> = ({ viewModel }) => {
  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ): void => {
    const values = newValue as number[];
    viewModel.handleSliderChange({ min: values[0], max: values[1] });
  };

  const onChangeCommitted = (
    _event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ): void => {
    const values = newValue as number[];
    viewModel.handleSliderChangeCommitted({ min: values[0], max: values[1] });
  };

  return (
    <StyledSlider
      ValueLabelComponent={SliderValueLabel}
      valueLabelDisplay="auto"
      min={viewModel.range.min}
      max={viewModel.range.max}
      value={viewModel.getValues()}
      step={1}
      onChange={handleChange}
      onChangeCommitted={onChangeCommitted}
    />
  );
};

export default observer(Slider);

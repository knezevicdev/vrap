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
    viewModel.setValue(newValue as number);
  };

  const onChangeCommitted = (
    _event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ): void => {
    viewModel.onDone({ min: viewModel.min, max: newValue as number });
  };

  return (
    <StyledSlider
      ValueLabelComponent={SliderValueLabel}
      valueLabelDisplay="auto"
      min={viewModel.min}
      max={viewModel.max}
      step={1000}
      value={viewModel.value}
      onChange={handleChange}
      onChangeCommitted={onChangeCommitted}
    />
  );
};

export default observer(Slider);

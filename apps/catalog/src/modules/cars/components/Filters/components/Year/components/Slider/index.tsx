import React from 'react';

import SliderStore from './store';
import View from './View';
import ViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';

interface SliderProps {
  onChange: (value?: MaxAndMin) => void;
  range: MaxAndMin;
  value?: MaxAndMin;
}

const Slider: React.FC<SliderProps> = ({ onChange, range, value }) => {
  const store = new SliderStore(range, value);
  const viewModel = new ViewModel(onChange, range, store);
  return <View viewModel={viewModel} />;
};

export default Slider;

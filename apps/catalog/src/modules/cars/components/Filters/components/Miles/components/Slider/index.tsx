import React from 'react';

import SliderStore from './store';
import View from './View';
import ViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';

interface SliderProps {
  onDone: (miles: MaxAndMin) => void;
  range: MaxAndMin;
  state: string | undefined;
}

const Slider: React.FC<SliderProps> = ({ onDone, range, state }) => {
  const store = new SliderStore(range, state);
  const viewModel = new ViewModel(onDone, range, store);
  return <View viewModel={viewModel} />;
};

export default Slider;

import React from 'react';

import SliderStore from './store';
import View from './View';
import ViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/types';

interface SliderProps {
  state: MaxAndMin;
  onDone: (price: MaxAndMin) => void;
}

const Slider: React.FC<SliderProps> = props => {
  const { state, onDone } = props;
  const store = new SliderStore(state);
  const viewModel = new ViewModel(store, onDone);
  return <View {...props} viewModel={viewModel} />;
};

export default Slider;

import React from 'react';

import SliderStore from './store';
import View from './View';
import ViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/types';

interface SliderProps {
  state: string | undefined;
  onDone: (miles: MaxAndMin) => void;
}

const Slider: React.FC<SliderProps> = props => {
  const { state, onDone } = props;
  const store = new SliderStore(state);
  const viewModel = new ViewModel(store, onDone);
  return <View viewModel={viewModel} />;
};

export default Slider;

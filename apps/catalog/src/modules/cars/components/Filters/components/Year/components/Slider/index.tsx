import React from 'react';

import SliderStore from './store';
import View from './View';
import ViewModel from './ViewModel';

interface SliderProps {
  state: number[];
  onDone: (values: number[]) => void;
}

const Slider: React.FC<SliderProps> = (props) => {
  const { state, onDone } = props;
  const store = new SliderStore(state);
  const viewModel = new ViewModel(store, onDone);
  return <View {...props} viewModel={viewModel} />;
};

export default Slider;

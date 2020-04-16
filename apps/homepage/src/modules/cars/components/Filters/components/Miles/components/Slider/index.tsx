import React from 'react';

import { MaxAndMin } from '../../../../../../util';
import View from './View';
import ViewModel from './ViewModel';

interface SliderProps {
  state: string | undefined;
  onDone: (miles: MaxAndMin) => void;
}

const Slider: React.FC<SliderProps> = props => {
  const { state, onDone } = props;
  const viewModel = new ViewModel(state, onDone);
  return <View viewModel={viewModel} />;
};

export default Slider;

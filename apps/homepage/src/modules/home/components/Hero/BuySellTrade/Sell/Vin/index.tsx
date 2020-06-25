import React from 'react';

import { VinStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const Vin: React.FC = () => {
  const store = new VinStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Vin;

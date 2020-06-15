import React from 'react';

import { LicensePlateStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const LicensePlate: React.FC = () => {
  const store = new LicensePlateStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default LicensePlate;

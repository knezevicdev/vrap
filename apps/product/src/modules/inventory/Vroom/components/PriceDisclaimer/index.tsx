import React from 'react';

import { PriceDisclaimerStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const PriceDisclaimer: React.FC = () => {
  const store = new PriceDisclaimerStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default PriceDisclaimer;

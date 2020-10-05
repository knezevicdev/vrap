import React from 'react';

import View from './View';
import ViewModel from './ViewModel';
import { usePriceStore } from 'src/modules/price/store';

const InitialPrice: React.FC = () => {
  const store = usePriceStore(); 
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default InitialPrice;

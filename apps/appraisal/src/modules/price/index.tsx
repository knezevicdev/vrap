import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { usePriceStore } from 'src/modules/price/store';

const Price: React.FC = () => {
  const priceStore = usePriceStore();
  const viewModel = new ViewModel(priceStore);

  return <View viewModel={viewModel} />;
};

export default Price;

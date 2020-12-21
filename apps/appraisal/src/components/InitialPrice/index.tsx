import React from 'react';

import View from './View';
import InitialPriceViewModel from './ViewModel';

import { PriceStore } from 'src/modules/price/store';

const InitialPrice: React.FC<{ store: PriceStore }> = ({ store }) => {
  const viewModel = new InitialPriceViewModel(store);
  return <View viewModel={viewModel} />;
};

export default InitialPrice;

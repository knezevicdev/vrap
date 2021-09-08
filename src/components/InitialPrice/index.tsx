import React from 'react';

// import View from './View';
import View from './ViewAB';
import InitialPriceViewModel from './ViewModel';

import { PriceStore } from 'src/modules/price/store';

const InitialPrice: React.FC<{ store: PriceStore }> = ({ store }) => {
  const viewModel = new InitialPriceViewModel(store);
  // return <View viewModel={viewModel} />;
  return <View viewModel={viewModel} />;
};

export default InitialPrice;

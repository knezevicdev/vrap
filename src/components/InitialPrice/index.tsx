import React from 'react';

import View from './View';
import ViewAB from './ViewAB';
import InitialPriceViewModel from './ViewModel';

import { PriceStore } from 'src/modules/price/store';
import { useAppStore } from 'src/store/appStore';
const InitialPrice: React.FC<{ store: PriceStore }> = ({ store }) => {
  const viewModel = new InitialPriceViewModel(store);
  const appStore = useAppStore();

  return appStore.offerFacelift ? (
    <ViewAB viewModel={viewModel} />
  ) : (
    <View viewModel={viewModel} />
  );
};

export default InitialPrice;

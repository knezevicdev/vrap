import React from 'react';

import PriceView from './View';
import PriceViewAB from './ViewAB';
import ViewModel from './ViewModel';

import { PriceStore } from 'src/modules/price/store';
import { useAppStore } from 'src/store/appStore';

const Price: React.FC<{ store: PriceStore }> = ({ store }) => {
  const viewModel = new ViewModel(store);
  const appStore = useAppStore();
  return appStore.offerFacelift ? (
    <PriceViewAB viewModel={viewModel} />
  ) : (
    <PriceView viewModel={viewModel} />
  );
};

export default Price;

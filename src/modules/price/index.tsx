import { observer } from 'mobx-react';
import React from 'react';

import PriceView from './View';
import PriceViewAB from './ViewAB';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import { PriceStore } from 'src/modules/price/store';

const Price: React.FC<{ store: PriceStore }> = ({ store }) => {
  const viewModel = new ViewModel(store);
  const appStore = useAppStore();
  return appStore.store.absmart.offerFacelift ? (
    <PriceViewAB viewModel={viewModel} />
  ) : (
    <PriceView viewModel={viewModel} />
  );
};

export default observer(Price);

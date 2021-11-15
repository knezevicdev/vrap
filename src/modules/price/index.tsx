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
  const isFaceliftExp = appStore.store.absmart.isInExperiment(
    'ac-appraisal-offer-facelift'
  );
  return isFaceliftExp ? (
    <PriceViewAB viewModel={viewModel} />
  ) : (
    <PriceView viewModel={viewModel} />
  );
};

export default observer(Price);

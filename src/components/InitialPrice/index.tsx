import { observer } from 'mobx-react';
import React from 'react';

import View from './View';
import ViewAB from './ViewAB';
import InitialPriceViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';

const InitialPrice: React.FC<{ store: PriceStore }> = ({ store }) => {
  const analyticsHandler = new AnalyticsHandler();
  const viewModel = new InitialPriceViewModel(store, analyticsHandler);
  const appStore = useAppStore();

  return appStore.store.absmart.offerFacelift ? (
    <ViewAB viewModel={viewModel} />
  ) : (
    <View viewModel={viewModel} />
  );
};

export default observer(InitialPrice);

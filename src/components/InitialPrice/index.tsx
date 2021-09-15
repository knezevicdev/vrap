import React from 'react';

import View from './View';
import InitialPriceViewModel from './ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';

const InitialPrice: React.FC<{ store: PriceStore }> = ({ store }) => {
  const analyticsHandler = new AnalyticsHandler();
  const viewModel = new InitialPriceViewModel(store, analyticsHandler);
  return <View viewModel={viewModel} />;
};

export default InitialPrice;

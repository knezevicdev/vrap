import { useABSmartly } from '@vroom-web/analytics-integration';
import { observer } from 'mobx-react';
import React from 'react';

import View from './View';
import InitialPriceViewModel from './ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';

const InitialPrice: React.FC<{ store: PriceStore }> = ({ store }) => {
  const analyticsHandler = new AnalyticsHandler();
  const absmartly = useABSmartly();
  const viewModel = new InitialPriceViewModel(
    store,
    analyticsHandler,
    absmartly
  );
  return <View viewModel={viewModel} />;
};

export default observer(InitialPrice);

import { useABSmartly } from '@vroom-web/analytics-integration';
import React from 'react';

import View from './View';
import PendingPriceViewModel from './ViewModel';

const PendingPrice: React.FC = () => {
  const absmartly = useABSmartly();
  const viewModel = new PendingPriceViewModel(absmartly);
  return <View viewModel={viewModel} />;
};

export default PendingPrice;

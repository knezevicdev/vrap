import React from 'react';

import View from './View';
import PendingPriceViewModel from './ViewModel';

const PendingPrice: React.FC = () => {
  const viewModel = new PendingPriceViewModel();
  return <View viewModel={viewModel} />;
};

export default PendingPrice;

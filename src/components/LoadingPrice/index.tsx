import React from 'react';

import View from './View';
import LoadingPriceViewModel from './ViewModel';

const LoadingPrice: React.FC = () => {
  const viewModel = new LoadingPriceViewModel();
  return <View viewModel={viewModel} />;
};

export default LoadingPrice;

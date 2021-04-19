import React from 'react';

import View from './View';
import PriceDetailViewModel from './ViewModel';

import { PriceStore } from 'src/modules/price/store';

const PriceDetail: React.FC<{ store: PriceStore }> = ({ store }) => {
  const viewModel = new PriceDetailViewModel(store);
  return <View viewModel={viewModel} />;
};

export default PriceDetail;

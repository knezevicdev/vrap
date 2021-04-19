import React from 'react';

import PriceView from './View';
import ViewModel from './ViewModel';

import { PriceStore } from 'src/modules/price/store';

const Price: React.FC<{ store: PriceStore }> = ({ store }) => {
  const viewModel = new ViewModel(store);
  return <PriceView viewModel={viewModel} />;
};

export default Price;

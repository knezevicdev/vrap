import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { PriceStore } from 'src/modules/price/store';

const Price: React.FC<{ store: PriceStore }> = ({ store }) => {
  const viewModel = new ViewModel(store); // VM
  return <View viewModel={viewModel} />; // View - observer
};

export default Price;

import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { observer } from 'mobx-react';
import { usePriceStore } from 'src/modules/price/store';

const Price: React.FC = () => {
  const priceStore = usePriceStore();
  const viewModel = new ViewModel(priceStore);

  return <View viewModel={viewModel} />;
};

export default observer(Price);

import { observer } from 'mobx-react';
import React, { useMemo } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { PriceStore } from 'src/modules/price/store';

const ProgressiveAd: React.FC<{ store: PriceStore }> = ({ store }) => {
  const viewModel = useMemo(() => new ViewModel(store), [store]);
  return <View viewModel={viewModel} />;
};

export default observer(ProgressiveAd);

import { observer } from 'mobx-react';
import React, { useMemo } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import { PriceStore } from 'src/modules/price/store';

const ProgressiveAd: React.FC<{ store: PriceStore }> = ({ store }) => {
  const appStore = useAppStore();
  const viewModel = useMemo(() => new ViewModel(store, appStore), [
    store,
    appStore,
  ]);
  return <View viewModel={viewModel} />;
};

export default observer(ProgressiveAd);

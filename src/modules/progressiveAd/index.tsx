import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { PriceStore } from 'src/modules/price/store';
import { useAppStore } from 'src/store/appStore';

const ProgressiveAd: React.FC<{ store: PriceStore }> = ({ store }) => {
  const { query } = useRouter();
  const appStore = useAppStore();
  const viewModel = useMemo(
    () => new ViewModel(store, query, appStore),
    [store, query, appStore]
  );
  return <View viewModel={viewModel} />;
};

export default observer(ProgressiveAd);

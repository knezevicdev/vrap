import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

interface Prop {
  priceId: string;
}

const TransactionOverview: React.FC<Prop> = ({ priceId }) => {
  const { store } = useAppStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} priceId={priceId} store={store} />;
};

export default TransactionOverview;

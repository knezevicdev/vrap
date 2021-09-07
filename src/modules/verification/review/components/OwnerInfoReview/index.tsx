import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

interface Prop {
  priceId: string;
}

const OwnerInfoReview: React.FC<Prop> = () => {
  const { store } = useAppStore();
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} store={store} />;
};

export default OwnerInfoReview;

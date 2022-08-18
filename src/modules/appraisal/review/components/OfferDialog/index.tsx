import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const OfferDialog: React.FC = () => {
  const { store } = useAppStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default OfferDialog;

import React from 'react';

import { useOptionsStore } from './store';
import { useDirectDepositStore } from '../directdeposit/store';
import View from './View';
import ViewModel from './ViewModel';

const Options: React.FC = () => {
  const store = useOptionsStore();
  const ddStore = useDirectDepositStore();
  const viewModel = new ViewModel(store, ddStore);
  return <View viewModel={viewModel} />;
};

export default Options;

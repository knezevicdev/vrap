import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useDirectDepositStore } from './store';

const DirectDeposit: React.FC = () => {
  const ddStore = useDirectDepositStore();
  const viewModel = new ViewModel(ddStore);

  return <View viewModel={viewModel} />;
};

export default DirectDeposit;

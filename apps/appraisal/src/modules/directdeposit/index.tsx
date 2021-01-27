import React from 'react';

import { useDirectDepositStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const DirectDeposit: React.FC = () => {
  const ddStore = useDirectDepositStore();
  const viewModel = new ViewModel(ddStore);

  return <View viewModel={viewModel} />;
};

export default DirectDeposit;

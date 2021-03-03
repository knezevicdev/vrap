import React from 'react';

import { useOptionsStore } from '../options/store';
import { useDirectDepositStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const DirectDeposit: React.FC = () => {
  const ddStore = useDirectDepositStore();
  const oStore = useOptionsStore();
  const viewModel = new ViewModel(ddStore, oStore);

  return <View viewModel={viewModel} />;
};

export default DirectDeposit;

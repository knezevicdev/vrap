import React from 'react';

import { useOptionsStore } from '../optionsAB/store';
import { usePaymentOverviewStore } from '../paymentoverviewAB/store';
import { useDirectDepositStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const DirectDeposit: React.FC = () => {
  const ddStore = useDirectDepositStore();
  const oStore = useOptionsStore();
  const poStore = usePaymentOverviewStore();
  const viewModel = new ViewModel(ddStore, oStore, poStore);

  return <View viewModel={viewModel} />;
};

export default DirectDeposit;

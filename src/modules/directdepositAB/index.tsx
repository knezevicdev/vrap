import React from 'react';

import { useDirectDepositStore } from '../directdeposit/store';
import { useOptionsStore } from '../options/store';
import { usePaymentOverviewStore } from '../paymentoverview/store';
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
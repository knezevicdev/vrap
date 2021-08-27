import React from 'react';

import { useOptionsStore } from '../options/store';
import { usePaymentOverviewStore } from '../paymentoverview/store';
import View from './View';
import ViewModel from './ViewModel';

const PaymentOverview: React.FC = () => {
  const poStore = usePaymentOverviewStore();
  const oStore = useOptionsStore();

  const viewModel = new ViewModel(poStore, oStore);
  return <View viewModel={viewModel} />;
};

export default PaymentOverview;

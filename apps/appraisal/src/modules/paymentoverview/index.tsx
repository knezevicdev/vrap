import React from 'react';

import { usePaymentOverviewStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const PaymentOverview: React.FC = () => {
  const store = usePaymentOverviewStore();

  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default PaymentOverview;

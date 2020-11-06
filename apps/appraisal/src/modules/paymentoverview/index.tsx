import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import { usePaymentOverviewStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const PaymentOverview: React.FC = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const store = usePaymentOverviewStore();

  const viewModel = new ViewModel(store, mdUp);
  return <View viewModel={viewModel} />;
};

export default PaymentOverview;

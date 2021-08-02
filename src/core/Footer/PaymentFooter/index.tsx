import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const PaymentFooter: React.FC = () => {
  return <View viewModel={new ViewModel()} />;
};

export default PaymentFooter;

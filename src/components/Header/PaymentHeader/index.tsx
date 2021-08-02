import React from 'react';

import View from './View';
import ViewModal from './ViewModel';

const PaymentHeader: React.FC = () => {
  return <View viewModel={new ViewModal()} />;
};

export default PaymentHeader;

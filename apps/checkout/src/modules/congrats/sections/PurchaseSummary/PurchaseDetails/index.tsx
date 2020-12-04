import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const PurchaseDetails: React.FC = () => {
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} />;
};

export default PurchaseDetails;

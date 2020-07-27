import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const LegalFooter: React.FC = () => {
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} />;
};

export default LegalFooter;
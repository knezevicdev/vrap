import React from 'react';

import HowItWorksView from './View';
import HowItWorksViewModel from './ViewModel';

const HowItWorks: React.FC = () => {
  const viewModel = new HowItWorksViewModel();
  return <HowItWorksView viewModel={viewModel} />;
};

export default HowItWorks;

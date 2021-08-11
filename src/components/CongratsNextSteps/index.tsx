import React, { useMemo } from 'react';

import View from './View';
import ViewModel from './ViewModel';

const CongratsNextSteps: React.FC = () => {
  const viewModel = useMemo(() => new ViewModel(), []);
  return <View viewModel={viewModel} />;
};

export default CongratsNextSteps;

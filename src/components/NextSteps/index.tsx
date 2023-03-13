import { useABSmartly } from '@vroom-web/analytics-integration';
import React from 'react';

import View from './View';
import ViewAB from './ViewAB';
import ViewModel from './ViewModel';

const NextSteps: React.FC = () => {
  const viewModel = new ViewModel();
  const absmartly = useABSmartly();
  const isFaceliftExp = absmartly.isInExperiment('ac-appraisal-offer-facelift');

  return isFaceliftExp ? (
    <ViewAB viewModel={viewModel} />
  ) : (
    <View viewModel={viewModel} />
  );
};

export default NextSteps;

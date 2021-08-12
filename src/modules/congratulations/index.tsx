import React, { useMemo } from 'react';

import CongratulationsView from './View';
import ViewModel from './ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const Congratulations = (): JSX.Element => {
  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);
  const viewModel = useMemo(() => new ViewModel(analyticsHandler), [
    analyticsHandler,
  ]);
  return <CongratulationsView viewModel={viewModel} />;
};

export default Congratulations;

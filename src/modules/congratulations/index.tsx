import { observer } from 'mobx-react';
import React, { useMemo } from 'react';

import CongratulationsView from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const Congratulations = (): JSX.Element => {
  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);
  const appStore = useAppStore();
  const viewModel = useMemo(() => new ViewModel(analyticsHandler, appStore), [
    analyticsHandler,
    appStore,
  ]);
  return <CongratulationsView viewModel={viewModel} />;
};

export default observer(Congratulations);

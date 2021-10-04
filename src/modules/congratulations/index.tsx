import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import CongratulationsView from './View';
import ViewModel from './ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { useAppStore } from 'src/store/appStore';

const Congratulations = (): JSX.Element => {
  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);
  const { query } = useRouter();
  const appStore = useAppStore();
  const viewModel = useMemo(
    () => new ViewModel(analyticsHandler, query, appStore),
    [analyticsHandler, query, appStore]
  );
  return <CongratulationsView viewModel={viewModel} />;
};

export default observer(Congratulations);

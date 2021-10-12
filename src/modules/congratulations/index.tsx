import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import CongratulationsView from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const Congratulations = (): JSX.Element => {
  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);
  const { query } = useRouter();
  const { store } = useAppStore();
  const viewModel = useMemo(
    () => new ViewModel(analyticsHandler, query, store),
    [analyticsHandler, query, store]
  );
  return <CongratulationsView viewModel={viewModel} />;
};

export default observer(Congratulations);

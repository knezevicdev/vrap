import { useABSmartly } from '@vroom-web/analytics-integration';
import { useRouter } from 'next/router';
import React from 'react';

import { useDirectDepositStore } from '../directdeposit/store';
import { useOptionsStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const Options = (): JSX.Element => {
  const router = useRouter();
  const analyticsHandler = new AnalyticsHandler();
  const oStore = useOptionsStore();
  const { store } = useAppStore();
  const ddStore = useDirectDepositStore();
  const absmartly = useABSmartly();
  const viewModel = new ViewModel(
    oStore,
    ddStore,
    analyticsHandler,
    store,
    router,
    absmartly
  );

  return <View viewModel={viewModel} />;
};

export default Options;

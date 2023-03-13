import { useABSmartly } from '@vroom-web/analytics-integration';
import { useRouter } from 'next/router';
import React from 'react';

import { useDirectDepositStore } from '../directdeposit/store';
import { useOptionsStore } from './store';
import View from './View';
import ViewAB from './ViewAB';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface Prop {
  abTest: boolean;
}

const Options = (props: Prop): JSX.Element => {
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

  return props.abTest ? (
    <ViewAB viewModel={viewModel} />
  ) : (
    <View viewModel={viewModel} />
  );
};

export default Options;

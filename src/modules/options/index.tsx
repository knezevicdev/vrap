import React from 'react';

import { useDirectDepositStore } from '../directdeposit/store';
import { useOptionsStore } from './store';
import View from './View';
import ViewAB from './ViewAB';
import ViewModel from './ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { useAppStore } from 'src/store/appStore';

interface Prop {
  abTest: boolean;
}

const Options = (props: Prop): JSX.Element => {
  const analyticsHandler = new AnalyticsHandler();
  const store = useOptionsStore();
  const appStore = useAppStore();
  const ddStore = useDirectDepositStore();
  const viewModel = new ViewModel(store, ddStore, analyticsHandler, appStore);

  return props.abTest ? (
    <ViewAB viewModel={viewModel} />
  ) : (
    <View viewModel={viewModel} />
  );
};

export default Options;

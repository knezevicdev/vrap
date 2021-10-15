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
  const analyticsHandler = new AnalyticsHandler();
  const oStore = useOptionsStore();
  const { store } = useAppStore();
  const ddStore = useDirectDepositStore();
  const viewModel = new ViewModel(oStore, ddStore, analyticsHandler, store);

  return props.abTest ? (
    <ViewAB viewModel={viewModel} />
  ) : (
    <View viewModel={viewModel} />
  );
};

export default Options;

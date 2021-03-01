import React, { useEffect, useState } from 'react';

import { useDirectDepositStore } from '../directdeposit/store';
import { useOptionsStore } from './store';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import View from './View';
import ViewModel from './ViewModel';
import experimentSDK from 'src/integrations/experimentSDK';

const Options: React.FC = () => {
  const store = useOptionsStore();
  const ddStore = useDirectDepositStore();
  const viewModel = new ViewModel(store, ddStore);
  const [analyticsHandler] = useState<AnalyticsHandler>(new AnalyticsHandler());
  useEffect(() => {
    let plaidExperiment = false;
    experimentSDK
      .getAndLogExperimentClientSide('cw-plaid-experiment')
      .then((experiment) => {
        if (experiment) {
          store.setPlaidExperiment(experiment)
          analyticsHandler.registerExperiment(store.plaidExperiment);
        }
      });
  });

  return <View viewModel={viewModel} />;
};

export default Options;

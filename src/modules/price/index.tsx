import { useABSmartly } from '@vroom-web/analytics-integration';
import { observer } from 'mobx-react';
import React from 'react';

import PriceView from './View';
import PriceViewAB from './ViewAB';
import ViewModel from './ViewModel';

import { PriceStore } from 'src/modules/price/store';

const Price: React.FC<{ store: PriceStore }> = ({ store }) => {
  const viewModel = new ViewModel(store);
  const absmartly = useABSmartly();
  const isFaceliftExp = absmartly.isInExperiment('ac-appraisal-offer-facelift');
  return isFaceliftExp ? (
    <PriceViewAB viewModel={viewModel} />
  ) : (
    <PriceView viewModel={viewModel} />
  );
};

export default observer(Price);

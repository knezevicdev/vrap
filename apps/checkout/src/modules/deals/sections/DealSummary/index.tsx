import { GQLTypes } from '@vroom-web/networking';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  deal: GQLTypes.Deal;
}

const DealSummary = ({ deal }: Props): JSX.Element => {
  const viewModel = new ViewModel(deal);
  return <View viewModel={viewModel} />;
};

export default DealSummary;

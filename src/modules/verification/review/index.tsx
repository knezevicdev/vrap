import { useABSmartly } from '@vroom-web/analytics-integration';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

interface Props {
  priceId: string;
}

const VerificationReview: React.FC<Props> = ({ priceId }) => {
  const { store } = useAppStore();
  const absmartly = useABSmartly();
  const viewModel = new ViewModel(store, absmartly);

  return <View viewModel={viewModel} priceId={priceId} />;
};

export default VerificationReview;

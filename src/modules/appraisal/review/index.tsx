import { useABSmartly } from '@vroom-web/analytics-integration';
import { useRouter } from 'next/router';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const AppraisalReview: React.FC = () => {
  const router = useRouter();
  const { store } = useAppStore();
  const absmartly = useABSmartly();
  const viewModel = new ViewModel(store, router, absmartly);
  return <View viewModel={viewModel} />;
};

export default AppraisalReview;

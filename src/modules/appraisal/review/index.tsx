import { useRouter } from 'next/router';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const AppraisalReview: React.FC = () => {
  const router = useRouter();
  const { store } = useAppStore();
  const viewModel = new ViewModel(store, router);
  return <View viewModel={viewModel} />;
};

export default AppraisalReview;

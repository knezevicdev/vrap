import { useRouter } from 'next/router';
import React from 'react';

import { useFingerprint } from '../../../context/FigerprintContext';
import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const AppraisalReview: React.FC = () => {
  const fingerprintResult = useFingerprint();
  const router = useRouter();
  const { store } = useAppStore();
  const viewModel = new ViewModel(store, router, fingerprintResult);
  return <View viewModel={viewModel} />;
};

export default AppraisalReview;

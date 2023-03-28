import { useABSmartly } from '@vroom-web/analytics-integration';
import { useRouter } from 'next/router';
import React from 'react';

import useIsTradeIn from '../../../hooks/useIsTradeIn';
import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

interface Props {
  token: string;
}

const AppraisalReview: React.FC<Props> = ({ token }) => {
  const router = useRouter();
  const { store } = useAppStore();
  const absmartly = useABSmartly();
  const isTradeIn = useIsTradeIn();
  const viewModel = new ViewModel(store, router, absmartly, token, isTradeIn);
  return <View viewModel={viewModel} />;
};

export default AppraisalReview;

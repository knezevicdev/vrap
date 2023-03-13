import { useABSmartly } from '@vroom-web/analytics-integration';
import { observer } from 'mobx-react';
import React from 'react';

import AppraisalView from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const AppraisalForm: React.FC = () => {
  const { store } = useAppStore();
  const absmartly = useABSmartly();
  const viewModel = new ViewModel(store, absmartly);

  return <AppraisalView viewModel={viewModel} />;
};

export default observer(AppraisalForm);

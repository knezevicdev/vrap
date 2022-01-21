import { observer } from 'mobx-react';
import React from 'react';

import AppraisalView from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const AppraisalForm: React.FC = () => {
  const { store } = useAppStore();
  const viewModel = new ViewModel(store);

  return <AppraisalView viewModel={viewModel} />;
};

export default observer(AppraisalForm);

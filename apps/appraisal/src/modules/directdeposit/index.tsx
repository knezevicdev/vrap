import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useDirectDepositStore } from './store';

interface Props {
  email: string;
}

const DirectDeposit: React.FC<Props> = ({ email }) => {
  const ddStore = useDirectDepositStore();
  const viewModel = new ViewModel(ddStore);

  return <View viewModel={viewModel} email={email} />;
};

export default DirectDeposit;

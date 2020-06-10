import React from 'react';

import Store from './store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  gearboxPrivateUrl: string;
}

const InProgressDealBar: React.FC<Props> = ({ gearboxPrivateUrl }) => {
  const store = new Store(gearboxPrivateUrl);
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default InProgressDealBar;

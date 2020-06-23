import React from 'react';

import Store from './store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  className?: string;
  gearboxPrivateUrl: string;
}

const InProgressDealBar: React.FC<Props> = ({
  className,
  gearboxPrivateUrl,
}) => {
  const store = new Store(gearboxPrivateUrl);
  const viewModel = new ViewModel(store, className);
  return <View viewModel={viewModel} />;
};

export default InProgressDealBar;
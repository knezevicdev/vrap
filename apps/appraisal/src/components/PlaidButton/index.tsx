import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

export interface Props {
  token: string;
}

const PlaidButton: React.FC<Props> = (token) => {
  const viewModel = new ViewModel();

  return <View viewModel={viewModel} token={token} />;
};

export default PlaidButton;

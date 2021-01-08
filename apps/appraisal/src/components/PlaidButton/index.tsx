import React from 'react';

import View from './View';
import ViewModel from './ViewModel';
import { PlaidData } from 'src/interfaces.d';

export interface Props {
  token: string;
  plaidSuccess (mutationInput: PlaidData): void;
}

const PlaidButton: React.FC<Props> = ({ token, plaidSuccess }) => {
  const viewModel = new ViewModel();

  return <View viewModel={viewModel} token={token} plaidSuccess={plaidSuccess} />;
};

export default PlaidButton;

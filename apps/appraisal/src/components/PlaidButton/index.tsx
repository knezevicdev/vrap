import React from 'react';

import View from './View';
import ViewModel from './ViewModel';
import { PlaidData } from 'src/interfaces.d';

import { useOptionsStore } from '../../modules/options/store';

export interface Props {
  token: string;
  plaidSuccess (mutationInput: PlaidData, onPlaidSubmitting: any): void;
  priceId: string;
}

const PlaidButton: React.FC<Props> = ({ token, plaidSuccess, priceId }) => {
  const oStore = useOptionsStore();
  const viewModel = new ViewModel(oStore);

  return <View viewModel={viewModel} token={token} plaidSuccess={plaidSuccess} priceId={priceId} />;
};

export default PlaidButton;

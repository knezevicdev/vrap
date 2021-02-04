import React from 'react';

import { useOptionsStore } from '../../modules/options/store';
import View from './View';
import ViewModel from './ViewModel';

import { PlaidData } from 'src/interfaces.d';

export type Props = {
  token: string;
  plaidSuccess(
    mutationInput: PlaidData,
    onPlaidSubmitting: (value: boolean) => void
  ): void;
  priceId: string;
};

const PlaidButton: React.FC<Props> = ({ token, plaidSuccess, priceId }) => {
  const oStore = useOptionsStore();
  const viewModel = new ViewModel(oStore);

  return (
    <View
      viewModel={viewModel}
      token={token}
      plaidSuccess={plaidSuccess}
      priceId={priceId}
    />
  );
};

export default PlaidButton;

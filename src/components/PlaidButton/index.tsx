import { useABSmartly } from '@vroom-web/analytics-integration';
import React from 'react';

import { useOptionsStore } from '../../modules/options/store';
import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import { PlaidData } from 'src/interfaces.d';

export type Props = {
  token: string;
  tokenIsLocal: boolean;
  plaidSuccess(
    mutationInput: PlaidData,
    onPlaidSubmitting: (value: boolean) => void
  ): void;
  plaidExit(): void;
  priceId: string;
};

const PlaidButton: React.FC<Props> = ({
  token,
  tokenIsLocal,
  plaidSuccess,
  plaidExit,
  priceId,
}) => {
  const oStore = useOptionsStore();
  const { store } = useAppStore();
  const absmartly = useABSmartly();
  const viewModel = new ViewModel(oStore, store, absmartly);

  return (
    <View
      viewModel={viewModel}
      token={token}
      tokenIsLocal={tokenIsLocal}
      plaidSuccess={plaidSuccess}
      plaidExit={plaidExit}
      priceId={priceId}
    />
  );
};

export default PlaidButton;
